import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { ResumoleditComponent } from './resumoledit.component';

const routes: Routes = [
  {
    path: '',
    component: ResumoleditComponent,
  },
];

@NgModule({
  declarations: [ResumoleditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ],
})
export class ResumoleditModule {}
