import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuAreasComunesPageRoutingModule } from './menu-areas-comunes-routing.module';

import { MenuAreasComunesPage } from './menu-areas-comunes.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuAreasComunesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MenuAreasComunesPage]
})
export class MenuAreasComunesPageModule {}
