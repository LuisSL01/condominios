import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisosPageRoutingModule } from './avisos-routing.module';

import { AvisosPage } from './avisos.page';
import { ComponentsModule } from '../../components/components.module';
import { ListAvisosPage } from './list-avisos/list-avisos.page';
import { PipesModule } from '../../pipes/pipes.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    
    IonicModule,
    AvisosPageRoutingModule,
    
    ComponentsModule,
    PipesModule
  ],
  /* declarations: [AvisosPage, AddAvisosPage] */
  declarations: [AvisosPage, ListAvisosPage]
})
export class AvisosPageModule {}
