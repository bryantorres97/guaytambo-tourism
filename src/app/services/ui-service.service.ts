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


  async mostrarFormaComentario(sitioId: string) {
    const alert = await this.alertController.create({
      
      // cssClass: 'alerta-comentario',
      header: 'Escribe tu comentario',
      inputs: [
        {
          name: 'comentario',
          type: 'textarea',
          placeholder: 'Escribe tu comentario',
                   
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Publicar',
          handler: (alertData) => {
            console.log('Confirm Ok');
            console.log(alertData['comentario']);
            this.publicarComentario(alertData['comentario'], sitioId);
          }
        }
      ]
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



  publicarComentario(texto: string, sitioId: string) {
    const comentario: Comentario = {
      sitioId,
      texto,
      usuario: this.usuarioService.usuario
    }

    this.comentarioService.crearComentario(comentario).subscribe( resp =>{
      console.log(resp);
    });
  }
}
