import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResolucionesPageRoutingModule } from './resoluciones-routing.module';

import { ResolucionesPage } from './resoluciones.page';
import { ComponentsModule } from '../../../components/components.module';
import { ListPage } from './list/list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResolucionesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ResolucionesPage, ListPage]
})
export class ResolucionesPageModule {}
