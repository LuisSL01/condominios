import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRespuestaPage } from './add-respuesta.page';

const routes: Routes = [
  {
    path: '',
    component: AddRespuestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRespuestaPageRoutingModule {}
