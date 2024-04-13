import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Sobre } from 'src/app/model/services/interfaces/sobre';
import { Sobrearea } from 'src/app/model/services/interfaces/sobrearea';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  //SOBRE
  sobreEdit!: FormGroup;
  sobre!: Sobre;
  selectedOption: string = 'sobre';
  title!: string;
  txt1!: string;
  txt2!: string;
  subtitle!: string;

    //AREA
    sobreareaEdit!: FormGroup;
    sobreArea!: Sobrearea;
    public sobrearea: Sobrearea[] = [];
    ctitle!: string;
    cdesc!: string;
    imagem: any;
    sobreareaCollection!: Observable<any[]>;
    items:any;
    //AREA

  //SOBRE

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private firestore: AngularFirestore) {
      
  }

  ngOnInit(){
    this.initSobre();
  }

  editSobreArea(){

  }

  initSobre(){
    this.sobre = history.state.sobre;
    console.log('Informações da sobre:', this.sobre);
    this.title = this.sobre?.title;
    this.txt1 = this.sobre?.txt1;
    this.txt2 = this.sobre?.txt2;
    this.subtitle = this.sobre?.subtitle;

    this.sobreEdit = this.formBuilder.group({
      title: [this.title, [Validators.required]],
      txt1: [this.txt1, [Validators.required]],
      txt2: [this.txt2, [Validators.required]],
      subtitle: [this.subtitle, [Validators.required]],
    });
  }

  editSobre() {
    if (this.sobreEdit.valid) {
      const new_part: Sobre = {...this.sobreEdit.value, id: this.sobre.id};
  
      this.firebase.editarSobre(new_part, this.sobre.id)
        .then(() => {
          console.log('Sobre atualizado com sucesso');
          this.router.navigate(['/']);
        })
        .catch((error) => {
          console.log('Erro ao atualizar Sobre:', error);
        });
    } else {
      window.alert('Campos obrigatórios!');
    }
  }
  
  uploadFile(event: any){
    this.imagem = event.target.files;
  }
  
  selectOption(option: string) {
    this.selectedOption = option;
    console.log('Opção selecionada:', option);
  }
  
  isSelected(option: string) {
    return this.selectedOption === option;
  }
}
