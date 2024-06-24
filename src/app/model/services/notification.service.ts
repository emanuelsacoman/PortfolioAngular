// notification.service.ts
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private afMessaging: AngularFireMessaging) { }

  requestPermission() {
    this.afMessaging.requestPermission
      .pipe(take(1))
      .subscribe(
        () => {
          console.log('Permission granted!');
          this.listen();
        },
        (error) => {
          console.error('Permission denied!', error);
        }
      );
  }

  listen() {
    this.afMessaging.messages
      .pipe(take(1))
      .subscribe((message) => {
        console.log(message);
        new Notification('Nova mensagem!', {
          body: 'Você recebeu uma nova mensagem.',
        });
      });
  }
}
