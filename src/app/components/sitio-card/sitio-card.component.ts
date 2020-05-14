import { Component, OnInit, Input } from '@angular/core';
import { Sitio } from 'src/app/interfaces/sitio.interface';
import { ModalController } from '@ionic/angular';
import { DetalleSitioComponent } from '../detalle-sitio/detalle-sitio.component';

@Component({
  selector: 'app-sitio-card',
  templateUrl: './sitio-card.component.html',
  styleUrls: ['./sitio-card.component.scss'],
})
export class SitioCardComponent implements OnInit {

  @Input() sitio: Sitio = {};

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async verDetalleSitio(sitio: Sitio) {
    const modal = await this.modalController.create({
      component: DetalleSitioComponent,
      componentProps: {sitio}
    });

    modal.present();
  }

}
