import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfiguracionEmpPageRoutingModule } from './configuracion-emp-routing.module';

import { ConfiguracionEmpPage } from './configuracion-emp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracionEmpPageRoutingModule
  ],
  declarations: [ConfiguracionEmpPage]
})
export class ConfiguracionEmpPageModule {}
