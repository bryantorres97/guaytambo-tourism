import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {

  @Input() categoria: Categoria;

  img1: string = '/assets/img/cover.jpg'; 

  constructor( private router: Router) { }

  ngOnInit() {
    // console.log(this.categoria);
  }

  verSitios( id: string) {
    this.router.navigate(['/tabs/sitios', id]);
  }

}
