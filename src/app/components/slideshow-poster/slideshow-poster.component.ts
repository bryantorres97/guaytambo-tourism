import { Component, OnInit, Input } from '@angular/core';
import { Sitio } from 'src/app/interfaces/sitio.interface';
import { ModalController } from '@ionic/angular';
import { DetalleSitioComponent } from '../detalle-sitio/detalle-sitio.component';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() favoritos: Sitio[] = [];
  slideOpts = {
    slidesPerView: 2.7,
    freeMode: true
  };

  constructor(private modalController: ModalController, private usuarioService: UsuarioService) { }

  ngOnInit() {}

  async verDetalleSitio(sitio: Sitio) {
    const modal = await this.modalController.create({
      component: DetalleSitioComponent,
      componentProps: { sitio },
      cssClass: 'modal-fullscreen'
    });
    

    modal.present();

    const { data } = await modal.onDidDismiss();
    this.favoritos = this.usuarioService.usuario.favoritos;
    sitio = data['sitio'];
    // console.log(this.sitio);
  }

}
