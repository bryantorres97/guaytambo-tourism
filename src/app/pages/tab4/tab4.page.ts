import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  darkMode: boolean;
  usuario: Usuario;

  constructor(private themeService: ThemeService, private usuarioService: UsuarioService) {    
    this.darkMode = themeService.darkMode;
    this.usuario = this.usuarioService.usuario;    
  }

  // async ionViewDidEnter() {
  //   console.log(await this.usuarioService.usuario);
    
  // }


  changeTheme() {
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.themeService.changeTheme();
    
  }

}
