import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosInteresPage } from './datos-interes.page';

const routes: Routes = [
  {
    path: '',
    component: DatosInteresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosInteresPageRoutingModule {}
