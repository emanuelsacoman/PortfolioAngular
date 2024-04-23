import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Sobre } from 'src/app/model/services/interfaces/sobre';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { AuthService } from 'src/app/model/services/auth.service';
import { Sobrearea } from 'src/app/model/services/interfaces/sobrearea';
import { Resumo } from 'src/app/model/services/interfaces/resumo';
import { ResumoL } from 'src/app/model/services/interfaces/resumoL';
import { ResumoR } from 'src/app/model/services/interfaces/resumoR';
import { Projeto } from 'src/app/model/services/interfaces/projeto';
import { Projetos } from 'src/app/model/services/interfaces/projetos';
import { Contato } from 'src/app/model/services/interfaces/contato';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  profileData: any;
  profileImageUrl!: string;
  selectedOption: string = 'sobre';
  
  //DB
  public sobre: Sobre[] = [];
  public sobreLoaded = false;
  public resumo: Resumo[] = [];

  public sobrearea: Sobrearea[] = [];

  public resumol: ResumoL[] = [];
  public resumor: ResumoR[] = [];

  public projeto: Projeto[] = [];

  public projetos: Projetos[] = [];
  public contato: Contato[] = [];
  //DB

  //Form
  contactForm!: FormGroup;
  mensagemEnviada: boolean = false;
  //Form
  
  constructor(private http: HttpClient,
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore) {
      this.firebaseService.obterTodosSobre().subscribe((res) => {
        this.sobre = res.map((sobre) => {
          return {
            id: sobre.payload.doc.id,
            ...(sobre.payload.doc.data() as any),
          } as Sobre;
        });
        this.sobreLoaded = true;
      });

      this.firebaseService.obterTodosSobreArea().subscribe((res) => {
        this.sobrearea = res.map((sobre) => {
          return {
            id: sobre.payload.doc.id,
            ...(sobre.payload.doc.data() as any),
          } as Sobrearea;
        });
      });

      this.firebaseService.obterTodosResumo().subscribe((res) => {
        this.resumo = res.map((resumo) => {
          return {
            id: resumo.payload.doc.id,
            ...(resumo.payload.doc.data() as any),
          } as Resumo;
        });
      });

      this.firebaseService.obterTodosResumoL().subscribe((res) => {
        this.resumol = res.map((resumol) => {
          return {
            id: resumol.payload.doc.id,
            ...(resumol.payload.doc.data() as any),
          } as ResumoL;
        });
      });

      this.firebaseService.obterTodosResumoR().subscribe((res) => {
        this.resumor = res.map((resumor) => {
          return {
            id: resumor.payload.doc.id,
            ...(resumor.payload.doc.data() as any),
          } as ResumoR;
        });
      });

      this.firebaseService.obterTodosProjeto().subscribe((res) => {
        this.projeto = res.map((projeto) => {
          return {
            id: projeto.payload.doc.id,
            ...(projeto.payload.doc.data() as any),
          } as Projeto;
        });
      });

      this.firebaseService.obterTodosProjetos().subscribe((res) => {
        this.projetos = res.map((projetos) => {
          return {
            id: projetos.payload.doc.id,
            ...(projetos.payload.doc.data() as any),
          } as Projetos;
        });
      });

      this.firebaseService.obterTodosContato().subscribe((res) => {
        this.contato = res.map((contato) => {
          return {
            id: contato.payload.doc.id,
            ...(contato.payload.doc.data() as any),
          } as Contato;
        });
      });

    }

  ngOnInit() {
    this.getGitHubProfile();
    this.initForm();
  }

  initForm() {
    this.contactForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      mensagem: new FormControl('', [Validators.required]),
      titulo: new FormControl('', [Validators.required])
    });
  }

  getGitHubProfile() {
    this.http.get('https://api.github.com/users/emanuelsacoman').subscribe((data: any) => {
      this.profileData = data;
      this.profileImageUrl = data.avatar_url;
    });
  }

  selectOption(option: string) {
    this.selectedOption = option;
    console.log('Opção selecionada:', option);
  }

  isSelected(option: string) {
    return this.selectedOption === option;
  }

  goToAdmin(data: {sobre: Sobre, resumo: Resumo, projeto: Projeto, contato: Contato}) {
    this.router.navigateByUrl('/admin', { state: data });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  submit(){
    if (this.contactForm.valid) {
      const dados = this.contactForm.value;
      dados.timestamp = new Date();
      dados.visualizado = false;
      dados.showDescription = false;
      
      this.firestore.collection('mensagens').add(dados)
        .then(() => {
          console.log('Mensagem enviada com sucesso!');
          this.contactForm.reset();
          this.mensagemEnviada = true;
          
        })
        .catch(error => {
          console.error('Erro ao enviar mensagem:', error);
          
        });
    }
  }

  isInvalidControl(controlName: string) {
    const control = this.contactForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
