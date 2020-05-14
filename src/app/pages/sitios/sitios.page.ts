import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sitio } from 'src/app/interfaces/sitio.interface';
import { SitioService } from 'src/app/services/sitio.service';

@Component({
  selector: 'app-sitios',
  templateUrl: './sitios.page.html',
  styleUrls: ['./sitios.page.scss'],
})
export class SitiosPage implements OnInit {

  visible = false;
  sitios: Sitio[];

  constructor(private activatedRoute: ActivatedRoute, private sitioService: SitioService) { }

  ngOnInit() {
    this.cargarSitios();
  }

  private cargarSitios() {
    this.activatedRoute.params.subscribe(params => {
      this.sitioService.getSitiosByCategoria(params['id']).subscribe(data => {
        this.sitios = data['sitios'];        
        console.log(data);
      });
    });
  }

}
