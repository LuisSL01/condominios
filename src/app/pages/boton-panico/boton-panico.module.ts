import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BotonPanicoPageRoutingModule } from './boton-panico-routing.module';

import { BotonPanicoPage } from './boton-panico.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BotonPanicoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BotonPanicoPage]
})
export class BotonPanicoPageModule {}
