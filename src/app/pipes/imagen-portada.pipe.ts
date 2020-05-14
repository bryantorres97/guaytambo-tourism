import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imagenPortada'
})
export class ImagenPortadaPipe implements PipeTransform {

  constructor(private domSanatizer: DomSanitizer) { }

  transform(img: string, ...args: any[]): any {

    const domImg = `background-image: url(${img});
    background-repeat: no-repeat;
    background-size: cover;`;
    return this.domSanatizer.bypassSecurityTrustStyle(domImg);
  }

}
