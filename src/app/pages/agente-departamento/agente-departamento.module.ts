import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgenteDepartamentoPageRoutingModule } from './agente-departamento-routing.module';

import { AgenteDepartamentoPage } from './agente-departamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgenteDepartamentoPageRoutingModule
  ],
  declarations: [AgenteDepartamentoPage]
})
export class AgenteDepartamentoPageModule {}
