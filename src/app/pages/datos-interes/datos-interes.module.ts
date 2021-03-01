import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosInteresPageRoutingModule } from './datos-interes-routing.module';

import { DatosInteresPage } from './datos-interes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosInteresPageRoutingModule
  ],
  declarations: [DatosInteresPage]
})
export class DatosInteresPageModule {}
