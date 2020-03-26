import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {

  @Input() categorias: any[] = [];

  constructor() { }

  ngOnInit() {}

}
