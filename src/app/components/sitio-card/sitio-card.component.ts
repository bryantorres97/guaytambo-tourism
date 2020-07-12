import { Component, OnInit, Input } from '@angular/core';
import { Sitio } from 'src/app/interfaces/sitio.interface';
import { ModalController } from '@ionic/angular';
import { DetalleSitioComponent } from '../detalle-sitio/detalle-sitio.component';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-sitio-card',
  templateUrl: './sitio-card.component.html',
  styleUrls: ['./sitio-card.component.scss'],
})
export class SitioCardComponent implements OnInit {

  @Input() sitio: Sitio = {};
  idioma = '';

  constructor(private modalController: ModalController, private translation: TranslationService) { 
    this.idioma = translation.language;
  }

  ngOnInit() { }

  async verDetalleSitio(sitio: Sitio) {
    const modal = await this.modalController.create({
      component: DetalleSitioComponent,
      componentProps: { sitio },
      cssClass: 'modal-fullscreen'
    });
    

    modal.present();

    const { data } = await modal.onDidDismiss();
    this.sitio = data['sitio'];
    // console.log(this.sitio);
  }

}
