import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Sitio } from 'src/app/interfaces/sitio.interface';
import { ModalController, AlertController, IonContent } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { UiService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Comentario } from 'src/app/interfaces/comentario.interface';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-detalle-sitio',
  templateUrl: './detalle-sitio.component.html',
  styleUrls: ['./detalle-sitio.component.scss'],
})
export class DetalleSitioComponent implements OnInit {

  @Input() sitio: Sitio;
  @ViewChild('content', { static: false }) content: IonContent;
  map: mapboxgl.Map;
  mapboxToken = environment.mapboxToken;
  iconoFavorito = 'heart-outline';

  constructor(private modalController: ModalController,
    private alertController: AlertController,
    private geolocation: Geolocation,
    private uiService: UiService,        
    private usuarioService: UsuarioService,
    private comentarioService: ComentarioService) { }

  async ngOnInit() {
    //console.log(this.sitio);
    this.mapboxMap();
    const existe = await this.usuarioService.existeSitio(this.sitio._id);
    if ( existe) {
      this.iconoFavorito = 'heart';
    }
  }

  regresar() {
    this.modalController.dismiss();
  }

  onClick() {
    console.log('click')
  }

  private mapboxMap() {
    mapboxgl.accessToken = this.mapboxToken;
    this.map = new mapboxgl.Map({
      container: 'mapa', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [this.sitio.longitud, this.sitio.latitud], // starting position [lng, lat]
      zoom: 16 // starting zoom
    });

    this.map.on('load', () => {
      this.map.resize();
    });

    let marker = new mapboxgl.Marker()
      .setLngLat([this.sitio.longitud, this.sitio.latitud])
      .addTo(this.map);
  }

  async verImagen(imagen, sitioId) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: {imagen, sitioId},
      cssClass: 'modal-fullscreen'
    });

    modal.present();
  }

  comentar() {
    this.mostrarFormaComentario(this.sitio._id);
  }

  favorito() {
    const guardada = this.usuarioService.guardarSitioFavorito(this.sitio);
    let mensaje = '';
    if( guardada ) {
      mensaje = 'Se ha agregado a tu lista de favoritos'
      this.iconoFavorito = 'heart';
      this.usuarioService.addFavorito(this.usuarioService.usuario._id, this.sitio._id).subscribe( resp => {
        console.log(resp);        
      });

    } else {
      mensaje = 'Se ha eliminado de tu lista de favoritos';
      this.iconoFavorito = 'heart-outline';
      this.usuarioService.removeFavorito(this.usuarioService.usuario._id, this.sitio._id).subscribe( resp => {
        console.log(resp);        
      });
    }

    this.uiService.presentToast(mensaje);
    // // console.log('add');
    // //console.log(this.usuarioService.usuario);
    // const userId = this.usuarioService.usuario._id;
    
    // this.usuarioService.addFavorito(userId, this.sitio._id).subscribe( resp => {
    //   if( resp['ok']) {
    //     this.usuarioService.addFavoritoLocal(this.sitio);
    //   }
    //   console.log(resp)} );
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

  publicarComentario(texto: string, sitioId: string) {
    const comentario: Comentario = {
      sitioId,
      texto,
      usuario: this.usuarioService.usuario
    }

    this.comentarioService.crearComentario(comentario).subscribe( resp =>{
      console.log(resp);
      this.sitio = resp['sitio'];
      
      setTimeout(() =>this.content.scrollToBottom(300), 500 );
    });
  }


}
