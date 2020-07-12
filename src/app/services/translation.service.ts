import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  language = '';
  constructor(private translate: TranslateService) { }

  setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();
    this.language = language;
    if (language) {
      this.translate.use(language);
    }
  }

  setDefaultLanguage(language: string) {
    this.language = language;
    this.translate.setDefaultLang(language);
  }

  // TODO Almacenar idioma en el sistema y cargar desde la configuracion
}
