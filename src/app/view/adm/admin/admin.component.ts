import { Component, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Contato } from 'src/app/model/services/interfaces/contato';
import { Profile } from 'src/app/model/services/interfaces/profile';
import { Projeto } from 'src/app/model/services/interfaces/projeto';
import { Projetos } from 'src/app/model/services/interfaces/projetos';
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
  selectedOption: string = 'sobre';

  // SOBRE
  sobreEdit!: FormGroup;
  sobre!: Sobre;
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
  
  // PROJETOS
  public projetos: Projetos[] = [];
  
  //PROJETO
  projetoEdit!: FormGroup;
  projeto!: Projeto;
  titleProjeto!: string;

  //CONTATO
  contatoEdit!: FormGroup;
  contato!: Contato;
  titleContato!: string;
  descContato!: string;

  //EMAIL
  items: Observable<any[]>;
  showDescriptionFlag: boolean = false;

  //PROFILE
  profileEdit!: FormGroup;
  profile!: Profile;
  instagram!: string;
  facebook!: string;
  linkedin!: string;
  github!: string;
  phoneImg!: any;
  emailImg!: any;
  localImg!: any;
  birthImg!: any;
  phoneTXT!: string;
  emailTXT!: string;
  localTXT!: string;
  birthTXT!: string;
  phone!: string;
  email!: string;
  local!: string;
  birth!: string;
  cv!: string;
  text!: string;

  imagem1: any;
  imagem2: any;
  imagem3: any;
  imagem4: any;


  
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private firestore: AngularFirestore,
    private injector: Injector) {

      this.items = this.firestore.collection('mensagens').valueChanges();

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

      this.firebase.obterTodosProjetos().subscribe((res) => {
        this.projetos = res.map((projeto) => {
          return {
            id: projeto.payload.doc.id,
            ...(projeto.payload.doc.data() as any),
          } as Projetos;
        });
      });
  }

  ngOnInit(){
    this.initSobre();
    this.initResumo();
    this.initProjeto();
    this.initContato();
    this.initProfile();
  }

  editContato() {
    if (this.contatoEdit.valid) {
      const new_part: Contato = {...this.contatoEdit.value, id: this.contato.id};
  
      this.firebase.editarContato(new_part, this.contato.id)
        .then(() => {
          console.log('Contato atualizado com sucesso');
          this.router.navigate(['/']);
        })
        .catch((error) => {
          console.log('Erro ao atualizar Contato:', error);
        });
    } else {
      window.alert('Campos obrigatórios!');
    }
  }
  
  initContato(){
    this.contato = history.state.contato;
    console.log('Informações de contato:', this.contato);
    this.titleContato = this.contato?.titleContato;
    this.descContato = this.contato?.descContato;

    this.contatoEdit = this.formBuilder.group({
      titleContato: [this.titleContato, [Validators.required]],
      descContato: [this.descContato, [Validators.required]],

    });
  }

  editProjeto() {
    if (this.projetoEdit.valid) {
      const new_part: Projeto = {...this.projetoEdit.value, id: this.projeto.id};
  
      this.firebase.editarProjeto(new_part, this.projeto.id)
        .then(() => {
          console.log('Projeto atualizado com sucesso');
          this.router.navigate(['/']);
        })
        .catch((error) => {
          console.log('Erro ao atualizar Projeto:', error);
        });
    } else {
      window.alert('Campos obrigatórios!');
    }
  }
  
  initProjeto(){
    this.projeto = history.state.projeto;
    console.log('Informações de projeto:', this.projeto);
    this.titleProjeto = this.projeto?.titleProjeto;

    this.projetoEdit = this.formBuilder.group({
      titleProjeto: [this.titleProjeto, [Validators.required]],

    });
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

  cadastrarProjeto(){
    const create: Projetos = new Projetos("","","","","");
    this.firebase.cadastrarProjetos(create);
  }

  editarProjeto(projeto: Projetos){
    console.log('Item clicado:', projeto);
    
    this.router.navigateByUrl("/projetoedit", {state: { projeto: projeto } });
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

  convertTimestampToDate(timestamp: any): Date {
    return new Date(timestamp.seconds * 1000); 
  }

  showDescription(item: any): void {
    item.showDescription = !item.showDescription;
  }

  deleteemail(mensagem: string) {
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir este email?');
    if (confirmDelete) {
      this.firestore.collection('mensagens', ref => ref.where('mensagem', '==', mensagem))
        .get()
        .subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
          });
        });
    }
  }

  //PROFILE
  initProfile(){
    this.profile = history.state.profile;
    console.log('Informações da profile:', this.profile);
    this.instagram = this.profile?.instagram;
    this.facebook = this.profile?.facebook;
    this.linkedin = this.profile?.linkedin;
    this.github = this.profile?.github;
    this.phone = this.profile?.phone;
    this.email = this.profile?.email;
    this.local = this.profile?.local;
    this.birth = this.profile?.birth;
    this.phoneTXT = this.profile?.phoneTXT;
    this.emailTXT = this.profile?.emailTXT;
    this.localTXT = this.profile?.localTXT;
    this.birthTXT = this.profile?.birthTXT;
    this.cv = this.profile?.cv;
    this.text = this.profile?.text;

    this.profileEdit = this.formBuilder.group({
      instagram: [this.instagram, Validators.required],
      facebook: [this.facebook, Validators.required],
      linkedin: [this.linkedin, Validators.required],
      github: [this.github, Validators.required],
      phone: [this.phone, Validators.required],
      email: [this.email, Validators.required],
      local: [this.local, Validators.required],
      birth: [this.birth, Validators.required],
      phoneTXT: [this.phoneTXT, Validators.required],
      emailTXT: [this.emailTXT, Validators.required],
      localTXT: [this.localTXT, Validators.required],
      birthTXT: [this.birthTXT, Validators.required],
      cv: [this.cv, Validators.required],
      text: [this.text, Validators.required],
      imagem1: [null],
      imagem2: [null],
      imagem3: [null],
      imagem4: [null]
    });
  }

  editProfile() {
    if (this.profileEdit.valid) {
      const new_part: Profile = {
        ...this.profileEdit.value,
        id: this.profile.id,
        phoneImg: this.profile.phoneImg,
        emailImg: this.profile.emailImg,
        localImg: this.profile.localImg,
        birthImg: this.profile.birthImg
      };
  
      // Verifica se imagem1 foi carregada
      if (this.imagem1) {
        this.firebase.uploadImageProfilePhone(this.imagem1, new_part)?.then(() => {
          this.updateProfile(new_part);
        }).catch((error) => {
          console.log('Erro ao fazer upload da imagem de telefone:', error);
        });
      } else if (this.imagem2) { // Se imagem1 não foi carregada, verifica se imagem2 foi carregada
        this.firebase.uploadImageProfileEmail(this.imagem2, new_part)?.then(() => {
          this.updateProfile(new_part);
        }).catch((error) => {
          console.log('Erro ao fazer upload da imagem de e-mail:', error);
        });
      } else if (this.imagem3) { // Se imagem1 e imagem2 não foram carregadas, verifica se imagem3 foi carregada
        this.firebase.uploadImageProfileLocal(this.imagem3, new_part)?.then(() => {
          this.updateProfile(new_part);
        }).catch((error) => {
          console.log('Erro ao fazer upload da imagem de localização:', error);
        });
      } else if (this.imagem4) { // Se imagem1, imagem2 e imagem3 não foram carregadas, verifica se imagem4 foi carregada
        this.firebase.uploadImageProfileBirth(this.imagem4, new_part)?.then(() => {
          this.updateProfile(new_part);
        }).catch((error) => {
          console.log('Erro ao fazer upload da imagem de nascimento:', error);
        });
      } else {
        // Se nenhuma imagem foi carregada, atualiza o perfil com as imagens existentes
        this.updateProfile(new_part);
      }
    } else {
      window.alert('Campos obrigatórios!');
    }
  }
  
  // Função para atualizar o perfil após o upload de todas as imagens
  updateProfile(new_part: Profile) {
    this.firebase.editarProfile(new_part, this.profile.id).then(() => {
      console.log('Profile atualizado com sucesso');
      this.router.navigate(['']);
    }).catch((error) => {
      console.log('Erro ao atualizar Profile:', error);
    });
  } 
  
  handlePhoneImageUpload(event: any){
    this.imagem1 = event.target.files;
  }

  handleEmailImageUpload(event: any){
    this.imagem2 = event.target.files;
  }

  handleLocalImageUpload(event: any){
    this.imagem3 = event.target.files;
  }

  handleBirthImageUpload(event: any){
    this.imagem4 = event.target.files;
  }
  
}
