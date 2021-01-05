import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VotacionesPage } from './votaciones.page';

const routes: Routes = [
  {
    path: '',
    component: VotacionesPage
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },  {
    path: 'responder-encuesta',
    loadChildren: () => import('./responder-encuesta/responder-encuesta.module').then( m => m.ResponderEncuestaPageModule)
  },
  {
    path: 'opciones-pregunta',
    loadChildren: () => import('./opciones-pregunta/opciones-pregunta.module').then( m => m.OpcionesPreguntaPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VotacionesPageRoutingModule {}
