import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent implements OnInit {

  @Input() imagen: any;
  @ViewChild('slider', {static: true}) slider: ElementRef;

  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  };

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.imagen);
  }

  zoom(zoomIn: boolean) {
    let zoom = this.slider.nativeElement.zoom;
    if(zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }

  regresar() {
    this.modalController.dismiss();
  }

}
