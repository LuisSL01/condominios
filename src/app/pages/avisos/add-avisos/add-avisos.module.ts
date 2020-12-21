import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAvisosPageRoutingModule } from './add-avisos-routing.module';

import { AddAvisosPage } from './add-avisos.page';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';


@NgModule({
  imports: [    
    CommonModule,
    FormsModule,
    IonicModule,
    AddAvisosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [AddAvisosPage]
})
export class AddAvisosPageModule {}
