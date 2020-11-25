import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecibosPageRoutingModule } from './recibos-routing.module';

import { RecibosPage } from './recibos.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecibosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RecibosPage]
})
export class RecibosPageModule {}
