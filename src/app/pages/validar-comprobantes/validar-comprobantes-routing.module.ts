import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidarComprobantesPage } from './validar-comprobantes.page';

const routes: Routes = [
  {
    path: '',
    component: ValidarComprobantesPage
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidarComprobantesPageRoutingModule {}
