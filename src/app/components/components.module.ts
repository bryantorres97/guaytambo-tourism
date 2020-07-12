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
import { ImageModalComponent } from './image-modal/image-modal.component';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { CardComentarioComponent } from './card-comentario/card-comentario.component';
import { ListaComentariosComponent } from './lista-comentarios/lista-comentarios.component';

//Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CategoriaComponent,
    CategoriasComponent,
    SitioCardComponent,
    SitiosListaComponent,
    AvatarSelectorComponent,
    DetalleSitioComponent,
    ImageModalComponent,
    SlideshowPosterComponent,
    CardComentarioComponent,
    ListaComentariosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    CategoriasComponent,
    SitiosListaComponent,
    AvatarSelectorComponent,
    SlideshowPosterComponent,
    CardComentarioComponent,
    ListaComentariosComponent
  ],

  entryComponents: [
    DetalleSitioComponent,
    SitioCardComponent,
    ImageModalComponent
  ]
})
export class ComponentsModule { }
