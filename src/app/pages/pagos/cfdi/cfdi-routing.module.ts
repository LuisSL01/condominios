import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CfdiPage } from './cfdi.page';

const routes: Routes = [
  {
    path: '',
    component: CfdiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CfdiPageRoutingModule {}
