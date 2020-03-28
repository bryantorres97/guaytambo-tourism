import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sitio-card',
  templateUrl: './sitio-card.component.html',
  styleUrls: ['./sitio-card.component.scss'],
})
export class SitioCardComponent implements OnInit {

  @Input() sitio: any = {};

  constructor() { }

  ngOnInit() {}

}
