import { Injectable } from '@angular/core';
import { Platform } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { HttpClient } from "@angular/common/http";
// import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
// import { Usuario } from "../interfaces/user.interface";
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  constructor(
		private AFauth: AngularFireAuth,
		private platform: Platform,
    private http: HttpClient) { }
    
    verificarSesion() {
      this.platform.ready().then(() => {
        this.AFauth.auth.onAuthStateChanged(user => {
          if (user) {
            console.log("Sesion abierta");
          }
        });
      });
    }
  
    async loginMail(username: string, password: string) {
      try {
        const res = await this.AFauth.auth.signInWithEmailAndPassword(username, password);
        console.log(res);
      } catch (err) {
        console.dir(err);
      }
    }
  
    // loginFacebook() {
    //   this.fb
    //     .login(["public_profile", "email"])
    //     .then((res: FacebookLoginResponse) => {
    //       console.log("Logged into Facebook!", res);
    //       this.loginFacebookSuccess(res);
  
    //     })
    //     .catch(e => console.log("Error logging into Facebook desde login Inicial", e));
    // }
  
    // loginFacebookSuccess(res: FacebookLoginResponse) {
    //   let credential = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    //   this.AFauth.auth.signInWithCredential(credential).then(info => {
    //     alert(info);
    //     console.log(info);
    //   }).catch(
    //     e => console.log("Error logging into Facebook Firebase", e)
    //   );
    // }
  
    async registerUser(username: string, password: string) {
      try {
        const res = await this.AFauth.auth.createUserWithEmailAndPassword(username, password);
        console.log(res);
      } catch (err) {
        console.dir(err);
      }
    }
}
