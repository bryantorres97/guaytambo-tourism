import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sitio } from 'src/app/interfaces/sitio.interface';

@Component({
  selector: 'app-sitios-lista',
  templateUrl: './sitios-lista.component.html',
  styleUrls: ['./sitios-lista.component.scss'],
})
export class SitiosListaComponent implements OnInit {

  @Input() sitios: Sitio[] = [];
  
  constructor( private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    console.log( this.activatedRoute.snapshot.params.id );
  }

}
