import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sitios-lista',
  templateUrl: './sitios-lista.component.html',
  styleUrls: ['./sitios-lista.component.scss'],
})
export class SitiosListaComponent implements OnInit {

  @Input() sitios: any[] = [];
  
  constructor() { }

  ngOnInit() {}

}
