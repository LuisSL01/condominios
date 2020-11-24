import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BitacoraVisitasPage } from './bitacora-visitas.page';

const routes: Routes = [
  {
    path: '',
    component: BitacoraVisitasPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
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
export class BitacoraVisitasPageRoutingModule {}
