import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanatizer'
})
export class DomSanatizerPipe implements PipeTransform {

  constructor( private domSanatizer: DomSanitizer) {}
  
  transform(img: string, ...args: any[]): any {
    const domImg = `--background: linear-gradient(rgba(67, 67, 67, 0.5), rgba(0, 0, 0, 0.5)), url('${img}') center center / cover no-repeat`;
    console.log(args[0]);
    // console.log(args[1]);
    return this.domSanatizer.bypassSecurityTrustStyle( domImg );
  }

}
