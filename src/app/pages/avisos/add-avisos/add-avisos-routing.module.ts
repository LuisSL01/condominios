import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAvisosPage } from './add-avisos.page';

const routes: Routes = [
  {
    path: '',
    component: AddAvisosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAvisosPageRoutingModule {}
