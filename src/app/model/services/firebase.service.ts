import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { Sobre } from './interfaces/sobre';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = "Sobre";

  constructor(private firestore: AngularFirestore,
    private storage: AngularFireStorage) { }

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
    
    
    // uploadImageSobre(imagem: any){
    //   const file = imagem.item(0);
    //   if(file.type.split('/')[0] !== 'image'){
    //     console.error("Tipo Não Suportado.");
    //     return;
    //   }
    //   const path = `images/${itens.nome}_${file.name}`;
    //   const fileRef = this.storage.ref(path);
    //   let task = this.storage.upload(path,file);
    //   task.snapshotChanges().pipe(
    //     finalize(() =>{
    //       let uploadFileURL = fileRef.getDownloadURL();
    //       uploadFileURL.subscribe(resp => {
    //         itens.imgUrl = resp;
    //         if(!itens.id){
    //           this.cadastrar(itens);
    //         }else {
    //           this.editar(itens, itens.id);
    //         }
    //       })
    //     })
    //     ).subscribe();
    //     return task;
    //   }
      
      excluirSobre(id: string) {
        return this.firestore.collection(this.PATH).doc(id).delete();
      }  
    }
    
    //Sobre