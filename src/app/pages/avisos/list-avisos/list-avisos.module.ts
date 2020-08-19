import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAvisosPageRoutingModule } from './list-avisos-routing.module';

import { ListAvisosPage } from './list-avisos.page';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    ListAvisosPageRoutingModule,


    PipesModule
  ],
  declarations: [ListAvisosPage]
})
export class ListAvisosPageModule {}
