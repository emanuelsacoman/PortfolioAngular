import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { Sobre } from './interfaces/sobre';
import { Sobrearea } from './interfaces/sobrearea';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Resumo } from './interfaces/resumo';
import { ResumoL } from './interfaces/resumoL';
import { ResumoR } from './interfaces/resumoR';
import { Projetos } from './interfaces/projetos';
import { Projeto } from './interfaces/projeto';
import { Contato } from './interfaces/contato';
import { Profile } from './interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = "sobre";
  private PATH2 : string = "sobrearea";
  private PATH3 : string = "resumo";
  private PATH4 : string = "resumol";
  private PATH5 : string = "resumor";
  private PATH6 : string = "projetos";
  private PATH7 : string = "projetosArea";
  private PATH8 : string = "contato";
  private PATH9 : string = "profile";

  constructor(private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase) { }

    //Sobre
    
    obterTodosSobre() {
      return this.firestore.collection(this.PATH).snapshotChanges();
    }
    
    cadastrarSobre() {
      return this.firestore.collection(this.PATH).add({
        // nome: command.nome,
        // descricao: command.descricao,
        // imgUrl: command.imgUrl,
        // alt: command.alt,
        // cooldown: command.cooldown,
      });
    }
    
    editarSobre(sobre : Sobre, id: string) {
      return this.firestore.collection(this.PATH).doc(id).update({
         title: sobre.title,
         txt1: sobre.txt1,
         txt2: sobre.txt2,
         subtitle: sobre.subtitle,
        
      });
    }
    
    
    uploadImageSobre(imagem: any, itens: Sobrearea){
      const file = imagem.item(0);
      if(file.type.split('/')[0] !== 'image'){
        console.error("Tipo Não Suportado.");
        return;
      }
      const path = `images/${itens.ctitle}_${file.name}`;
      const fileRef = this.storage.ref(path);
      let task = this.storage.upload(path,file);
      task.snapshotChanges().pipe(
        finalize(() =>{
          let uploadFileURL = fileRef.getDownloadURL();
          uploadFileURL.subscribe(resp => {
            itens.cImg = resp;
            if(!itens.id){
              this.cadastrarSobreArea(itens);
            }else {
              this.editarSobreArea(itens, itens.id);
            }
          })
        })
        ).subscribe();
        return task;
      }
      
    
        //SobreArea
        obterTodosSobreArea() {
          return this.firestore.collection(this.PATH2).snapshotChanges();
        }

        cadastrarSobreArea(sobrearea : Sobrearea) {
          return this.firestore.collection(this.PATH2).add({
            ctitle: sobrearea.ctitle,
            cdesc: sobrearea.cdesc,
            cImg: sobrearea.cImg
          });
        }
        
        editarSobreArea(sobrearea : Sobrearea, id: string) {
          return this.firestore.collection(this.PATH2).doc(id).update({
            ctitle: sobrearea.ctitle,
            cdesc: sobrearea.cdesc,
            cImg: sobrearea.cImg
            
          });
        }

        excluirSobreArea(id: string) {
          return this.firestore.collection(this.PATH2).doc(id).delete();
        } 
        //SobreArea

      //Sobre
  
      //Resumo
  
      obterTodosResumo() {
        return this.firestore.collection(this.PATH3).snapshotChanges();
      }

      editarResumo(resumo : Resumo, id: string) {
        return this.firestore.collection(this.PATH3).doc(id).update({
          titleArea: resumo.titleArea,
          lsub: resumo.lsub,
          rsub: resumo.rsub,
          
        });
      }

        //ResumoL
        obterTodosResumoL() {
          return this.firestore.collection(this.PATH4).snapshotChanges();
        }

        editarResumoL(resumo : ResumoL, id: string) {
          return this.firestore.collection(this.PATH4).doc(id).update({
            titlel: resumo.titlel,
            descl: resumo.descl,
            locationl: resumo.locationl,
          });
        }

        excluirResumoL(id: string) {
          return this.firestore.collection(this.PATH4).doc(id).delete();
        } 

        cadastrarResumoL(resumo : ResumoL) {
          return this.firestore.collection(this.PATH4).add({
            titlel: resumo.titlel,
            descl: resumo.descl,
            locationl: resumo.locationl,
          });
        }
        //ResumoL

        //ResumoR
        obterTodosResumoR() {
          return this.firestore.collection(this.PATH5).snapshotChanges();
        }

        editarResumoR(resumo : ResumoR, id: string) {
          return this.firestore.collection(this.PATH5).doc(id).update({
            titler: resumo.titler,
            descr: resumo.descr,
            locationr: resumo.locationr,
          });
        }

        excluirResumoR(id: string) {
          return this.firestore.collection(this.PATH5).doc(id).delete();
        } 

        cadastrarResumoR(resumo : ResumoR) {
          return this.firestore.collection(this.PATH5).add({
            titler: resumo.titler,
            descr: resumo.descr,
            locationr: resumo.locationr,
          });
        }
        //ResumoR
      
      //Resumo

      //Projetos
      obterTodosProjetos() {
        return this.firestore.collection(this.PATH6).snapshotChanges();
      }

      editarProjetos(projetos : Projetos, id: string) {
        return this.firestore.collection(this.PATH6).doc(id).update({
          titulo: projetos.titulo,
          projectImg: projetos.projectImg,
          badge: projetos.badge,
          link: projetos.link,
        });
      }

      excluirProjetos(id: string) {
        return this.firestore.collection(this.PATH6).doc(id).delete();
      } 

      cadastrarProjetos(projetos : Projetos) {
        return this.firestore.collection(this.PATH6).add({
          titulo: projetos.titulo,
          projectImg: projetos.projectImg,
          badge: projetos.badge,
          link: projetos.link,
        });
      }

      uploadImageProjeto1(imagem: any, itens: Projetos){
        const file = imagem.item(0);
        if(file.type.split('/')[0] !== 'image'){
          console.error("Tipo Não Suportado.");
          return;
        }
        const path = `images/${itens.titulo}_${file.name}`;
        const fileRef = this.storage.ref(path);
        let task = this.storage.upload(path,file);
        task.snapshotChanges().pipe(
          finalize(() =>{
            let uploadFileURL = fileRef.getDownloadURL();
            uploadFileURL.subscribe(resp => {
              itens.projectImg = resp;
              if(!itens.id){
                this.cadastrarProjetos(itens);
              }else {
                this.editarProjetos(itens, itens.id);
              }
            })
          })
          ).subscribe();
          return task;
        }

      uploadImageProjeto2(imagem: any, itens: Projetos){
        const file = imagem.item(0);
        if(file.type.split('/')[0] !== 'image'){
          console.error("Tipo Não Suportado.");
          return;
        }
        const path = `images/${itens.titulo}_${file.name}`;
        const fileRef = this.storage.ref(path);
        let task = this.storage.upload(path,file);
        task.snapshotChanges().pipe(
          finalize(() =>{
            let uploadFileURL = fileRef.getDownloadURL();
            uploadFileURL.subscribe(resp => {
              itens.badge = resp;
              if(!itens.id){
                this.cadastrarProjetos(itens);
              }else {
                this.editarProjetos(itens, itens.id);
              }
            })
          })
          ).subscribe();
          return task;
        }

        //Projeto
        editarProjeto(projeto : Projeto, id: string) {
          return this.firestore.collection(this.PATH7).doc(id).update({
            titleProjeto: projeto.titleProjeto
          });
        }

        obterTodosProjeto() {
          return this.firestore.collection(this.PATH7).snapshotChanges();
        }
        
        //Projeto
      //Projetos

      //Contato
      editarContato(contato : Contato, id: string) {
        return this.firestore.collection(this.PATH8).doc(id).update({
          titleContato: contato.titleContato,
          descContato: contato.descContato,
        });
      }

      obterTodosContato() {
        return this.firestore.collection(this.PATH8).snapshotChanges();
      }
      //Contato

      //Profile
      editarProfile(profile: Profile, id: string) {
        return this.firestore.collection(this.PATH9).doc(id).update({
            instagram: profile.instagram,
            facebook: profile.facebook,
            linkedin: profile.linkedin,
            github: profile.github,
            phoneImg: profile.phoneImg,
            emailImg: profile.emailImg,
            localImg: profile.localImg,
            birthImg: profile.birthImg,
            phoneTXT: profile.phoneTXT,
            emailTXT: profile.emailTXT,
            localTXT: profile.localTXT,
            birthTXT: profile.birthTXT,
            phone: profile.phone,
            email: profile.email,
            local: profile.local,
            birth: profile.birth
        });
      }

      cadastrarProfile(profile : Profile) {
        return this.firestore.collection(this.PATH9).add({
          instagram: profile.instagram,
            facebook: profile.facebook,
            linkedin: profile.linkedin,
            github: profile.github,
            phoneImg: profile.phoneImg,
            emailImg: profile.emailImg,
            localImg: profile.localImg,
            birthImg: profile.birthImg,
            phoneTXT: profile.phoneTXT,
            emailTXT: profile.emailTXT,
            localTXT: profile.localTXT,
            birthTXT: profile.birthTXT,
            phone: profile.phone,
            email: profile.email,
            local: profile.local,
            birth: profile.birth
          
        });
      }
    
      obterTodosProfile() {
        return this.firestore.collection(this.PATH9).snapshotChanges();
      }

      // Função para carregar a imagem do telefone
      uploadPhoneImage(imagem: any, itens: Profile) {
        return this.uploadImage(imagem, itens, 'phoneImg');
      }

      // Função para carregar a imagem do e-mail
      uploadEmailImage(imagem: any, itens: Profile) {
        return this.uploadImage(imagem, itens, 'emailImg');
      }

      // Função para carregar a imagem do local
      uploadLocalImage(imagem: any, itens: Profile) {
        return this.uploadImage(imagem, itens, 'localImg');
      }

      // Função para carregar a imagem do nascimento
      uploadBirthImage(imagem: any, itens: Profile) {
        return this.uploadImage(imagem, itens, 'birthImg');
      }

      // Função genérica para carregar qualquer imagem
      private uploadImage(imagem: any, itens: Profile, propertyName: string) {
        const file = imagem.item(0);
        if (file.type.split('/')[0] !== 'image') {
            console.error("Tipo Não Suportado.");
            return;
        }
        const path = `images/${itens.id}_${file.name}`;
        const fileRef = this.storage.ref(path);
        let task = this.storage.upload(path, file);
        task.snapshotChanges().pipe(
            finalize(() => {
                let uploadFileURL = fileRef.getDownloadURL();
                uploadFileURL.subscribe(resp => {
                    switch (propertyName) {
                        case 'phoneImg':
                            itens.phoneImg = resp;
                            break;
                        case 'emailImg':
                            itens.emailImg = resp;
                            break;
                        case 'localImg':
                            itens.localImg = resp;
                            break;
                        case 'birthImg':
                            itens.birthImg = resp;
                            break;
                        default:
                            break;
                    }
                    if (!itens.id) {
                        this.cadastrarProfile(itens);
                    } else {
                        this.editarProfile(itens, itens.id);
                    }
                })
            })
        ).subscribe();
        return task;
      }

      //Profile
    }

    