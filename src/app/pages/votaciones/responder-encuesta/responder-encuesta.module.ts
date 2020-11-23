import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponderEncuestaPageRoutingModule } from './responder-encuesta-routing.module';

import { ResponderEncuestaPage } from './responder-encuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponderEncuestaPageRoutingModule
  ],
  declarations: [ResponderEncuestaPage]
})
export class ResponderEncuestaPageModule {}
