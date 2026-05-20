import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { ResumoreditComponent } from './resumoredit.component';

const routes: Routes = [
  {
    path: '',
    component: ResumoreditComponent,
  },
];

@NgModule({
  declarations: [ResumoreditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ],
})
export class ResumoreditModule {}
