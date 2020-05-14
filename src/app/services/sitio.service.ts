import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';


const URL = environment.urlTurismoApi + '/sitio';

@Injectable({
  providedIn: 'root'
})


export class SitioService {

  constructor(private http: HttpClient) { }

  public getSitios() {
    return this.http.get(`${URL}/`);
  }

  public getSitioById( id: string) {
    const params = new HttpParams().set('id', id);
    return this.http.get(`${URL}/sitio`, {params});
  }

  public getSitiosByCategoria( id: string) {
    const params = new HttpParams().set('id', id);
    return this.http.get(`${URL}/sitiosporcategoria`, {params});
  }
}
