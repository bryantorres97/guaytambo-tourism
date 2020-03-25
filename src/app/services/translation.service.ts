import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translate: TranslateService) { }

  setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();

    if (language) {
      this.translate.use(language);
    }
  }

  setDefaultLanguage(language: string) {
    this.translate.setDefaultLang(language);
  }

  // TODO Almacenar idioma en el sistema y cargar desde la configuracion
}
