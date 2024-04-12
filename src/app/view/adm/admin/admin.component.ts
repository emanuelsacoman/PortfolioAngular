import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Sobre } from 'src/app/model/services/interfaces/sobre';

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
  //SOBRE

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService) {
    
  }

  ngOnInit(){
    this.initSobre();
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

  editSobre(){
    if (this.sobreEdit.valid){
      const new_part: Sobre = {...this.sobreEdit.value,id: this.sobre.id};
        this.firebase.editarSobre(new_part, this.sobre.id).then(() => this.router.navigate(['/webmanager'])).catch((error) =>{
          console.log(error);
        });
      }else{
      window.alert('Campos obrigatorios!');
    }
  }
  
  selectOption(option: string) {
    this.selectedOption = option;
    console.log('Opção selecionada:', option);
  }
  
  isSelected(option: string) {
    return this.selectedOption === option;
  }
}
