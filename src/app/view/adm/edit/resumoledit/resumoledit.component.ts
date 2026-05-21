import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { ResumoL } from 'src/app/model/services/interfaces/resumoL';
import { MaterialIconsLoaderService } from 'src/app/model/shared/material-icons-loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resumoledit',
  templateUrl: './resumoledit.component.html',
  styleUrls: ['./resumoledit.component.css']
})
export class ResumoleditComponent {
  editar!: FormGroup;
  resumol!: ResumoL;

  titlel!: string;
  descl!: string;
  locationl!: string;

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
    this.resumol = history.state.resumol;
    console.log('Informacoes da formacao:', this.resumol);
    this.titlel = this.resumol?.titlel;
    this.descl = this.resumol?.descl;
    this.locationl = this.resumol?.locationl;

    this.editar = this.formBuilder.group({
      titlel: [this.titlel, [Validators.required]],
      descl: [this.descl, [Validators.required]],
      locationl: [this.locationl ?? ''],
      organizationl: [this.resumol?.organizationl ?? ''],
      levell: [this.resumol?.levell ?? ''],
      linkl: [this.resumol?.linkl ?? ''],
      tagsText: [this.arrayToText(this.resumol?.tagsl)],
      detaill: [this.resumol?.detaill ?? ''],
      orderl: [this.resumol?.orderl ?? 0],
      highlightl: [this.resumol?.highlightl ?? false],
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
      id: this.resumol.id,
      titlel: formValue.titlel ?? '',
      descl: formValue.descl ?? '',
      locationl: formValue.locationl ?? '',
      organizationl: formValue.organizationl ?? '',
      levell: formValue.levell ?? '',
      linkl: formValue.linkl ?? '',
      tagsl: this.parseList(formValue.tagsText),
      detaill: formValue.detaill ?? '',
      orderl: this.parseNumber(formValue.orderl),
      highlightl: Boolean(formValue.highlightl),
    } as ResumoL;

    this.firebase.editarResumoL(newPart, this.resumol.id)
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
        this.firebase.excluirResumoL(this.resumol.id)
          .then(() => {
            console.log('Formacao excluida com sucesso');
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
