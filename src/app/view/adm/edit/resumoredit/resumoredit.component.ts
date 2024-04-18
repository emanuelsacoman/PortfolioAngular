import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private firebase: FirebaseService){

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
    if (this.editar.valid){
      const new_part: ResumoR = {...this.editar.value,id: this.resumor.id};

      this.firebase.editarResumoR(new_part, this.resumor.id).then(() => this.router.navigate(['/admin'])).catch((error) =>{
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
    this.firebase.excluirResumoR(this.resumor.id).then(() => {
        this.router.navigate(['/admin']);
      });
  }
}
