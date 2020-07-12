import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {

  @Input() categoria: Categoria;

  img1: string = '/assets/img/cover.jpg'; 
  idioma = '';

  constructor( private router: Router, translation: TranslationService) {
    this.idioma = translation.language;
   }

  ngOnInit() {
    // console.log(this.categoria);
  }

  verSitios( id: string) {
    this.router.navigate(['main/tabs/sitios', id]);
  }

}
