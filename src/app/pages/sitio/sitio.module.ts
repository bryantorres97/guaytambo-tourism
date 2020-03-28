import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SitioPageRoutingModule } from './sitio-routing.module';

import { SitioPage } from './sitio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SitioPageRoutingModule
  ],
  declarations: [SitioPage]
})
export class SitioPageModule {}
