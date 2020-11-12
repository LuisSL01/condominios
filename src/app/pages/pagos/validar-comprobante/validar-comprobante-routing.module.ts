import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidarComprobantePage } from './validar-comprobante.page';

const routes: Routes = [
  {
    path: '',
    component: ValidarComprobantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidarComprobantePageRoutingModule {}
