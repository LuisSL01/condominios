import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';
import { ComponentsModule } from '../../components/components.module';

import {NgxMaskIonicModule} from 'ngx-mask-ionic';
import { CreatePageModule } from '../empresa/create/create.module';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistrationPageRoutingModule,
    ComponentsModule,    
    NgxMaskIonicModule,
    CreatePageModule
  ],
  declarations: [RegistrationPage]
})
export class RegistrationPageModule {}
