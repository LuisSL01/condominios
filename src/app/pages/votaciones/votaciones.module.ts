import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VotacionesPageRoutingModule } from './votaciones-routing.module';

import { VotacionesPage } from './votaciones.page';
import { ComponentsModule } from '../../components/components.module';
import { ListPage } from './list/list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VotacionesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VotacionesPage, ListPage]
})
export class VotacionesPageModule {}
