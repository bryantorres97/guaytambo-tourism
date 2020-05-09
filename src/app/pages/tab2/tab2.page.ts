import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, icon } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ThemeService } from 'src/app/services/theme.service';
import { SitioService } from 'src/app/services/sitio.service';
import { Sitio } from 'src/app/interfaces/sitio.interface';
import { from } from 'rxjs';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  mapaClaro = {
    tileLayer: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    credits: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
    maxzoom: 18
  }

  mapaOscuro = {
    tileLayer: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    credits: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxzoom: 19
  }

  map: Map;
  sitios: Sitio[];

  constructor(private geolocation: Geolocation, private theme: ThemeService, private sitioService: SitioService) { }

  ngOnInit(): void {
  }

  ionViewDidEnter() {
    this.cargarDatos();
  }

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


    // create custom icon
    this.crearMarcadoresSitios();

  }


  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }

  private crearIcono(marcador: string) {
    let iconUrl = this.verificarImagen(`assets/markers/${marcador}`, `assets/markers/default.svg`);
    return icon({
      iconUrl,
      iconSize: [38, 95], // size of the icon
    });
  }

  private cargarDatos() {
    this.sitioService.getSitios().subscribe(data => {
      this.sitios = data['sitios'];
    }, error => {
      console.error(error)
    }, () => this.leafletMap())
  }

  private crearMarcadoresSitios() {
    from(this.sitios).subscribe((sitio: Sitio) => {
      const marcador = this.crearIcono(sitio.categoria.marcador || 'default.svg');
      marker([sitio.latitud, sitio.longitud], { icon: marcador }).addTo(this.map).bindPopup('Ionic 4 <br> Leaflet.');
    })
  }

  private verificarImagen(urlOriginal: string, urlDefecto) {
    var req = new XMLHttpRequest();
    req.open('GET', urlOriginal, false);
    req.send();
    if (req.status === 404) {
      return urlDefecto;
    } else {
      return urlOriginal;
    }
  }




}
