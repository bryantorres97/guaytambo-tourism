import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha: any, idioma: string = 'es'): string {
    moment.locale(idioma);
    fecha = moment(fecha).format('LLL');     
    return fecha;
  }

}
