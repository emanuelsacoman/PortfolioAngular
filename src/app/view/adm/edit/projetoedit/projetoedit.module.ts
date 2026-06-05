import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule, Routes } from '@angular/router';
import { ProjetoeditComponent } from './projetoedit.component';

const routes: Routes = [
  {
    path: '',
    component: ProjetoeditComponent,
  },
];

@NgModule({
  declarations: [ProjetoeditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes),
  ],
})
export class ProjetoeditModule {}
