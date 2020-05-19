import { Component, OnInit, Input } from '@angular/core';
import { Sitio } from 'src/app/interfaces/sitio.interface';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import mapboxgl from 'mapbox-gl';
import { SitioService } from 'src/app/services/sitio.service';
import { ThemeService } from 'src/app/services/theme.service';
import { environment } from 'src/environments/environment';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-detalle-sitio',
  templateUrl: './detalle-sitio.component.html',
  styleUrls: ['./detalle-sitio.component.scss'],
})
export class DetalleSitioComponent implements OnInit {

  @Input() sitio: Sitio;
  map: mapboxgl.Map;
  mapboxToken = environment.mapboxToken;

  constructor(private modalController: ModalController,
    private geolocation: Geolocation,
    private theme: ThemeService,
    private sitioService: SitioService) { }

  ngOnInit() {
    console.log(this.sitio);
    this.mapboxMap();
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

  async verImagen(imagen) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: {imagen},
      cssClass: 'modal-fullscreen'
    });

    modal.present();
  }


}
