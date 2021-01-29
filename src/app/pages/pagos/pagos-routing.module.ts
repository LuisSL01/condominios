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
    loadChildren: () => import('../../pages/pagos-comprobantes/pagos-comprobantes.module').then( m => m.PagosComprobantesPageModule)
  },
  {
    path: 'validar-comprobantes',
    loadChildren: () => import('../../pages/validar-comprobantes/validar-comprobantes.module').then( m => m.ValidarComprobantesPageModule)
  },
  
  {
    path: 'adeudos',
    loadChildren: () => import('../../pages/adeudos/adeudos.module').then( m => m.AdeudosPageModule)
  },
  {
    path: 'cfdi',
    loadChildren: () => import('../../pages/cfdi/cfdi.module').then( m => m.CfdiPageModule)
  },
  {
    path: 'constancia-no-adeudo',
    loadChildren: () => import('../../pages/constancia-no-adeudo/constancia-no-adeudo.module').then( m => m.ConstanciaNoAdeudoPageModule)
  },
  {
    path: 'recibos',
    loadChildren: () => import('../../pages/recibos/recibos.module').then( m => m.RecibosPageModule)
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosPageRoutingModule {}
