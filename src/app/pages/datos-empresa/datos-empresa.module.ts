import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosEmpresaPageRoutingModule } from './datos-empresa-routing.module';

import { DatosEmpresaPage } from './datos-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DatosEmpresaPageRoutingModule
  ],
  declarations: [DatosEmpresaPage]
})
export class DatosEmpresaPageModule {}
