import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Projetos } from 'src/app/model/services/interfaces/projetos';

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

  imagem1: any;
  imagem2: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService){

  }

  ngOnInit(){
    this.initProject();
  }

  initProject(){
    this.projeto = history.state.projeto;
    console.log('Informações da área sobre:', this.projeto);
    this.titulo = this.projeto?.titulo;
    this.link = this.projeto?.link;

    this.editar = this.formBuilder.group({
      titulo: [this.titulo, [Validators.required]],
      link: [this.link, [Validators.required]],
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
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });
        } else {
            if (this.imagem1) {
                this.firebase.uploadImageProjeto1(this.imagem1, new_part)?.then(() => {
                    this.firebase.editarProjetos(new_part, this.projeto.id).then(() => {
                        this.router.navigate(['/admin']);
                    }).catch((error) => {
                        console.log(error);
                    });
                }).catch((error) => {
                    console.log(error);
                });
            } else if (this.imagem2) {
                this.firebase.uploadImageProjeto2(this.imagem2, new_part)?.then(() => {
                    this.firebase.editarProjetos(new_part, this.projeto.id).then(() => {
                        this.router.navigate(['/admin']);
                    }).catch((error) => {
                        console.log(error);
                        
                    });
                }).catch((error) => {
                    console.log(error);
                   
                });
            } else {
                this.firebase.editarProjetos(new_part, this.projeto.id).then(() => {
                    this.router.navigate(['/admin']);
                }).catch((error) => {
                    console.log(error);
                   
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

  delete(){
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir este projeto?');
    if (confirmDelete) {
        this.firebase.excluirProjetos(this.projeto.id).then(() => {
            this.router.navigate(['/admin']);
          });
    }
  }
}
