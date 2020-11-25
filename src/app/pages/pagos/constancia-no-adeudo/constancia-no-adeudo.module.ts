import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConstanciaNoAdeudoPageRoutingModule } from './constancia-no-adeudo-routing.module';

import { ConstanciaNoAdeudoPage } from './constancia-no-adeudo.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConstanciaNoAdeudoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ConstanciaNoAdeudoPage]
})
export class ConstanciaNoAdeudoPageModule {}
