import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidarComprobantesPageRoutingModule } from './validar-comprobantes-routing.module';

import { ValidarComprobantesPage } from './validar-comprobantes.page';
import { ListPage } from './list/list.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidarComprobantesPageRoutingModule,
    ComponentsModule,
    PipesModule
    

  ],
  declarations: [ValidarComprobantesPage, ListPage]
})
export class ValidarComprobantesPageModule {}
