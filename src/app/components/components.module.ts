import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';

import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SitioCardComponent } from './sitio-card/sitio-card.component';
import { SitiosListaComponent } from './sitios-lista/sitios-lista.component';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { DetalleSitioComponent } from './detalle-sitio/detalle-sitio.component';


@NgModule({
  declarations: [
    CategoriaComponent,
    CategoriasComponent,
    SitioCardComponent,
    SitiosListaComponent,
    AvatarSelectorComponent,
    DetalleSitioComponent
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
  ],

  entryComponents: [
    DetalleSitioComponent
  ]
})
export class ComponentsModule { }
