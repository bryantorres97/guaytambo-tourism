import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { Foto } from 'src/app/interfaces/foto.interface';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent implements OnInit {

  @Input() imagen: Foto;
  @Input() sitioId: string;

  @ViewChild('slider', {static: false}) slides: IonSlides;

  sliderOpts = {
    zoom: {
      maxRatio: 3
    },
    passiveListeners: false
  };

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.imagen);
  }

  ionViewWillEnter() {
    this.slides.lockSwipes(true);
   }

  // zoom(zoomIn: boolean) {
  //   let zoom = this.slider.nativeElement.zoom;
  //   if(zoomIn) {
  //     zoom.in();
  //   } else {
  //     zoom.out();
  //   }
  // }

  regresar() {
    this.modalController.dismiss();
  }

}
