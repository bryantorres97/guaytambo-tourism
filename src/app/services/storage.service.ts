import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Usuario } from '../interfaces/usuario.interface';
import { analytics } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  setDarkMode(darkMode: boolean) {
    this.storage.set('darkMode', darkMode);
  };

  async getDarkMode() {
    return await this.storage.get('darkMode');
  }

  setUser( usuario: Usuario) {
    this.storage.set('user', JSON.stringify(usuario));
  }

  async getUser() {
    let usuario = '';
    await this.storage.get('user').then( user => usuario = user );
    return usuario;
  }
}
