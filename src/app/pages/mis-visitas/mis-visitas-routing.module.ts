import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisVisitasPage } from './mis-visitas.page';

const routes: Routes = [
  {
    path: '',
    component: MisVisitasPage
  },
  {
    path: 'visitas',
    loadChildren: () => import('./visitas/visitas.module').then( m => m.VisitasPageModule)
  },
  {
    path: 'bitacora-visitas',
    loadChildren: () => import('./bitacora-visitas/bitacora-visitas.module').then( m => m.BitacoraVisitasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisVisitasPageRoutingModule {}
