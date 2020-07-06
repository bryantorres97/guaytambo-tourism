import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Comentario } from '../interfaces/comentario.interface';

const URL = environment.urlTurismoApi + '/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) { }

  crearComentario(comentario: Comentario) {    
    return this.http.post(`${URL}/crear/`, comentario);
  }

  borrarComentario(comentarioId: string, sitioId: string ) {    
    return this.http.put(`${URL}/deshabilitar/`, [comentarioId, sitioId]);
  }
}
