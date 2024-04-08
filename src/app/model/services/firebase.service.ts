import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = "Conteudo";

  constructor(private firestore: AngularFirestore,
    private storage: AngularFireStorage) { }

    //PATH
    
    obterTodos() {
      return this.firestore.collection(this.PATH).snapshotChanges();
    }
    
    cadastrar() {
      return this.firestore.collection(this.PATH).add({
        // nome: command.nome,
        // descricao: command.descricao,
        // imgUrl: command.imgUrl,
        // alt: command.alt,
        // cooldown: command.cooldown,
      });
    }
    
    editar(id: string) {
      return this.firestore.collection(this.PATH).doc(id).update({
        // nome: command.nome,
        // descricao: command.descricao,
        // imgUrl: command.imgUrl,
        // alt: command.alt,
        // cooldown: command.cooldown,
      });
    }
    
    
    // uploadImage(imagem: any){
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
      
      excluir(id: string) {
        return this.firestore.collection(this.PATH).doc(id).delete();
      }  
    }
    
    //PATH