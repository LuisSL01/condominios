import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisAreasComunesPage } from './mis-areas-comunes.page';

const routes: Routes = [
  {
    path: '',
    component: MisAreasComunesPage
  },
  /* {
    path: 'areas-comunes',
    loadChildren: () => import('./areas-comunes/areas-comunes.module').then( m => m.AreasComunesPageModule)
  },
  {
    path: 'area-comun-reserva',
    loadChildren: () => import('./area-comun-reserva/area-comun-reserva.module').then( m => m.AreaComunReservaPageModule)
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisAreasComunesPageRoutingModule {}
