import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisosPage } from './avisos.page';

const routes: Routes = [
  {
    path: '',
    component: AvisosPage
  },
  {
    path: 'add-avisos',
    loadChildren: () => import('./add-avisos/add-avisos.module').then( m => m.AddAvisosPageModule)
  },
  {
    path: 'list-avisos',
    loadChildren: () => import('./list-avisos/list-avisos.module').then( m => m.ListAvisosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisosPageRoutingModule {}
