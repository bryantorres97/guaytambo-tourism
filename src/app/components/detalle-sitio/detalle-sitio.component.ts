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
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Calificacion } from 'src/app/interfaces/calificacion.interface';
import { SitioService } from 'src/app/services/sitio.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { TranslationService } from 'src/app/services/translation.service';

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
  iconoLike = 'thumbs-up-outline';
  iconoDislike = 'thumbs-down-outline';
  usuario: Usuario;
  comentarios: Comentario[] = [];
  idioma = '';

  constructor(private modalController: ModalController,
    private alertController: AlertController,
    private geolocation: Geolocation,
    private iab: InAppBrowser,
    private uiService: UiService,
    private usuarioService: UsuarioService,
    private comentarioService: ComentarioService,
    private sitioService: SitioService,
    private callNumber: CallNumber,
    private translation: TranslationService) {
      this.idioma = translation.language;
  }

  async ngOnInit() {    
    this.sitioService.getSitio(this.sitio._id).subscribe(resp => {
      if (resp['ok']) {        
        const sitioCompleto: Sitio = resp['sitio'];
        this.sitio.calificaciones = sitioCompleto.calificaciones;
        this.sitio.comentarios = sitioCompleto.comentarios;
        this.comentarios = sitioCompleto.comentarios;
        for (const calificacion of sitioCompleto.calificaciones) {
          if (calificacion.usuario._id === this.usuarioService.usuario._id) {
            if (calificacion.valor) {
              this.iconoLike = 'thumbs-up';
            }else {
              this.iconoDislike = 'thumbs-down';              
            }
            break;
          }
        }
      }
    })
    this.mapboxMap();
    this.usuario = this.usuarioService.usuario;
    const existe = await this.usuarioService.existeSitio(this.sitio._id);
    if (existe) {
      this.iconoFavorito = 'heart';
    }
  }

  regresar() {
    this.modalController.dismiss({
      sitio: this.sitio
    }
    );
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
      componentProps: { imagen, sitioId },
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
    if (guardada) {
      mensaje = 'Se ha agregado a tu lista de favoritos'
      this.iconoFavorito = 'heart';
      this.usuarioService.addFavorito(this.usuarioService.usuario._id, this.sitio._id).subscribe(resp => {
        console.log(resp);
      });

    } else {
      mensaje = 'Se ha eliminado de tu lista de favoritos';
      this.iconoFavorito = 'heart-outline';
      this.usuarioService.removeFavorito(this.usuarioService.usuario._id, this.sitio._id).subscribe(resp => {
        console.log(resp);
      });
    }

    this.uiService.presentToast(mensaje);
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

    this.comentarioService.crearComentario(comentario).subscribe(resp => {
      //console.log(resp);
      //this.sitio = resp['sitio'];
      this.comentarios = resp['sitio'].comentarios;
      this.sitio.comentarios = this.comentarios;
      setTimeout(() => this.content.scrollToBottom(300), 500);
    });
  }

  abrirURL(url: string) {
    // const browser = this.iab.create(url);
    // console.log(url)
    this.iab.create(url, '_blank');
  }

  abrirWhatsapp(numero: string) {
    this.iab.create(`https://api.whatsapp.com/send?phone=${numero}`, '_system');
  }

  agregarCalificacion(like: boolean) {
    const calificacion: Calificacion = {
      sitioId: this.sitio._id,
      valor: like,
      usuario: this.usuarioService.usuario,
      usuarioId: this.usuarioService.usuario._id,
      estaActivo: true
    }

    this.sitioService.agregarCalificacion(calificacion).subscribe(resp => {
      if( like ) {
        this.iconoLike = 'thumbs-up';
        this.iconoDislike = 'thumbs-down-outline';
      } else {
        this.iconoLike = 'thumbs-up-outline';
        this.iconoDislike = 'thumbs-down';
      }
    })
  }

  refrescarComentarios(comentarios) {
    this.comentarios = comentarios;
    this.sitio.comentarios = this.comentarios;
  }

  abrirTelefono(numero: string){
    this.callNumber.callNumber(numero, false)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

}
