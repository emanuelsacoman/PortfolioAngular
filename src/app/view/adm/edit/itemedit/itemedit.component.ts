import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Sobrearea } from 'src/app/model/services/interfaces/sobrearea';

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
    private firebase: FirebaseService){

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
    if (this.editar.valid){
      const new_part: Sobrearea = {...this.editar.value,id: this.sobrearea.id,cImg: this.sobrearea.cImg};

      if (this.imagem) {
        this.firebase.uploadImageSobre(this.imagem, new_part)?.then(() =>{
          this.router.navigate(['/admin'])
        });
      }else{
        new_part.cImg = this.sobrearea.cImg;

        this.firebase.editarSobreArea(new_part, this.sobrearea.id).then(() => this.router.navigate(['/admin'])).catch((error) =>{
          console.log(error);
        });
      }
    }else{
      
    }
  }

  uploadFile(event: any){
    this.imagem = event.target.files;
  }

  isInvalidControl(controlName: string) {
    const control = this.editar.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  delete(){
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir este item?');
    if(confirmDelete){
      this.firebase.excluirSobreArea(this.sobrearea.id).then(() => {
          this.router.navigate(['/admin']);
        });
    }
  }
}
