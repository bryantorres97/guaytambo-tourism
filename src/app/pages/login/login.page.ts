import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, NavController } from '@ionic/angular';
import { FireAuthService } from 'src/app/services/fire-auth.service';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { LocalAuthService } from 'src/app/services/local-auth.service';
import { UiService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', { static: false }) slides: IonSlides;

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

  constructor(  private auth: FireAuthService, 
                private lauth: LocalAuthService, 
                private uiService: UiService,
                private usuarioService: UsuarioService, 
                private loadingController: LoadingController,
                private navController: NavController) { }

  async ngOnInit() {
    this.auth.verificarSesion();
    const user = await this.usuarioService.getUsuarioLocal();
    console.log(user);
  }

  ionViewWillEnter() {
    this.slides.lockSwipes(true);
  }

  async loginMail(fLogin: NgForm) {    
    if (fLogin.invalid) {
      this.comprobarCamposRequeridosLogin(fLogin);
    } else {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        translucent: true
      });
      loading.present();
      this.auth.loginMail(this.loginUser.email, this.loginUser.password).then((resp) => {
        // console.log(resp);
        if(resp['code'] === 'auth/wrong-password' || resp['code'] === 'auth/user-not-found') {
          this.uiService.alertaInformativa('Usuario y/o contraseña incorrectos');
          loading.dismiss();
          return;
        }

        if(resp['operationType'] === 'signIn') {
          // console.log(resp['user'].email);
          this.usuarioService.getUsuarioByEmail(resp['user'].email).subscribe((resp) => {
            console.log(resp);
            this.usuarioService.setUsuario(resp['user']);
            this.navController.navigateRoot('main/tabs/tab1', {animated: true});           
          });
        }
      });
      loading.dismiss();
    }
  }

  async loginFacebook() {
    console.log(await this.usuarioService.getUsuarioLocal());
  }

  loginGoogle() {

  }

  async registroMail(fRegistro: NgForm) {
    if (fRegistro.invalid) {
      this.comprobarCamposRequeridosRegistro(fRegistro);
    } else {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        translucent: true
      });
      loading.present();
      this.usuario = {
        tipo: 'email',
        email: this.registerUser.email,
        avatar: this.registerUser.avatar || 'av-1.png',
        nickname: this.registerUser.nick,
        password: this.registerUser.password
      }
      this.auth.registerUser(this.usuario).then(async (resp) => {
        console.log(resp);        
        if(resp['code'] === 'auth/email-already-in-use') {
          this.uiService.alertaInformativa(resp['message']);
        } else if(resp['operationType'] === 'signIn') {
          this.lauth.registerUser(this.usuario).subscribe(async (resp)=>{
            if(resp['ok']){
              this.usuarioService.usuario = resp['user'];
              this.usuarioService.setUsuario(this.usuarioService.usuario);
              this.navController.navigateRoot('main/tabs/tab1', {animated: true});
            }
          }, (err) => {
            console.log(err);
            this.uiService.alertaInformativa('No se ha podido registrar');
          });
        }

        loading.dismiss();
      }

      );
    }
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



  comprobarCamposRequeridosLogin(formulario: NgForm) {
    const emailControl = formulario.form.controls['email'];
    const passwordControl = formulario.form.controls['password'];
    if (emailControl.value === '' || passwordControl.value === '') {
      this.uiService.presentToast('Ingrese su email y contraseña');
      return;
    }

    if (emailControl.invalid) {
      this.uiService.presentToast('El email no es válido');
      return;
    }
  }

  comprobarCamposRequeridosRegistro(formulario: NgForm) {
    const usuarioControl = formulario.form.controls['usuario'];
    const emailControl = formulario.form.controls['email'];
    const passwordControl = formulario.form.controls['password'];
    const verifyPasswordControl = formulario.form.controls['verifyPassword'];
    let mensajeError = '';

    if (emailControl.value === ''
      || usuarioControl.value === ''
      || passwordControl.value === ''
      || verifyPasswordControl.value === '') {
      this.uiService.presentToast('Llene todos los campos');
      return;
    }

    if (usuarioControl.invalid) {
      mensajeError = mensajeError + 'El usuario debe tener entre 5 y 40 letras\n';
    }

    if (emailControl.invalid) {
      mensajeError = mensajeError + 'El email no es valido\n';
    }

    if (passwordControl.invalid) {
      mensajeError = mensajeError + 'La contraseña debe tener entre 6 y 20 caracteres\n'
    }

    if (passwordControl.valid && verifyPasswordControl.valid && passwordControl.value !== verifyPasswordControl.value) {
      mensajeError = mensajeError + 'Las contraseñas no coinciden';
    }

    if (mensajeError !== '') {
      this.uiService.presentToast(mensajeError);
    }
    return;
  }


}




