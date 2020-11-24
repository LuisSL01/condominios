import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisVisitasPageRoutingModule } from './mis-visitas-routing.module';

import { MisVisitasPage } from './mis-visitas.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisVisitasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MisVisitasPage]
})
export class MisVisitasPageModule {}
