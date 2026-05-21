import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Projetos } from 'src/app/model/services/interfaces/projetos';
import { MaterialIconsLoaderService } from 'src/app/model/shared/material-icons-loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projetoedit',
  templateUrl: './projetoedit.component.html',
  styleUrls: ['./projetoedit.component.css']
})
export class ProjetoeditComponent {
  editar!: FormGroup;
  projeto!: Projetos;

  titulo!: string;
  link!: string;
  inProgress!: boolean;
  star!: boolean;

  imagem1: any;
  imagem2: any;

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
    this.initProject();
  }

  initProject() {
    this.projeto = history.state.projeto;
    console.log('Informacoes do projeto:', this.projeto);
    this.titulo = this.projeto?.titulo;
    this.link = this.projeto?.link;
    this.inProgress = this.projeto?.inProgress ?? false;
    this.star = this.projeto?.star ?? false;

    this.editar = this.formBuilder.group({
      titulo: [this.titulo, [Validators.required]],
      subtitulo: [this.projeto?.subtitulo ?? ''],
      descricao: [this.projeto?.descricao ?? ''],
      link: [this.link ?? ''],
      repositorio: [this.projeto?.repositorio ?? ''],
      caseStudy: [this.projeto?.caseStudy ?? ''],
      periodo: [this.projeto?.periodo ?? ''],
      tipo: [this.projeto?.tipo ?? ''],
      funcao: [this.projeto?.funcao ?? ''],
      cliente: [this.projeto?.cliente ?? ''],
      tecnologiasText: [this.arrayToText(this.projeto?.tecnologias)],
      destaquesText: [this.arrayToText(this.projeto?.destaques)],
      galeriaText: [this.arrayToText(this.projeto?.galeria)],
      ordem: [this.projeto?.ordem ?? 0],
      ctaLabel: [this.projeto?.ctaLabel ?? ''],
      inProgress: [this.inProgress],
      star: [this.star],
      imagem1: [null],
      imagem2: [null],
    });
  }

  async editItem() {
    if (!this.editar.valid) {
      this.editar.markAllAsTouched();
      this.toast.error({
        detail: 'Erro!',
        summary: 'Revise os campos obrigatorios.',
        duration: 5000
      });
      return;
    }

    const formValue = this.editar.value;
    const newProject = {
      id: this.projeto.id,
      titulo: formValue.titulo ?? '',
      subtitulo: formValue.subtitulo ?? '',
      descricao: formValue.descricao ?? '',
      link: formValue.link ?? '',
      repositorio: formValue.repositorio ?? '',
      caseStudy: formValue.caseStudy ?? '',
      periodo: formValue.periodo ?? '',
      tipo: formValue.tipo ?? '',
      funcao: formValue.funcao ?? '',
      cliente: formValue.cliente ?? '',
      tecnologias: this.parseList(formValue.tecnologiasText),
      destaques: this.parseList(formValue.destaquesText),
      galeria: this.parseList(formValue.galeriaText),
      ordem: this.parseNumber(formValue.ordem),
      ctaLabel: formValue.ctaLabel ?? '',
      inProgress: Boolean(formValue.inProgress),
      star: Boolean(formValue.star),
      projectImg: this.projeto.projectImg,
      badge: this.projeto.badge
    } as Projetos;

    try {
      if (this.imagem1) {
        await this.firebase.uploadProjectAsset(this.imagem1, newProject, 'projectImg');
      }

      if (this.imagem2) {
        await this.firebase.uploadProjectAsset(this.imagem2, newProject, 'badge');
      }

      if (!this.imagem1 && !this.imagem2) {
        await this.firebase.editarProjetos(newProject, this.projeto.id);
      }

      this.router.navigate(['/admin']);
      this.toast.success({
        detail: 'Sucesso!',
        summary: 'Projeto atualizado com sucesso',
        duration: 5000
      });
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
      this.toast.error({
        detail: 'Erro!',
        summary: 'Falha ao atualizar projeto. Tente novamente mais tarde.',
        duration: 5000
      });
    }
  }

  uploadFile1(event: any) {
    this.imagem1 = event.target.files;
  }

  uploadFile2(event: any) {
    this.imagem2 = event.target.files;
  }

  isInvalidControl(controlName: string) {
    const control = this.editar.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  getGalleryPreview(): string[] {
    return this.parseList(this.editar?.get('galeriaText')?.value);
  }

  delete() {
    Swal.fire({
      title: 'Tem certeza de que deseja excluir este projeto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.firebase.excluirProjetos(this.projeto.id)
          .then(() => {
            console.log('Projeto excluido com sucesso');
            this.router.navigate(['/admin']);
            this.toast.success({
              detail: 'Sucesso!',
              summary: 'Projeto excluido com sucesso',
              duration: 5000
            });
          })
          .catch((error) => {
            console.error('Erro ao excluir projeto:', error);
            this.toast.error({
              detail: 'Erro!',
              summary: 'Falha ao excluir projeto. Tente novamente mais tarde.',
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
