import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { ResumoR } from 'src/app/model/services/interfaces/resumoR';
import { MaterialIconsLoaderService } from 'src/app/model/shared/material-icons-loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resumoredit',
  templateUrl: './resumoredit.component.html',
  styleUrls: ['./resumoredit.component.css']
})
export class ResumoreditComponent {
  editar!: FormGroup;
  resumor!: ResumoR;

  titler!: string;
  descr!: string;
  locationr!: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private toast: NgToastService,
    private materialIcons: MaterialIconsLoaderService
  ) {
    this.materialIcons.load();
  }

  ngOnInit() {
    this.initResumo();
  }

  initResumo() {
    this.resumor = history.state.resumor;

    if (!this.resumor?.id) {
      this.editar = this.formBuilder.group({
        titler: ['', [Validators.required]],
        descr: ['', [Validators.required]],
        locationr: [''],
        companyr: [''],
        roler: [''],
        linkr: [''],
        tagsText: [''],
        detailr: [''],
        orderr: [0],
        highlightr: [false],
      });
      this.toast.error({
        detail: 'Erro!',
        summary: 'Selecione uma experiencia pelo painel administrativo.',
        duration: 5000
      });
      this.router.navigate(['/admin']);
      return;
    }
    console.log('Informacoes da experiencia:', this.resumor);
    this.titler = this.resumor?.titler;
    this.descr = this.resumor?.descr;
    this.locationr = this.resumor?.locationr;

    this.editar = this.formBuilder.group({
      titler: [this.titler, [Validators.required]],
      descr: [this.descr, [Validators.required]],
      locationr: [this.locationr ?? ''],
      companyr: [this.resumor?.companyr ?? ''],
      roler: [this.resumor?.roler ?? ''],
      linkr: [this.resumor?.linkr ?? ''],
      tagsText: [this.arrayToText(this.resumor?.tagsr)],
      detailr: [this.resumor?.detailr ?? ''],
      orderr: [this.resumor?.orderr ?? 0],
      highlightr: [this.resumor?.highlightr ?? false],
    });
  }

  editItem() {
    if (!this.editar.valid) {
      this.editar.markAllAsTouched();
      this.toast.error({
        detail: 'Erro!',
        summary: 'Campos obrigatorios!',
        duration: 5000
      });
      return;
    }

    const formValue = this.editar.value;
    const newPart = {
      id: this.resumor.id,
      titler: formValue.titler ?? '',
      descr: formValue.descr ?? '',
      locationr: formValue.locationr ?? '',
      companyr: formValue.companyr ?? '',
      roler: formValue.roler ?? '',
      linkr: formValue.linkr ?? '',
      tagsr: this.parseList(formValue.tagsText),
      detailr: formValue.detailr ?? '',
      orderr: this.parseNumber(formValue.orderr),
      highlightr: Boolean(formValue.highlightr),
    } as ResumoR;

    this.firebase.editarResumoR(newPart, this.resumor.id)
      .then(() => {
        console.log('Resumo atualizado com sucesso');
        this.router.navigate(['/admin']);
        this.toast.success({
          detail: 'Sucesso!',
          summary: 'Resumo atualizado com sucesso',
          duration: 5000
        });
      })
      .catch((error) => {
        console.error('Erro ao atualizar Resumo:', error);
        this.toast.error({
          detail: 'Erro!',
          summary: 'Falha ao atualizar Resumo. Tente novamente mais tarde.',
          duration: 5000
        });
      });
  }

  isInvalidControl(controlName: string) {
    const control = this.editar.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  delete() {
    Swal.fire({
      title: 'Tem certeza de que deseja excluir este item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.firebase.excluirResumoR(this.resumor.id)
          .then(() => {
            console.log('Experiencia excluida com sucesso');
            this.router.navigate(['/admin']);
            this.toast.success({
              detail: 'Sucesso!',
              summary: 'Item excluido com sucesso',
              duration: 5000
            });
          })
          .catch((error) => {
            console.error('Erro ao excluir item:', error);
            this.toast.error({
              detail: 'Erro!',
              summary: 'Falha ao excluir item. Tente novamente mais tarde.',
              duration: 5000
            });
          });
      }
    });
  }

  private arrayToText(value?: string[] | string): string {
    if (Array.isArray(value)) {
      return value.join('\n');
    }

    return value ?? '';
  }

  private parseList(value: unknown): string[] {
    if (Array.isArray(value)) {
      return value
        .map((item) => String(item).trim())
        .filter(Boolean);
    }

    if (typeof value !== 'string') {
      return [];
    }

    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  private parseNumber(value: unknown): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
}
