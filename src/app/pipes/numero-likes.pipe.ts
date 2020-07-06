import { Pipe, PipeTransform } from '@angular/core';
import { Calificacion } from '../interfaces/calificacion.interface';

@Pipe({
  name: 'numeroLikes',
  pure: false
})
export class NumeroLikesPipe implements PipeTransform {

  transform(calificaciones: Calificacion[]): number {
    let likes = 0;
    for (const calificacion of calificaciones) {
      if (calificacion.valor ){
        likes++;
      }
    }
    return likes;
  }

}
