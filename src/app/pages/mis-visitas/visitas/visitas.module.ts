import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitasPageRoutingModule } from './visitas-routing.module';

import { VisitasPage } from './visitas.page';
import { ComponentsModule } from '../../../components/components.module';
import { ListPage } from './list/list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VisitasPage,ListPage]
})
export class VisitasPageModule {}
