import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { ResumoL } from 'src/app/model/services/interfaces/resumoL';
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

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private toast: NgToastService){

  }

  ngOnInit(){
    this.initResumo();
  }

  initResumo(){
    this.resumol = history.state.resumol;
    console.log('Informações da área sobre:', this.resumol);
    this.titlel = this.resumol?.titlel;
    this.descl = this.resumol?.descl;
    this.locationl = this.resumol?.locationl;

    this.editar = this.formBuilder.group({
      titlel: [this.titlel, [Validators.required]],
      descl: [this.descl, [Validators.required]],
      locationl: [this.locationl, [Validators.required]],
    });
  }

  editItem() {
    if (this.editar.valid) {
        const new_part: ResumoL = { ...this.editar.value, id: this.resumol.id };

        this.firebase.editarResumoL(new_part, this.resumol.id)
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
    Swal.fire({
        title: 'Tem certeza de que deseja excluir este resumol?',
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
                    console.log('Resumol excluído com sucesso');
                    this.router.navigate(['/admin']);
                    this.toast.success({
                        detail: "Sucesso!",
                        summary: "Resumol excluído com sucesso",
                        duration: 5000
                    });
                })
                .catch((error) => {
                    console.error('Erro ao excluir resumol:', error);
                    this.toast.error({
                        detail: "Erro!",
                        summary: "Falha ao excluir resumol. Tente novamente mais tarde.",
                        duration: 5000
                    });
                });
        }
    });
  }

}
