import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { ItemeditComponent } from './itemedit.component';

const routes: Routes = [
  {
    path: '',
    component: ItemeditComponent,
  },
];

@NgModule({
  declarations: [ItemeditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ],
})
export class ItemeditModule {}
