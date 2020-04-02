import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  categories: any[] = [];

  constructor(private categoriaService: CategoriaService) {
    this.categoriaService.getCategorias().subscribe( resp => {
      // console.log(resp);
      this.categories = resp['categorias'];
      console.log(this.categories);
    });
  }

}
