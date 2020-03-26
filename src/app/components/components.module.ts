import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaComponent } from './categoria/categoria.component';




@NgModule({
  declarations: [
    CategoriaComponent,
    CategoriasComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CategoriasComponent
  ]
})
export class ComponentsModule { }
