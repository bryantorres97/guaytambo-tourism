import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { FireAuthService } from 'src/app/services/fire-auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  darkMode: boolean;
  usuario: Usuario = this.usuarioService.usuario;

  constructor(private themeService: ThemeService, private usuarioService: UsuarioService, private auth: FireAuthService, private navController: NavController) {    
    console.log( this.usuarioService.usuario)
    this.darkMode = themeService.darkMode;
    this.usuario = this.usuarioService.usuario;    
  }

  ionViewDidEnter(){
    this.usuario = this.usuarioService.usuario; 
  }

  changeTheme() {
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.themeService.changeTheme();
    
  }

  logout() {
    switch (this.usuario.tipo) {
      case 'facebook':
        this.auth.logoutFacebook().then(() => {
          this.usuarioService.setUsuario(null);
          this.navController.navigateRoot('login', {animated: true});
        });
        break;
      case 'google':
        this.auth.logoutGoogle().then(() => {
          this.usuarioService.setUsuario(null);
          this.navController.navigateRoot('login', {animated: true});
        });
        break;
      default:
        this.auth.logoutAnonimo().then(() => {
          this.usuarioService.setUsuario(null);
          this.navController.navigateRoot('login', {animated: true});
        });
    } 
  }

}
