import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReglamentoPageRoutingModule } from './reglamento-routing.module';

import { ReglamentoPage } from './reglamento.page';
import { ComponentsModule } from '../../components/components.module'; 



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReglamentoPageRoutingModule,
    ComponentsModule
    
  ],
  declarations: [ReglamentoPage]
})
export class ReglamentoPageModule {}
