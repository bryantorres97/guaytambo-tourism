import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  darkMode = this.prefersDark.matches;
  
  constructor(private storageService: StorageService) { 
    
  }

  changeTheme() {    
    this.darkMode = !this.darkMode;
    this.storageService.setDarkMode(this.darkMode);
    document.body.classList.toggle( 'dark' );
    // let oscuro = await this.storageService.getDarkMode();
    // console.log(oscuro);
  }

  checkDarkTheme() {    
    if ( this.darkMode ) {
      document.body.classList.toggle( 'dark' );
    }
  }

  async loadTheme() {
    let oscuro = await this.storageService.getDarkMode();
    // console.log(oscuro);
    if (oscuro == null) {
      this.storageService.setDarkMode(this.darkMode);    
    } else {
      // console.log('existe ', oscuro);
      this.darkMode = oscuro;      
    }
    this.checkDarkTheme();
  }
}
