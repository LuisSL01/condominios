import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagosPage } from './pagos.page';

const routes: Routes = [
  {
    path: '',
    component: PagosPage
  },

  {
    path: 'pagos-comprobantes',
    loadChildren: () => import('./pagos-comprobantes/pagos-comprobantes.module').then( m => m.PagosComprobantesPageModule)
  },
  {
    path: 'validar-comprobantes',
    loadChildren: () => import('./validar-comprobantes/validar-comprobantes.module').then( m => m.ValidarComprobantesPageModule)
  },
  
  {
    path: 'adeudos',
    loadChildren: () => import('./adeudos/adeudos.module').then( m => m.AdeudosPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosPageRoutingModule {}
