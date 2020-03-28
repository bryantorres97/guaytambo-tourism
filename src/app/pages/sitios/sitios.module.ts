import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SitiosPageRoutingModule } from './sitios-routing.module';

import { SitiosPage } from './sitios.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SitiosPageRoutingModule
  ],
  declarations: [SitiosPage]
})
export class SitiosPageModule {}
