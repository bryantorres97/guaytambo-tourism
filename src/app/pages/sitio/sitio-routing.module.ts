import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SitioPage } from './sitio.page';

const routes: Routes = [
  {
    path: '',
    component: SitioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitioPageRoutingModule {}
