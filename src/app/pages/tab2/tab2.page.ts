import { Component } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  mapaClaro = {
    tileLayer: 'https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
    credits: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxzoom: 18
  }

  mapaOscuro = {
    tileLayer: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    credits: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxzoom: 19
  }

  map: Map;

  
  constructor(private geolocation: Geolocation, private theme: ThemeService) {}
  
  ionViewDidEnter() { this.leafletMap(); }
  
  leafletMap() {
    let tile = '';
    let attribution = '';
    let maxzoom = 0;

    if (this.theme.darkMode) {
      tile = this.mapaOscuro.tileLayer;
      attribution = this.mapaOscuro.credits;
      maxzoom = this.mapaOscuro.maxzoom;
    } else {
      tile = this.mapaClaro.tileLayer;
      attribution = this.mapaClaro.credits;
      maxzoom = this.mapaClaro.maxzoom;
    }
    
    this.map = new Map('mapId').setView([-1.2412194, -78.6269361], 16);
    let layer = tileLayer(tile, {
      maxZoom: maxzoom
	    // useCache: true
	    // crossOrigin: true
    }).addTo(this.map);

    marker([-1.2412194, -78.6269361]).addTo(this.map)
      .bindPopup('Ionic 4 <br> Leaflet.');

  }


  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }

  
}
