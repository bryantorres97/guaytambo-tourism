import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { FireAuthService } from 'src/app/services/fire-auth.service';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { LocalAuthService } from 'src/app/services/local-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  @ViewChild('slidePrincipal', {static: false}) slides: IonSlides;

  usuario: Usuario;

  ventanaLogin = true;

  loginUser = {
    email: '',
    password: ''
  };
  
  registerUser = {
    avatar: '',
    nick: '',
    email: '',
    password: '',
    verifyPassword: ''
  };

  constructor(private auth: FireAuthService, private lauth: LocalAuthService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.slides.lockSwipes(true);
   }
 
   loginMail(fLogin: NgForm) {
     console.log(fLogin);
     console.log(fLogin.valid);
     // console.log(this.loginUser);
     // this.auth.loginMail(this.loginUser.email, this.loginUser.password);
   }
 
   loginFacebook() {
 
   }
 
   loginGoogle() {
 
   }
 
   registroMail(fRegistro: NgForm) {
     console.log(fRegistro.valid);
     // this.auth.registerUser(this.registerUser.email, this.registerUser.password);
     if ( this.registerUser.avatar.length === 0) {
      this.registerUser.avatar = 'av-1.png';
     }
      this.usuario = {
        tipo: 'email',
        email: this.registerUser.email,
        avatar: this.registerUser.avatar,
        nickname: this.registerUser.nick
      }
      
      this.lauth.registerUser(this.usuario).subscribe( console.log );
   }
 

 
   mostrarRegistro() {
     this.slides.lockSwipes(false);
     this.slides.slideTo(1);
     this.slides.lockSwipes(true);
   }
 
   mostrarLogin() {
     this.slides.lockSwipes(false);
     this.slides.slideTo(0);
     this.slides.lockSwipes(true);
   }

}
