import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {

  @Input() categoria: any = {};

  img1: string = '/assets/img/cover.jpg'; 

  constructor() { }

  ngOnInit() {}

}
