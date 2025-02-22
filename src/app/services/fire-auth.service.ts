import { Injectable } from '@angular/core';
import { Platform } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { HttpClient } from "@angular/common/http";
// import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
// import { Usuario } from "../interfaces/user.interface";
import { auth } from 'firebase/app';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

import { Usuario } from '../interfaces/usuario.interface';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  public usuario: Usuario = null;

  constructor(
		private AFauth: AngularFireAuth,
    private platform: Platform,
    private google: GooglePlus,
    private fb: Facebook,
    private http: HttpClient) {

      this.AFauth.authState.subscribe( user => {
        if (! user ) {
          return;
        }
        if(user.displayName) {
          this.usuario.nickname = user.displayName;
        } else {
          this.usuario.nickname = '';
        }
        this.usuario.avatar = user.photoURL;
        this.usuario.email = user.email;
      })
     }
    
    async verificarSesion() {
      this.platform.ready().then(() => {
        this.AFauth.auth.onAuthStateChanged(user => {
          // console.log(user);
          if (user) {
            console.log(user);
            console.log("Sesion abierta");
          }
        });
      });
    }
  
    async loginMail(username: string, password: string) {
      try {
        const res = await this.AFauth.auth.signInWithEmailAndPassword(username, password);
        // console.log(res);
        return res;
      } catch (err) {
        console.dir(err);
        return err;
      }
    }

    async loginWithGoogle() {
      return this.google.login({}).then( res => {
        const user_data_google = res;  
        return this.AFauth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(null, user_data_google.accessToken))
      })
    }

    async loginWithFacebook() {
      return this.fb.login(['email', 'public_profile']).then( (response: FacebookLoginResponse) => {
        const credential_fb = auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
        return this.AFauth.auth.signInWithCredential(credential_fb);
      })
    }

    async loginAnonimo() {
      return this.AFauth.auth.signInAnonymously();
    }

    async logoutGoogle(){
      return this.AFauth.auth.signOut().then(() => {
        this.google.disconnect();
      });
    }


    async logoutFacebook() {
      return this.AFauth.auth.signOut().then(() => {
        this.fb.logout();
      });
    }


    async logoutAnonimo() {
      return this.AFauth.auth.signOut();
    }


    async registerUser(usuario: Usuario) {
      try {
        const res = await this.AFauth.auth.createUserWithEmailAndPassword(usuario.email, usuario.password);        
        return res;
      } catch (err) {        
        return err;
      }
    }
}
