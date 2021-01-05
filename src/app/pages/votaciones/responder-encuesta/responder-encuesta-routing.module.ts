import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponderEncuestaPage } from './responder-encuesta.page';

const routes: Routes = [
  {
    path: '',
    component: ResponderEncuestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponderEncuestaPageRoutingModule {}
