import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './view/usuario/index/index.component';
import { LoginComponent } from './view/usuario/login/login.component';
import { AdminComponent } from './view/adm/admin/admin.component';
import { AuthGuard } from './model/shared/auth.guard';
import { ItemeditComponent } from './view/adm/edit/itemedit/itemedit.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
