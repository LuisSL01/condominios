import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAvisosPage } from './list-avisos.page';

const routes: Routes = [
  {
    path: '',
    component: ListAvisosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAvisosPageRoutingModule {}
