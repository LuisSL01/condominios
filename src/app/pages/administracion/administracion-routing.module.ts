import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministracionPage } from './administracion.page';
import { ConfiguracionEmpPage } from '../configuracion-emp/configuracion-emp.page';

const routes: Routes = [
  {
    path: '',
    component: AdministracionPage,
    children: [     
      {
        path: 'configuracion-emp',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/configuracion-emp/configuracion-emp.module').then(m => m.ConfiguracionEmpPageModule)
          }
        ]
      },
      {
        path: 'datos-empresa',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/datos-empresa/datos-empresa.module').then(m => m.DatosEmpresaPageModule)
          }
        ]
      },
      {
        path: 'extra',
        children: [
          {
            path: '',
            loadChildren: () => import('../../pages/extra/extra.module').then(m => m.ExtraPageModule)
          }
        ]
      }, 
    ]
  },
  {
    path: '',
    redirectTo: '/administracion/datos-empresa',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionPageRoutingModule {}
