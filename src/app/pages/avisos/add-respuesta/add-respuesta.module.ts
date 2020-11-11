import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRespuestaPageRoutingModule } from './add-respuesta-routing.module';

import { AddRespuestaPage } from './add-respuesta.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddRespuestaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AddRespuestaPage]
})
export class AddRespuestaPageModule {}
