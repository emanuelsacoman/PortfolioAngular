import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './view/usuario/index/index.component';
import { LoginComponent } from './view/usuario/login/login.component';
import { AdminComponent } from './view/adm/admin/admin.component';
import { AuthGuard } from './model/shared/auth.guard';
import { ItemeditComponent } from './view/adm/edit/itemedit/itemedit.component';
import { ResumoleditComponent } from './view/adm/edit/resumoledit/resumoledit.component';
import { ResumoreditComponent } from './view/adm/edit/resumoredit/resumoredit.component';
import { ProjetoeditComponent } from './view/adm/edit/projetoedit/projetoedit.component';
import { SlidereditComponent } from './view/adm/edit/slideredit/slideredit.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'itemedit',
    component: ItemeditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'resumoledit',
    component: ResumoleditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'resumoredit',
    component: ResumoreditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projetoedit',
    component: ProjetoeditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'slideredit',
    component: SlidereditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
