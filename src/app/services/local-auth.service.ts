import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario.interface';

const URL = environment.urlTurismoApi;

@Injectable({
  providedIn: 'root'
})
export class LocalAuthService {

  constructor(private http: HttpClient) { }

  registerUser(usuario: Usuario) {
    return this.http.post(`${URL}/usuario/create/`, usuario);
  }

}
