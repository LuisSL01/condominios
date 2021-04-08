import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepartamentoPageRoutingModule } from './departamento-routing.module';

import { DepartamentoPage } from './departamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartamentoPageRoutingModule
  ],
  declarations: [DepartamentoPage]
})
export class DepartamentoPageModule {}
