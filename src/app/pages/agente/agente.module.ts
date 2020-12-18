import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgentePageRoutingModule } from './agente-routing.module';

import { AgentePage } from './agente.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentePageRoutingModule,
    ComponentsModule
  ],
  declarations: [AgentePage]
})
export class AgentePageModule {}
