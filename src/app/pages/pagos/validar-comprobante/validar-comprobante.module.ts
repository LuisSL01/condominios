import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidarComprobantePageRoutingModule } from './validar-comprobante-routing.module';

import { ValidarComprobantePage } from './validar-comprobante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidarComprobantePageRoutingModule
  ],
  declarations: [ValidarComprobantePage]
})
export class ValidarComprobantePageModule {}
