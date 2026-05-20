import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './model/shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./view/usuario/index/index.module').then((m) => m.IndexModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./view/usuario/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./view/adm/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'itemedit',
    canActivate: [AuthGuard],
    loadChildren: () => import('./view/adm/edit/itemedit/itemedit.module').then((m) => m.ItemeditModule),
  },
  {
    path: 'resumoledit',
    canActivate: [AuthGuard],
    loadChildren: () => import('./view/adm/edit/resumoledit/resumoledit.module').then((m) => m.ResumoleditModule),
  },
  {
    path: 'resumoredit',
    canActivate: [AuthGuard],
    loadChildren: () => import('./view/adm/edit/resumoredit/resumoredit.module').then((m) => m.ResumoreditModule),
  },
  {
    path: 'projetoedit',
    canActivate: [AuthGuard],
    loadChildren: () => import('./view/adm/edit/projetoedit/projetoedit.module').then((m) => m.ProjetoeditModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
