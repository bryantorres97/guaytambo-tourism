import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { SitioService } from 'src/app/services/sitio.service';
import { Sitio } from 'src/app/interfaces/sitio.interface';
import { from } from 'rxjs';
import { DetalleSitioComponent } from 'src/app/components/detalle-sitio/detalle-sitio.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  mapboxToken = environment.mapboxToken;
  sitios: Sitio[];
  map: mapboxgl.Map;

  constructor(private geolocation: Geolocation, private modalController: ModalController,private sitioService: SitioService) { }

  ionViewDidEnter() { this.cargarDatos(); }

  private cargarDatos() {
    this.sitioService.getSitios().subscribe(data => {
      this.sitios = data['sitios'];
    }, error => {
      console.error(error)
    }, () => this.mapboxMap())
  }


  private mapboxMap() {
    mapboxgl.accessToken = this.mapboxToken;
    if( this.map === undefined) {
      this.map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-78.6269361, -1.2412194],        
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        container: 'map',
        antialias: true
      });

      this.map.on('load', () => {
        this.map.resize(); 
        let layers = this.map.getStyle().layers;
        let labelLayerId;
        for (let i = 0; i < layers.length; i++) {
          if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
          }
        }
        this.map.addLayer({
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        }, labelLayerId);
      });
  
      this.map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        })
      );
  
      this.crearMarcadores();
    }
  }

  private crearMarcadores() {
    from(this.sitios).subscribe((sitio: Sitio) => {
      let el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(assets/markers/${sitio.categoria.marcador}.svg)`;
      el.style.backgroundSize = 'cover';
      el.style.width = '35px';
      el.style.height = '35px';
      el.style.borderRadius = '50%';
      el.addEventListener('click',  async () => {
      console.log(sitio);
      const modal = await this.modalController.create({
        component: DetalleSitioComponent,
        componentProps: {sitio},
        cssClass: 'modal-fullscreen'
      });
  
      modal.present();
      });

      // add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([sitio.longitud, sitio.latitud])
        .addTo(this.map);
    });

  }

    /** Remove map when we have multiple map object */
    ionViewWillLeave() {
      // this.map.remove();
    }
}
