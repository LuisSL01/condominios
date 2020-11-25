import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConvocatoriasPageRoutingModule } from './convocatorias-routing.module';

import { ConvocatoriasPage } from './convocatorias.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConvocatoriasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ConvocatoriasPage]
})
export class ConvocatoriasPageModule {}
