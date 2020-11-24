import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BitacoraVisitasPageRoutingModule } from './bitacora-visitas-routing.module';

import { BitacoraVisitasPage } from './bitacora-visitas.page';
import { ListPage } from './list/list.page';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BitacoraVisitasPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [BitacoraVisitasPage, ListPage]
})
export class BitacoraVisitasPageModule {}
