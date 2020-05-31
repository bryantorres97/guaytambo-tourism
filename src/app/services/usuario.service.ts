import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario.interface';
import { StorageService } from './storage.service';
import { FireAuthService } from './fire-auth.service';
import { LocalAuthService } from './local-auth.service';
import { NavController } from '@ionic/angular';


const URL = environment.urlTurismoApi + '/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;

  constructor(  private http: HttpClient, 
                private storageService: StorageService, 
                private auth:FireAuthService, 
                private lauth: LocalAuthService,
                private navController: NavController) { }

  public getUsuarioByEmail( email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.get(`${URL}/user`, {params});
  }

  public setUsuario(usuario: Usuario){
    this.usuario = usuario;
    this.storageService.setUser(usuario);
  }

  public async getUsuarioLocal() {
    this.usuario = JSON.parse(await this.storageService.getUser());
    return this.usuario;
  }

  validaUsuario(): Promise<boolean> {
    return new Promise<boolean>( resolve => {
      this.getUsuarioLocal().then( user => {
        if(user) {
          console.log(user);
          resolve(true);
        } else {
          this.navController.navigateRoot('/login');
          resolve(false);
        }
      })
    });
  }
}
