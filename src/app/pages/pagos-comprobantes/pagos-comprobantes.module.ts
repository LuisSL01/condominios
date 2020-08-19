import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagosComprobantesPageRoutingModule } from './pagos-comprobantes-routing.module';

import { PagosComprobantesPage } from './pagos-comprobantes.page';
import { ComponentsModule } from '../../components/components.module';
import { ListPage } from './list/list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagosComprobantesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PagosComprobantesPage, ListPage]
})
export class PagosComprobantesPageModule {}
