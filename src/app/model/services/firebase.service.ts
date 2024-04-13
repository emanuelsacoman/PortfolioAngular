import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { Sobre } from './interfaces/sobre';
import { Sobrearea } from './interfaces/sobrearea';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = "sobre";
  private PATH2 : string = "sobrearea";

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
    
    
    // uploadImageSobre(imagem: any, itens: Sobrearea){
    //   const file = imagem.item(0);
    //   if(file.type.split('/')[0] !== 'image'){
    //     console.error("Tipo Não Suportado.");
    //     return;
    //   }
    //   const path = `images/${itens.ctitle}_${file.name}`;
    //   const fileRef = this.storage.ref(path);
    //   let task = this.storage.upload(path,file);
    //   task.snapshotChanges().pipe(
    //     finalize(() =>{
    //       let uploadFileURL = fileRef.getDownloadURL();
    //       uploadFileURL.subscribe(resp => {
    //         itens.cImg = resp;
    //         if(!itens.id){
    //           this.cadastrarSobreArea(itens);
    //         }else {
    //           this.editarSobreArea(itens, itens.id);
    //         }
    //       })
    //     })
    //     ).subscribe();
    //     return task;
    //   }
      
    
        //SobreArea
        obterTodosSobreArea() {
          return this.firestore.collection(this.PATH2).snapshotChanges();
        }

        cadastrarSobreArea(sobrearea : Sobrearea) {
          return this.firestore.collection(this.PATH2).add({
            ctitle: sobrearea.ctitle,
            cdesc: sobrearea.cdesc,
            // cImg: sobrearea.cImg
          });
        }
        
        editarSobreArea(sobrearea : Sobrearea, id: string) {
          return this.firestore.collection(this.PATH2).doc(id).update({
            ctitle: sobrearea.ctitle,
            cdesc: sobrearea.cdesc,
            // cImg: sobrearea.cImg
            
          });
        }

        excluirSobreArea(id: string) {
          return this.firestore.collection(this.PATH2).doc(id).delete();
        } 
        //SobreArea

      //Sobre
  
      //Resumo
  
  
      
      //Resumo
    }

    