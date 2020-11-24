import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionesPreguntaPageRoutingModule } from './opciones-pregunta-routing.module';

import { OpcionesPreguntaPage } from './opciones-pregunta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionesPreguntaPageRoutingModule
  ],
  declarations: [OpcionesPreguntaPage]
})
export class OpcionesPreguntaPageModule {}
