import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadosCuentaPageRoutingModule } from './estados-cuenta-routing.module';

import { EstadosCuentaPage } from './estados-cuenta.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadosCuentaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EstadosCuentaPage]
})
export class EstadosCuentaPageModule {}
