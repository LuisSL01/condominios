import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactosEmergenciaPageRoutingModule } from './contactos-emergencia-routing.module';

import { ContactosEmergenciaPage } from './contactos-emergencia.page';
import { ComponentsModule } from '../../components/components.module';
import { ListPage } from './list/list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactosEmergenciaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContactosEmergenciaPage, ListPage]
})
export class ContactosEmergenciaPageModule {}
