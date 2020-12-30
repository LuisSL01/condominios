import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisAreasComunesPageRoutingModule } from './mis-areas-comunes-routing.module';

import { MisAreasComunesPage } from './mis-areas-comunes.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisAreasComunesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MisAreasComunesPage]
})
export class MisAreasComunesPageModule {}
