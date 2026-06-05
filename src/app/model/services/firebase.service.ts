import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, firstValueFrom } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
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
import { Slider } from './interfaces/slider';
import { Chip } from './interfaces/chip';
import { Mensagem } from './interfaces/mensagem';
import { ProfileVisitStat } from './interfaces/profile-visit-stat';
import { SiteTheme } from './interfaces/site-theme';

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
  private PATH10 : string = "slider";
  private PATH11 : string = "chip";
  private PATH12 : string = "mensagens";
  private PATH13 : string = "profileVisits";
  private PATH14 : string = "siteTheme";

  constructor(private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase) { }

    private cleanPayload(payload: Record<string, unknown>): Record<string, unknown> {
      return Object.fromEntries(
        Object.entries(payload).filter(([, value]) => value !== undefined)
      );
    }

    private atualizarOrdemColecao(path: string, items: Array<{ id: string }>, field = 'ordem') {
      const batch = this.firestore.firestore.batch();

      items.forEach((item, index) => {
        batch.update(this.firestore.collection(path).doc(item.id).ref, {
          [field]: index + 1,
        });
      });

      return batch.commit();
    }

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
         paragrafos: sobre.paragrafos,
        
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
            cImg: sobrearea.cImg,
            ordem: sobrearea.ordem
          });
        }
        
        editarSobreArea(sobrearea : Sobrearea, id: string) {
          return this.firestore.collection(this.PATH2).doc(id).update({
            ctitle: sobrearea.ctitle,
            cdesc: sobrearea.cdesc,
            cImg: sobrearea.cImg,
            ordem: sobrearea.ordem
            
          });
        }

        excluirSobreArea(id: string) {
          return this.firestore.collection(this.PATH2).doc(id).delete();
        } 

        reordenarSobreArea(items: Sobrearea[]) {
          return this.atualizarOrdemColecao(this.PATH2, items);
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
          chart: resumo.chart,
          chip: resumo.chip,
          
        });
      }

        //ResumoL
        obterTodosResumoL() {
          return this.firestore.collection(this.PATH4).snapshotChanges();
        }

        editarResumoL(resumo : ResumoL, id: string) {
          return this.firestore.collection(this.PATH4).doc(id).update(this.cleanPayload({
            titlel: resumo.titlel,
            descl: resumo.descl,
            locationl: resumo.locationl,
            organizationl: resumo.organizationl,
            levell: resumo.levell,
            linkl: resumo.linkl,
            tagsl: resumo.tagsl,
            detaill: resumo.detaill,
            orderl: resumo.orderl,
            highlightl: resumo.highlightl,
          }));
        }

        excluirResumoL(id: string) {
          return this.firestore.collection(this.PATH4).doc(id).delete();
        } 

        reordenarResumoL(items: ResumoL[]) {
          return this.atualizarOrdemColecao(this.PATH4, items, 'orderl');
        }

        cadastrarResumoL(resumo : ResumoL) {
          return this.firestore.collection(this.PATH4).add(this.cleanPayload({
            titlel: resumo.titlel,
            descl: resumo.descl,
            locationl: resumo.locationl,
            organizationl: resumo.organizationl,
            levell: resumo.levell,
            linkl: resumo.linkl,
            tagsl: resumo.tagsl,
            detaill: resumo.detaill,
            orderl: resumo.orderl,
            highlightl: resumo.highlightl,
          }));
        }
        //ResumoL

        //ResumoR
        obterTodosResumoR() {
          return this.firestore.collection(this.PATH5).snapshotChanges();
        }

        editarResumoR(resumo : ResumoR, id: string) {
          return this.firestore.collection(this.PATH5).doc(id).update(this.cleanPayload({
            titler: resumo.titler,
            descr: resumo.descr,
            locationr: resumo.locationr,
            companyr: resumo.companyr,
            roler: resumo.roler,
            linkr: resumo.linkr,
            tagsr: resumo.tagsr,
            detailr: resumo.detailr,
            orderr: resumo.orderr,
            highlightr: resumo.highlightr,
          }));
        }

        excluirResumoR(id: string) {
          return this.firestore.collection(this.PATH5).doc(id).delete();
        } 

        reordenarResumoR(items: ResumoR[]) {
          return this.atualizarOrdemColecao(this.PATH5, items, 'orderr');
        }

        cadastrarResumoR(resumo : ResumoR) {
          return this.firestore.collection(this.PATH5).add(this.cleanPayload({
            titler: resumo.titler,
            descr: resumo.descr,
            locationr: resumo.locationr,
            companyr: resumo.companyr,
            roler: resumo.roler,
            linkr: resumo.linkr,
            tagsr: resumo.tagsr,
            detailr: resumo.detailr,
            orderr: resumo.orderr,
            highlightr: resumo.highlightr,
          }));
        }
        //ResumoR
      
      //Resumo

      //Projetos
      obterTodosProjetos() {
        return this.firestore.collection(this.PATH6).snapshotChanges();
      }

      editarProjetos(projetos : Projetos, id: string) {
        return this.firestore.collection(this.PATH6).doc(id).update(this.cleanPayload({
          titulo: projetos.titulo,
          projectImg: projetos.projectImg,
          badge: projetos.badge,
          link: projetos.link,
          inProgress: projetos.inProgress,
          star: projetos.star,
          subtitulo: projetos.subtitulo,
          descricao: projetos.descricao,
          tecnologias: projetos.tecnologias,
          galeria: projetos.galeria,
          repositorio: projetos.repositorio,
          caseStudy: projetos.caseStudy,
          periodo: projetos.periodo,
          tipo: projetos.tipo,
          funcao: projetos.funcao,
          cliente: projetos.cliente,
          destaques: projetos.destaques,
          ordem: projetos.ordem,
          ctaLabel: projetos.ctaLabel,
          clickCount: projetos.clickCount,
        }));
      }

      excluirProjetos(id: string) {
        return this.firestore.collection(this.PATH6).doc(id).delete();
      } 

      reordenarProjetos(items: Projetos[]) {
        return this.atualizarOrdemColecao(this.PATH6, items, 'ordem');
      }

      cadastrarProjetos(projetos : Projetos) {
        return this.firestore.collection(this.PATH6).add(this.cleanPayload({
          titulo: projetos.titulo,
          projectImg: projetos.projectImg,
          badge: projetos.badge,
          link: projetos.link,
          inProgress: projetos.inProgress,
          star: projetos.star,
          subtitulo: projetos.subtitulo,
          descricao: projetos.descricao,
          tecnologias: projetos.tecnologias,
          galeria: projetos.galeria,
          repositorio: projetos.repositorio,
          caseStudy: projetos.caseStudy,
          periodo: projetos.periodo,
          tipo: projetos.tipo,
          funcao: projetos.funcao,
          cliente: projetos.cliente,
          destaques: projetos.destaques,
          ordem: projetos.ordem,
          ctaLabel: projetos.ctaLabel,
          clickCount: projetos.clickCount ?? 0,
        }));
      }

      registrarCliqueProjeto(id: string) {
        return this.firestore.collection(this.PATH6).doc(id).update({
          clickCount: firebase.firestore.FieldValue.increment(1),
          lastClickAt: firebase.firestore.FieldValue.serverTimestamp(),
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

      async uploadProjectAsset(imagem: any, itens: Projetos, field: 'projectImg' | 'badge'): Promise<void> {
        const file = imagem?.item(0);

        if (!file || file.type.split('/')[0] !== 'image') {
          throw new Error('Tipo de arquivo nao suportado.');
        }

        const path = `images/${itens.titulo}_${field}_${file.name}`;
        const fileRef = this.storage.ref(path);
        await this.storage.upload(path, file);
        const uploadFileURL = await firstValueFrom(fileRef.getDownloadURL());

        if (field === 'projectImg') {
          itens.projectImg = uploadFileURL;
        } else {
          itens.badge = uploadFileURL;
        }

        if (!itens.id) {
          await this.cadastrarProjetos(itens);
        } else {
          await this.editarProjetos(itens, itens.id);
        }
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
          paragrafosContato: contato.paragrafosContato,
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
            birth: profile.birth,
            cv: profile.cv,
            text: profile.text,
            socialLinks: profile.socialLinks,
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
            birth: profile.birth,
            cv: profile.cv,
            text: profile.text,
            socialLinks: profile.socialLinks,
          
        });
      }
    
      obterTodosProfile() {
        return this.firestore.collection(this.PATH9).snapshotChanges();
      }

      uploadImageProfilePhone(imagem: any, itens: Profile){
        const file = imagem.item(0);
        if(file.type.split('/')[0] !== 'image'){
          console.error("Tipo Não Suportado.");
          return;
        }
        const path = `images/${itens.phone}_${file.name}`;
        const fileRef = this.storage.ref(path);
        let task = this.storage.upload(path,file);
        task.snapshotChanges().pipe(
          finalize(() =>{
            let uploadFileURL = fileRef.getDownloadURL();
            uploadFileURL.subscribe(resp => {
              itens.phoneImg = resp;
              if(!itens.id){
                this.cadastrarProfile(itens);
              }else {
                this.editarProfile(itens, itens.id);
              }
            })
          })
          ).subscribe();
          return task;
        }
      uploadImageProfileEmail(imagem: any, itens: Profile){
        const file = imagem.item(0);
        if(file.type.split('/')[0] !== 'image'){
          console.error("Tipo Não Suportado.");
          return;
        }
        const path = `images/${itens.email}_${file.name}`;
        const fileRef = this.storage.ref(path);
        let task = this.storage.upload(path,file);
        task.snapshotChanges().pipe(
          finalize(() =>{
            let uploadFileURL = fileRef.getDownloadURL();
            uploadFileURL.subscribe(resp => {
              itens.emailImg = resp;
              if(!itens.id){
                this.cadastrarProfile(itens);
              }else {
                this.editarProfile(itens, itens.id);
              }
            })
          })
          ).subscribe();
          return task;
        }
      uploadImageProfileLocal(imagem: any, itens: Profile){
        const file = imagem.item(0);
        if(file.type.split('/')[0] !== 'image'){
          console.error("Tipo Não Suportado.");
          return;
        }
        const path = `images/${itens.local}_${file.name}`;
        const fileRef = this.storage.ref(path);
        let task = this.storage.upload(path,file);
        task.snapshotChanges().pipe(
          finalize(() =>{
            let uploadFileURL = fileRef.getDownloadURL();
            uploadFileURL.subscribe(resp => {
              itens.localImg = resp;
              if(!itens.id){
                this.cadastrarProfile(itens);
              }else {
                this.editarProfile(itens, itens.id);
              }
            })
          })
          ).subscribe();
          return task;
        }
      uploadImageProfileBirth(imagem: any, itens: Profile){
        const file = imagem.item(0);
        if(file.type.split('/')[0] !== 'image'){
          console.error("Tipo Não Suportado.");
          return;
        }
        const path = `images/${itens.birth}_${file.name}`;
        const fileRef = this.storage.ref(path);
        let task = this.storage.upload(path,file);
        task.snapshotChanges().pipe(
          finalize(() =>{
            let uploadFileURL = fileRef.getDownloadURL();
            uploadFileURL.subscribe(resp => {
              itens.birthImg = resp;
              if(!itens.id){
                this.cadastrarProfile(itens);
              }else {
                this.editarProfile(itens, itens.id);
              }
            })
          })
          ).subscribe();
          return task;
        }
      //Profile

      //Slider
      obterTodosSlider() {
        return this.firestore.collection(this.PATH10).snapshotChanges();
      }

      excluirSlider(id: string) {
        return this.firestore.collection(this.PATH10).doc(id).delete();
      } 

      cadastrarSlider(slider : Slider) {
        return this.firestore.collection(this.PATH10).add({
          Carouselimg: slider.Carouselimg,
          ordem: slider.ordem
          
        });
      }

      editarSlider(slider: Slider, id: string) {
        return this.firestore.collection(this.PATH10).doc(id).update({
          Carouselimg: slider.Carouselimg,
          ordem: slider.ordem
            
        });
      }

      reordenarSlider(items: Slider[]) {
        return this.atualizarOrdemColecao(this.PATH10, items);
      }

      uploadImageSlider(imagem: any, itens: Slider){
        const file = imagem.item(0);
        if(file.type.split('/')[0] !== 'image'){
          console.error("Tipo Não Suportado.");
          return;
        }
        const path = `images/${itens.id}_${file.name}`;
        const fileRef = this.storage.ref(path);
        let task = this.storage.upload(path,file);
        task.snapshotChanges().pipe(
          finalize(() =>{
            let uploadFileURL = fileRef.getDownloadURL();
            uploadFileURL.subscribe(resp => {
              itens.Carouselimg = resp;
              if(!itens.id){
                this.cadastrarSlider(itens);
              }else {
                this.editarSlider(itens, itens.id);
              }
            })
          })
          ).subscribe();
          return task;
        }
      //Slider

      //Chip
      obterTodosChip() {
        return this.firestore.collection(this.PATH11).snapshotChanges();
      }

      cadastrarChip(chip : Chip) {
        return this.firestore.collection(this.PATH11).add({
          chipname: chip.chipname,
          ordem: chip.ordem
          
        });
      }

      excluirChip(id: string) {
        return this.firestore.collection(this.PATH11).doc(id).delete();
      }

      reordenarChip(items: Chip[]) {
        return this.atualizarOrdemColecao(this.PATH11, items);
      }
      //Chip

      //Mensagens

      //Tema

      obterTemaSite() {
        return this.firestore.collection<SiteTheme>(this.PATH14).doc('default').valueChanges();
      }

      salvarTemaSite(theme: SiteTheme) {
        return this.firestore.collection(this.PATH14).doc('default').set(theme, { merge: true });
      }

      //Tema

      //Visitas

      obterVisitasPerfil(dias = 14) {
        return this.firestore.collection<ProfileVisitStat>(
          this.PATH13,
          ref => ref.orderBy('date', 'desc').limit(dias)
        ).snapshotChanges();
      }

      async registrarVisitaPerfil(): Promise<void> {
        if (typeof window === 'undefined') {
          return;
        }

        const dateKey = this.getLocalDateKey();
        const trackedDateKey = 'portfolioProfileVisitTrackedDate';

        if (localStorage.getItem(trackedDateKey) === dateKey) {
          return;
        }

        const visitorId = this.getOrCreateVisitorId();
        const dayRef = this.firestore.collection(this.PATH13).doc(dateKey).ref;
        const visitorRef = dayRef.collection('visitors').doc(visitorId);

        await this.firestore.firestore.runTransaction(async (transaction) => {
          const dayDoc = await transaction.get(dayRef);
          const visitorDoc = await transaction.get(visitorRef);
          const now = new Date();

          if (!dayDoc.exists) {
            transaction.set(dayRef, {
              date: dateKey,
              uniqueVisitors: visitorDoc.exists ? 0 : 1,
              totalVisits: 1,
              updatedAt: now,
            });
          } else {
            transaction.update(dayRef, this.cleanPayload({
              totalVisits: firebase.firestore.FieldValue.increment(1),
              uniqueVisitors: visitorDoc.exists ? undefined : firebase.firestore.FieldValue.increment(1),
              updatedAt: now,
            }));
          }

          if (!visitorDoc.exists) {
            transaction.set(visitorRef, {
              firstSeenAt: now,
              userAgent: window.navigator.userAgent,
            });
          }
        });

        localStorage.setItem(trackedDateKey, dateKey);
      }

      private getLocalDateKey(): string {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
      }

      private getOrCreateVisitorId(): string {
        const storageKey = 'portfolioVisitorId';
        const current = localStorage.getItem(storageKey);

        if (current) {
          return current;
        }

        const visitorId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

        localStorage.setItem(storageKey, visitorId);
        return visitorId;
      }

      //Visitas

      //Mensagens

      obterTodasMensagens() {
        return this.firestore.collection(this.PATH12).snapshotChanges();
      }

      cadastrarMensagem(mensagem: Mensagem) {
        return this.firestore.collection(this.PATH12).add({
          mensagem: mensagem.mensagem,
          visualizado: mensagem.visualizado,
          timestamp: mensagem.timestamp,
          nome: mensagem.nome,
          titulo: mensagem.titulo,
          email: mensagem.email
        });
      }

      excluirMensagem(id: string) {
        return this.firestore.collection(this.PATH12).doc(id).delete();
      }

      editarMensagemParaVisualizado(mensagem: string) {
        this.firestore.collection(this.PATH12, ref => ref.where('mensagem', '==', mensagem))
          .snapshotChanges()
          .subscribe(snapshot => {
            snapshot.forEach(docChange => {
              const id = docChange.payload.doc.id;
              this.firestore.collection(this.PATH12).doc(id).update({
                visualizado: true
              });
            });
          });
      }               

      //Mensagens

    }

