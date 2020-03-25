import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  darkMode: boolean;

  constructor(private themeService: ThemeService) {    
    this.darkMode = themeService.darkMode;
  }


  changeTheme() {
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.themeService.changeTheme();
    
  }

}
