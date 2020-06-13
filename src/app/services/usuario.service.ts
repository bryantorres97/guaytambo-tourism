import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario.interface';
import { StorageService } from './storage.service';
import { NavController } from '@ionic/angular';
import { Sitio } from '../interfaces/sitio.interface';


const URL = environment.urlTurismoApi + '/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  favoritos: Sitio[];

  constructor(private http: HttpClient,
    private storageService: StorageService,
    private navController: NavController) { }

  public getUsuarioByEmail(email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.get(`${URL}/user`, { params });
  }

  public setUsuario(usuario: Usuario) {
    this.usuario = usuario;
    this.storageService.setUser(usuario);
  }

  public async getUsuarioLocal() {
    this.usuario = JSON.parse(await this.storageService.getUser());
    return this.usuario;
  }

  public addFavoritoLocal(sitio: Sitio) {
    this.usuario.favoritos.unshift(sitio);
    this.storageService.setUser(this.usuario);
  }




  validaUsuario(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.getUsuarioLocal().then(user => {
        if (user) {
          console.log(user);
          resolve(true);
        } else {
          this.navController.navigateRoot('/login');
          resolve(false);
        }
      })
    });
  }


  public addFavorito(id: string, sitioId: string) {
    return this.http.put(`${URL}/nuevofavorito`, [id, sitioId]);
  }

  async cargarFavoritos() {
    this.getUsuarioLocal();
    const sitiosFavoritos = this.usuario.favoritos;
    this.favoritos = sitiosFavoritos || [];
    return this.favoritos;
    // const peliculas = await this.storage.get('peliculas');
    // this.peliculas = peliculas || [];
    // return this.peliculas;
  }

  async existeSitio(id: string) {
    await this.cargarFavoritos();
    const existe = this.favoritos.find( sitio => sitio._id === id);
    return existe ? true : false;
  }

  // async existePelicula(id) {
  //   id = Number(id);
  //   await this.cargarFavoritos();
  //   const existe = this.peliculas.find(peli => peli.id === id);
  //   return (existe) ? true : false;
  // }
}
