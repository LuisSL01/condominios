import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuAreasComunesPage } from './menu-areas-comunes.page';

const routes: Routes = [
  {
    path: '',
    component: MenuAreasComunesPage
  },
  {
    path: 'areas-comunes',
    loadChildren: () => import('../../pages/areas-comunes/areas-comunes.module').then( m => m.AreasComunesPageModule)
  },
  {
    path: 'area-comun-reserva',
    loadChildren: () => import('../../pages/area-comun-reserva/area-comun-reserva.module').then( m => m.AreaComunReservaPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuAreasComunesPageRoutingModule {}
