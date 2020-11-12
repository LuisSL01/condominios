import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarAdeudoPageRoutingModule } from './registrar-adeudo-routing.module';

import { RegistrarAdeudoPage } from './registrar-adeudo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarAdeudoPageRoutingModule
  ],
  declarations: [RegistrarAdeudoPage]
})
export class RegistrarAdeudoPageModule {}
