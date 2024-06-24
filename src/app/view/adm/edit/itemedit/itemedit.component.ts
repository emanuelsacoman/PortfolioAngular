import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Sobrearea } from 'src/app/model/services/interfaces/sobrearea';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-itemedit',
  templateUrl: './itemedit.component.html',
  styleUrls: ['./itemedit.component.css']
})
export class ItemeditComponent implements OnInit {
  editar!: FormGroup;
  sobrearea!: Sobrearea;
  imagem: any;

  ctitle!: string;
  cdesc!: string;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private toast: NgToastService){

  }

  ngOnInit(){
    this.initSobreArea();
  }

  initSobreArea(){
    this.sobrearea = history.state.sobrearea;
    console.log('Informações da área sobre:', this.sobrearea);
    this.ctitle = this.sobrearea?.ctitle;
    this.cdesc = this.sobrearea?.cdesc;

    this.editar = this.formBuilder.group({
      ctitle: [this.ctitle, [Validators.required]],
      cdesc: [this.cdesc, [Validators.required]],
      imagem: [null],
    });
  }

  editItem() {
    if (this.editar.valid) {
        const new_part: Sobrearea = {
            ...this.editar.value,
            id: this.sobrearea.id,
            cImg: this.sobrearea.cImg
        };

        const handleUpdate = () => {
            this.firebase.editarSobreArea(new_part, this.sobrearea.id)
                .then(() => {
                    console.log('Item atualizado com sucesso');
                    this.router.navigate(['/admin']);
                    this.toast.success({
                        detail: "Sucesso!",
                        summary: "Item atualizado com sucesso",
                        duration: 5000
                    });
                })
                .catch((error) => {
                    console.error('Erro ao atualizar item:', error);
                    this.toast.error({
                        detail: "Erro!",
                        summary: "Falha ao atualizar item. Tente novamente mais tarde.",
                        duration: 5000
                    });
                });
        };

        if (this.imagem) {
            this.firebase.uploadImageSobre(this.imagem, new_part)
                ?.then(() => {
                    handleUpdate();
                })
                .catch((error) => {
                    console.error('Erro ao fazer upload da imagem:', error);
                    this.toast.error({
                        detail: "Erro!",
                        summary: "Falha ao fazer upload da imagem. Tente novamente mais tarde.",
                        duration: 5000
                    });
                });
        } else {
            handleUpdate();
        }
    } else {
        
    }
  }


  uploadFile(event: any){
    this.imagem = event.target.files;
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
            this.firebase.excluirSobreArea(this.sobrearea.id)
                .then(() => {
                    console.log('Item excluído com sucesso');
                    this.router.navigate(['/admin']);
                    this.toast.success({
                        detail: "Sucesso!",
                        summary: "Item excluído com sucesso",
                        duration: 5000
                    });
                })
                .catch((error) => {
                    console.error('Erro ao excluir item:', error);
                    this.toast.error({
                        detail: "Erro!",
                        summary: "Falha ao excluir item. Tente novamente mais tarde.",
                        duration: 5000
                    });
                });
        }
    });
  }
}
