import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgenteDepartamentoPage } from './agente-departamento.page';

const routes: Routes = [
  {
    path: '',
    component: AgenteDepartamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgenteDepartamentoPageRoutingModule {}
