import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Projetos } from 'src/app/model/services/interfaces/projetos';
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

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private toast: NgToastService){

  }

  ngOnInit(){
    this.initProject();
  }

  initProject(){
    this.projeto = history.state.projeto;
    console.log('Informações do projeto:', this.projeto);
    this.titulo = this.projeto?.titulo;
    this.link = this.projeto?.link;
    this.inProgress = this.projeto?.inProgress;
    this.star = this.projeto?.star;

    this.editar = this.formBuilder.group({
      titulo: [this.titulo, [Validators.required]],
      link: [this.link, [Validators.required]],
      inProgress: [this.inProgress, [Validators.required]],
      star: [this.star, [Validators.required]],
      imagem1: [null],
      imagem2: [null],
    });
  }

  editItem() {
    if (this.editar.valid) {
        const new_part: Projetos = {
            ...this.editar.value,
            id: this.projeto.id,
            projectImg: this.projeto.projectImg,
            badge: this.projeto.badge
        };

        if (this.imagem1 && this.imagem2) {
            this.firebase.uploadImageProjeto1(this.imagem1, new_part)?.then(() => {
                this.firebase.uploadImageProjeto2(this.imagem2, new_part)?.then(() => {
                    this.router.navigate(['/admin']);
                    this.toast.success({
                        detail: "Sucesso!",
                        summary: "Projeto atualizado com sucesso",
                        duration: 5000
                    });
                }).catch((error) => {
                    console.error('Erro ao fazer upload da segunda imagem:', error);
                    this.toast.error({
                        detail: "Erro!",
                        summary: "Falha ao atualizar projeto. Tente novamente mais tarde.",
                        duration: 5000
                    });
                });
            }).catch((error) => {
                console.error('Erro ao fazer upload da primeira imagem:', error);
                this.toast.error({
                    detail: "Erro!",
                    summary: "Falha ao atualizar projeto. Tente novamente mais tarde.",
                    duration: 5000
                });
            });
        } else {
            if (this.imagem1) {
                this.firebase.uploadImageProjeto1(this.imagem1, new_part)?.then(() => {
                    this.firebase.editarProjetos(new_part, this.projeto.id).then(() => {
                        this.router.navigate(['/admin']);
                        this.toast.success({
                            detail: "Sucesso!",
                            summary: "Projeto atualizado com sucesso",
                            duration: 5000
                        });
                    }).catch((error) => {
                        console.error('Erro ao editar projeto:', error);
                        this.toast.error({
                            detail: "Erro!",
                            summary: "Falha ao atualizar projeto. Tente novamente mais tarde.",
                            duration: 5000
                        });
                    });
                }).catch((error) => {
                    console.error('Erro ao fazer upload da primeira imagem:', error);
                    this.toast.error({
                        detail: "Erro!",
                        summary: "Falha ao atualizar projeto. Tente novamente mais tarde.",
                        duration: 5000
                    });
                });
            } else if (this.imagem2) {
                this.firebase.uploadImageProjeto2(this.imagem2, new_part)?.then(() => {
                    this.firebase.editarProjetos(new_part, this.projeto.id).then(() => {
                        this.router.navigate(['/admin']);
                        this.toast.success({
                            detail: "Sucesso!",
                            summary: "Projeto atualizado com sucesso",
                            duration: 5000
                        });
                    }).catch((error) => {
                        console.error('Erro ao editar projeto:', error);
                        this.toast.error({
                            detail: "Erro!",
                            summary: "Falha ao atualizar projeto. Tente novamente mais tarde.",
                            duration: 5000
                        });
                    });
                }).catch((error) => {
                    console.error('Erro ao fazer upload da segunda imagem:', error);
                    this.toast.error({
                        detail: "Erro!",
                        summary: "Falha ao atualizar projeto. Tente novamente mais tarde.",
                        duration: 5000
                    });
                });
            } else {
                this.firebase.editarProjetos(new_part, this.projeto.id).then(() => {
                    this.router.navigate(['/admin']);
                    this.toast.success({
                        detail: "Sucesso!",
                        summary: "Projeto atualizado com sucesso",
                        duration: 5000
                    });
                }).catch((error) => {
                    console.error('Erro ao editar projeto:', error);
                    this.toast.error({
                        detail: "Erro!",
                        summary: "Falha ao atualizar projeto. Tente novamente mais tarde.",
                        duration: 5000
                    });
                });
            }
        }
    } else {
        
    }
  }


  uploadFile1(event: any){
    this.imagem1 = event.target.files;
  }

  uploadFile2(event: any){
    this.imagem2 = event.target.files;
  }

  isInvalidControl(controlName: string) {
    const control = this.editar.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
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
                    console.log('Projeto excluído com sucesso');
                    this.router.navigate(['/admin']);
                    this.toast.success({
                        detail: "Sucesso!",
                        summary: "Projeto excluído com sucesso",
                        duration: 5000
                    });
                })
                .catch((error) => {
                    console.error('Erro ao excluir projeto:', error);
                    this.toast.error({
                        detail: "Erro!",
                        summary: "Falha ao excluir projeto. Tente novamente mais tarde.",
                        duration: 5000
                    });
                });
        }
    });
}

}
