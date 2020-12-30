import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaComunReservaPageRoutingModule } from './area-comun-reserva-routing.module';

import { AreaComunReservaPage } from './area-comun-reserva.page';
import { ComponentsModule } from '../../components/components.module';
import { ListPage } from './list/list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaComunReservaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AreaComunReservaPage, ListPage]
})
export class AreaComunReservaPageModule {}
