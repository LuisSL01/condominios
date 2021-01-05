import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionesPreguntaPage } from './opciones-pregunta.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionesPreguntaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcionesPreguntaPageRoutingModule {}
