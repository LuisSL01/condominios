import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreasComunesPageRoutingModule } from './areas-comunes-routing.module';

import { AreasComunesPage } from './areas-comunes.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ListPage } from './list/list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreasComunesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AreasComunesPage, ListPage]
})
export class AreasComunesPageModule {}
