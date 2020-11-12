import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargarComprobantePageRoutingModule } from './cargar-comprobante-routing.module';

import { CargarComprobantePage } from './cargar-comprobante.page';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { ListPage } from './list/list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CargarComprobantePageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [CargarComprobantePage,ListPage]
})
export class CargarComprobantePageModule {}
