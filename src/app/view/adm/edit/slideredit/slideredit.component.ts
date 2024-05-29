import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Slider } from 'src/app/model/services/interfaces/slider';

@Component({
  selector: 'app-slideredit',
  templateUrl: './slideredit.component.html',
  styleUrls: ['./slideredit.component.css']
})
export class SlidereditComponent {
  editar!: FormGroup;
  slider!: Slider;
  imagem: any;

  Img!: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private toast: NgToastService){

  }

  ngOnInit(){
    this.initSobreArea();
  }

  initSobreArea(){
    this.slider = history.state.slider;
    console.log('Informações da área sobre:', this.slider);
    this.Img = this.slider?.Img;

    this.editar = this.formBuilder.group({
      imagem: [null],
    });
  }

  editItem() {
    if (this.editar.valid) {
        const new_part: Slider = { ...this.editar.value, id: this.slider.id, Img: this.slider.Img };

        if (this.imagem) {
            this.firebase.uploadImageSlider(this.imagem, new_part)
                ?.then(() => {
                    this.router.navigate(['/admin']);
                    this.toast.success({
                        detail: "Sucesso!",
                        summary: "Slider atualizado com sucesso",
                        duration: 5000
                    });
                })
                .catch((error) => {
                    console.error('Erro ao fazer upload da imagem do slider:', error);
                    this.toast.error({
                        detail: "Erro!",
                        summary: "Falha ao atualizar o slider",
                        duration: 5000
                    });
                });
        } else {

        }
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
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir este item?');
    if (confirmDelete) {
        this.firebase.excluirSlider(this.slider.id)
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
  }
}
