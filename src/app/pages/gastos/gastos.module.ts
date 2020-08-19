import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GastosPageRoutingModule } from './gastos-routing.module';

import { GastosPage } from './gastos.page';
import { ComponentsModule } from '../../components/components.module';
import { ListPage } from './list/list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GastosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GastosPage, ListPage]
})
export class GastosPageModule {}
