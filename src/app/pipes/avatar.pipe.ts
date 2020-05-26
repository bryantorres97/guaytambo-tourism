import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  constructor(private domSanatizer: DomSanitizer) { }
  transform(avatar: string): any {
    let domImg = '';
    if(avatar !== null ) {
      domImg = `background-image: url('/assets/avatars/${avatar}');`
    }else {
      domImg = `background-image: url('/assets/avatars/av-8.png');`
    }
    return this.domSanatizer.bypassSecurityTrustStyle(domImg);
  }

}
