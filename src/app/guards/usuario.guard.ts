import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad{

  constructor( private usuarioService: UsuarioService){}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.usuarioService.validaUsuario();
  }

  // canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  //   return false;
  // }
}
