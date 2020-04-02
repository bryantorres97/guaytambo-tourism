import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanatizerPipe } from './dom-sanatizer.pipe';
import { ImagenPipe } from './imagen.pipe';



@NgModule({
  declarations: [DomSanatizerPipe, ImagenPipe],
  imports: [
    CommonModule
  ],
  exports: [
    DomSanatizerPipe,
    ImagenPipe
  ]
})
export class PipesModule { }
