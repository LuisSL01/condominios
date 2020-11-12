import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagosPage } from './pagos.page';

const routes: Routes = [
  {
    path:'',
    redirectTo :'/pagos/cargar-comprobante',
    pathMatch:'full'
  },
  {
    path: '',
    component: PagosPage,
    children:[
      {
        path:'validar-comprobante',
        loadChildren: () => import('./validar-comprobante/validar-comprobante.module').then( m => m.ValidarComprobantePageModule)
      },
      {
        path:'cargar-comprobante',
        loadChildren: () => import('./cargar-comprobante/cargar-comprobante.module').then( m => m.CargarComprobantePageModule)
      },
      {
        path:'registrar-adeudo',
        loadChildren: () => import('./registrar-adeudo/registrar-adeudo.module').then( m => m.RegistrarAdeudoPageModule)
      }

    ]
  }
 
  ,
  {
    path: 'validar-comprobante',
    loadChildren: () => import('./validar-comprobante/validar-comprobante.module').then( m => m.ValidarComprobantePageModule)
  },
  {
    path: 'cargar-comprobante',
    loadChildren: () => import('./cargar-comprobante/cargar-comprobante.module').then( m => m.CargarComprobantePageModule)
  },
  {
    path: 'registrar-adeudo',
    loadChildren: () => import('./registrar-adeudo/registrar-adeudo.module').then( m => m.RegistrarAdeudoPageModule)
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosPageRoutingModule {}
