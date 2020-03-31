import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanatizer'
})
export class DomSanatizerPipe implements PipeTransform {

  constructor(private domSanatizer: DomSanitizer) { }

  transform(img: string, ...args: any[]): any {

    let color1 = {
      r: 67,
      g: 67,
      b: 67
    };

    let color2 = {
      r: 0,
      g: 0,
      b: 0
    };


    if (args[0] !== undefined) {
      color1 = this.hexToRGB(args[0]);
    }

    if (args[1] !== undefined) {
      color1 = this.hexToRGB(args[1]);
    }

    const domImg = `--background: 
                    linear-gradient(
                                    rgba(${color1.r}, ${color1.g}, ${color1.b}, 0.5),
                                    rgba(${color2.r}, ${color2.g}, ${color2.b}, 0.5)),
                    url('${img}') center center / cover no-repeat`;
    // console.log(args[0]);

    return this.domSanatizer.bypassSecurityTrustStyle(domImg);
  }

  hexToRGB(colorHex: string) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }



}
