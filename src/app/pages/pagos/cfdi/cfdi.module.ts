import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CfdiPageRoutingModule } from './cfdi-routing.module';

import { CfdiPage } from './cfdi.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CfdiPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CfdiPage]
})
export class CfdiPageModule {}
