import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministracionPageRoutingModule } from './administracion-routing.module';

import { AdministracionPage } from './administracion.page';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,    
    AdministracionPageRoutingModule,
    ComponentsModule,
    

  ],
  declarations: [AdministracionPage]
})
export class AdministracionPageModule {}
