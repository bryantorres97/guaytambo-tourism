import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanatizerPipe } from './dom-sanatizer.pipe';
import { ImagenPipe } from './imagen.pipe';
import { ImagenPortadaPipe } from './imagen-portada.pipe';
import { ImagenPerfilPipe } from './imagen-perfil.pipe';
import { AvatarPipe } from './avatar.pipe';
import { FechaPipe } from './fecha.pipe';
import { NumeroLikesPipe } from './numero-likes.pipe';




@NgModule({
  declarations: [DomSanatizerPipe, ImagenPipe, ImagenPortadaPipe, ImagenPerfilPipe, AvatarPipe, FechaPipe, NumeroLikesPipe],
  imports: [
    CommonModule
  ],
  exports: [
    DomSanatizerPipe,
    ImagenPipe,
    ImagenPerfilPipe,
    ImagenPortadaPipe,
    AvatarPipe,
    FechaPipe,
    NumeroLikesPipe
  ]
})
export class PipesModule { }
