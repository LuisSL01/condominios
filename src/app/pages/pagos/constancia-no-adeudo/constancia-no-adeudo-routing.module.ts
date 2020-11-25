import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConstanciaNoAdeudoPage } from './constancia-no-adeudo.page';

const routes: Routes = [
  {
    path: '',
    component: ConstanciaNoAdeudoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstanciaNoAdeudoPageRoutingModule {}
