import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.urlTurismoApi;

@Injectable({
  providedIn: 'root'
})



export class CategoriaService {

  constructor(private http: HttpClient) { }

  getCategorias(){
    return this.http.get(`${ URL }/categoria/`);
  }
}
