import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { UsuarioService } from './usuario.service';
import { Comentario } from '../interfaces/comentario.interface';
import { ComentarioService } from './comentario.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(  private alertController: AlertController, 
                private toastController: ToastController, 
                private loadingController: LoadingController,
                private usuarioService: UsuarioService,
                private comentarioService: ComentarioService) { }

  async alertaInformativa( message: string) {
    const alert = await this.alertController.create({
      // header: '',
      //subHeader: 'Subtitle',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }


  

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }



  
}
