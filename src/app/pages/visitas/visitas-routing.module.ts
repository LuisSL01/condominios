import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitasPage } from './visitas.page';

const routes: Routes = [
  {
    path: '',
    component: VisitasPage
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitasPageRoutingModule {}
