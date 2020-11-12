import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarAdeudoPage } from './registrar-adeudo.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarAdeudoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarAdeudoPageRoutingModule {}
