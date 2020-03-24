import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

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
}
