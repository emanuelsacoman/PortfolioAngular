import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { ResumoL } from 'src/app/model/services/interfaces/resumoL';

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
    private firebase: FirebaseService){

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
    if (this.editar.valid){
      const new_part: ResumoL = {...this.editar.value,id: this.resumol.id};

      this.firebase.editarResumoL(new_part, this.resumol.id).then(() => this.router.navigate(['/admin'])).catch((error) =>{
        console.log(error);
      });
    
    }else{
      window.alert('Campos obrigatórios!');
    }
  }

  isInvalidControl(controlName: string) {
    const control = this.editar.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  delete(){
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir este resumol?');
    if (confirmDelete) {
      this.firebase.excluirResumoL(this.resumol.id).then(() => {
          this.router.navigate(['/admin']);
        });
    }
  }
}
