import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Resumo } from 'src/app/model/services/interfaces/resumo';
import { ResumoL } from 'src/app/model/services/interfaces/resumoL';
import { ResumoR } from 'src/app/model/services/interfaces/resumoR';
import { Sobre } from 'src/app/model/services/interfaces/sobre';
import { Sobrearea } from 'src/app/model/services/interfaces/sobrearea';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  // SOBRE
  sobreEdit!: FormGroup;
  sobre!: Sobre;
  selectedOption: string = 'resumo';
  title!: string;
  txt1!: string;
  txt2!: string;
  subtitle!: string;

  // SOBRE AREA
  sobreAreaEdit!: FormGroup;
  sobrearea!: Sobrearea;
  public sobreareaArray: Sobrearea[] = [];
  ctitle!: string;
  cdesc!: string;
  imagem: any;

  // RESUMO
  resumoEdit!: FormGroup;
  imagemResumo: any;
  resumo!: Resumo;
  titleArea!: string;
  lsub!: string;
  rsub!: string;

  // RESUMOL
  public resumol: ResumoL[] = [];
  titlel!: string;
  descl!: string;
  locationl!: string;

  // RESUMOR
  public resumor: ResumoR[] = [];
  titler!: string;
  descr!: string;
  locationr!: string;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private firestore: AngularFirestore) {
      this.firebase.obterTodosSobreArea().subscribe((res) => {
        this.sobreareaArray = res.map((sobre) => {
          return {
            id: sobre.payload.doc.id,
            ...(sobre.payload.doc.data() as any),
          } as Sobrearea;
        });
      });

      this.firebase.obterTodosResumoL().subscribe((res) => {
        this.resumol = res.map((resumol) => {
          return {
            id: resumol.payload.doc.id,
            ...(resumol.payload.doc.data() as any),
          } as ResumoL;
        });
      });

      this.firebase.obterTodosResumoR().subscribe((res) => {
        this.resumor = res.map((resumor) => {
          return {
            id: resumor.payload.doc.id,
            ...(resumor.payload.doc.data() as any),
          } as ResumoR;
        });
      });
  }

  ngOnInit(){
    this.initSobre();
    this.initResumo();
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

  editar(sobrearea: Sobrearea){
    console.log('Item clicado:', sobrearea);
    
    this.router.navigateByUrl("/itemedit", {state: { sobrearea: sobrearea } });
  }

  //RESUMO
  initResumo(){
    this.resumo = history.state.resumo;
    console.log('Informações da resumo:', this.resumo);
    this.titleArea = this.resumo?.titleArea;
    this.lsub = this.resumo?.lsub;
    this.rsub = this.resumo?.rsub;

    this.resumoEdit = this.formBuilder.group({
      titleArea: [this.titleArea, [Validators.required]],
      lsub: [this.lsub, [Validators.required]],
      rsub: [this.rsub, [Validators.required]],
      rImg: [null],
      lImg: [null],
    });
  }

  editResumo() {
    if (this.resumoEdit.valid) {
      const new_part: Resumo = {...this.resumoEdit.value, id: this.resumo.id};
  
      this.firebase.editarResumo(new_part, this.resumo.id)
        .then(() => {
          console.log('Resumo atualizado com sucesso');
          this.router.navigate(['/']);
        })
        .catch((error) => {
          console.log('Erro ao atualizar Resumo:', error);
        });
    } else {
      window.alert('Campos obrigatórios!');
    }
  }


  addresumol(){
    const create: ResumoL = new ResumoL("","","","");
    this.firebase.cadastrarResumoL(create);
  }

  editarl(resumol: ResumoL){
    console.log('Item clicado:', resumol);
    
    this.router.navigateByUrl("/resumoledit", {state: { resumol: resumol } });
  }

  addresumor(){
    const create: ResumoR = new ResumoR("","","","");
    this.firebase.cadastrarResumoR(create);
  }

  editarr(resumor: ResumoR){
    console.log('Item clicado:', resumor);
    
    this.router.navigateByUrl("/resumoredit", {state: { resumor: resumor } });
  }

  goBack(){
    this.router.navigateByUrl('/');
  }

  cadastrar(){
    const create: Sobrearea = new Sobrearea("","","", null);
    this.firebase.cadastrarSobreArea(create);
  }
  
  uploadFile(event: any){
    this.imagem = event.target.files;
  }

  uploadFileL(event: any){
    this.imagem = event.target.files;
  }
  uploadFileR(event: any){
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
