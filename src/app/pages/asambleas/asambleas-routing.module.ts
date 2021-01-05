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
    loadChildren: () => import('../../pages/votaciones/votaciones.module').then( m => m.VotacionesPageModule)
  },
  {
    path: 'convocatorias',
    loadChildren: () => import('../../pages/convocatorias/convocatorias.module').then( m => m.ConvocatoriasPageModule)
  },
  {
    path: 'resoluciones',
    loadChildren: () => import('../../pages/resoluciones/resoluciones.module').then( m => m.ResolucionesPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsambleasPageRoutingModule {}
