import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';

import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SitioCardComponent } from './sitio-card/sitio-card.component';
import { SitiosListaComponent } from './sitios-lista/sitios-lista.component';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';


@NgModule({
  declarations: [
    CategoriaComponent,
    CategoriasComponent,
    SitioCardComponent,
    SitiosListaComponent,
    AvatarSelectorComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports: [
    CategoriasComponent,
    SitiosListaComponent,
    AvatarSelectorComponent
  ]
})
export class ComponentsModule { }
