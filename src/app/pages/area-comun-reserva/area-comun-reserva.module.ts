import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaComunReservaPageRoutingModule } from './area-comun-reserva-routing.module';

import { AreaComunReservaPage } from './area-comun-reserva.page';
import { ComponentsModule } from '../../components/components.module';
import { ListPage } from './list/list.page';


import { NgCalendarModule  } from 'ionic2-calendar';
 
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/es-MX';
import { CalendarPageModule } from '../calendar/calendar.module';
registerLocaleData(localeDe);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaComunReservaPageRoutingModule,
    CalendarPageModule,
    NgCalendarModule,
    ComponentsModule
  ],
  declarations: [AreaComunReservaPage, ListPage],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' }
  ]
})
export class AreaComunReservaPageModule {}
