import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsambleasPage } from './asambleas.page';

const routes: Routes = [
  {
    path: '',
    component: AsambleasPage
  },
  {
    path: 'votaciones',
    loadChildren: () => import('./votaciones/votaciones.module').then( m => m.VotacionesPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsambleasPageRoutingModule {}
