import { Component, OnInit, Input } from '@angular/core';
import { Sitio } from 'src/app/interfaces/sitio.interface';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import mapboxgl from 'mapbox-gl';
import { SitioService } from 'src/app/services/sitio.service';
import { ThemeService } from 'src/app/services/theme.service';
import { environment } from 'src/environments/environment';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { UiService } from 'src/app/services/ui-service.service';

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
    private uiService: UiService,    
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

  async verImagen(imagen, sitioId) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: {imagen, sitioId},
      cssClass: 'modal-fullscreen'
    });

    modal.present();
  }

  comentar() {
    this.uiService.mostrarFormaComentario(this.sitio._id);
  }


}
