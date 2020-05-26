import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanatizerPipe } from './dom-sanatizer.pipe';
import { ImagenPipe } from './imagen.pipe';
import { ImagenPortadaPipe } from './imagen-portada.pipe';
import { ImagenPerfilPipe } from './imagen-perfil.pipe';
import { AvatarPipe } from './avatar.pipe';




@NgModule({
  declarations: [DomSanatizerPipe, ImagenPipe, ImagenPortadaPipe, ImagenPerfilPipe, AvatarPipe],
  imports: [
    CommonModule
  ],
  exports: [
    DomSanatizerPipe,
    ImagenPipe,
    ImagenPerfilPipe,
    ImagenPortadaPipe,
    AvatarPipe
  ]
})
export class PipesModule { }
