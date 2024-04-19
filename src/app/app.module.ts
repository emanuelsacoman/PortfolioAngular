import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './view/usuario/index/index.component';
import { LoginComponent } from './view/usuario/login/login.component';
import { AdminComponent } from './view/adm/admin/admin.component';
import { AuthService } from './model/services/auth.service';
import { AuthGuard } from './model/shared/auth.guard';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule, } from '@angular/fire/compat/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ItemeditComponent } from './view/adm/edit/itemedit/itemedit.component';
import { ResumoleditComponent } from './view/adm/edit/resumoledit/resumoledit.component';
import { ResumoreditComponent } from './view/adm/edit/resumoredit/resumoredit.component';
import { ProjetoeditComponent } from './view/adm/edit/projetoedit/projetoedit.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    AdminComponent,
    ItemeditComponent,
    ResumoleditComponent,
    ResumoreditComponent,
    ProjetoeditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    provideAuth(() => getAuth()),
    HttpClientModule
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

