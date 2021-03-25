import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracionEmpPage } from './configuracion-emp.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionEmpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionEmpPageRoutingModule {}
