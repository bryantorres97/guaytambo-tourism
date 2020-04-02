import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.urlTurismoApi;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, elemento: string, carpeta: string, elementoId: string): string {
    return `${ URL }/${elemento}/${carpeta}/${elementoId}/${img}`;
  }

}
