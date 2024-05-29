import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { ResumoR } from 'src/app/model/services/interfaces/resumoR';

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

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private toast: NgToastService){

  }

  ngOnInit(){
    this.initResumo();
  }

  initResumo(){
    this.resumor = history.state.resumor;
    console.log('Informações da área sobre:', this.resumor);
    this.titler = this.resumor?.titler;
    this.descr = this.resumor?.descr;
    this.locationr = this.resumor?.locationr;

    this.editar = this.formBuilder.group({
      titler: [this.titler, [Validators.required]],
      descr: [this.descr, [Validators.required]],
      locationr: [this.locationr, [Validators.required]],
    });
  }

  editItem() {
    if (this.editar.valid) {
        const new_part: ResumoR = { ...this.editar.value, id: this.resumor.id };

        this.firebase.editarResumoR(new_part, this.resumor.id)
            .then(() => {
                console.log('Resumo atualizado com sucesso');
                this.router.navigate(['/admin']);
                this.toast.success({
                    detail: "Sucesso!",
                    summary: "Resumo atualizado com sucesso",
                    duration: 5000
                });
            })
            .catch((error) => {
                console.error('Erro ao atualizar Resumo:', error);
                this.toast.error({
                    detail: "Erro!",
                    summary: "Falha ao atualizar Resumo. Tente novamente mais tarde.",
                    duration: 5000
                });
            });
    } else {
        this.toast.error({
            detail: "Erro!",
            summary: "Campos obrigatórios!",
            duration: 5000
        });
    }
  }

  isInvalidControl(controlName: string) {
    const control = this.editar.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  delete() {
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir este resumor?');
    if (confirmDelete) {
        this.firebase.excluirResumoR(this.resumor.id)
            .then(() => {
                console.log('Resumor excluído com sucesso');
                this.router.navigate(['/admin']);
                this.toast.success({
                    detail: "Sucesso!",
                    summary: "Resumor excluído com sucesso",
                    duration: 5000
                });
            })
            .catch((error) => {
                console.error('Erro ao excluir resumor:', error);
                this.toast.error({
                    detail: "Erro!",
                    summary: "Falha ao excluir resumor. Tente novamente mais tarde.",
                    duration: 5000
                });
            });
    }
  }
}
