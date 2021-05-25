import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdeudoPlantillaPage } from './adeudo-plantilla.page';

const routes: Routes = [
  {
    path: '',
    component: AdeudoPlantillaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdeudoPlantillaPageRoutingModule {}
