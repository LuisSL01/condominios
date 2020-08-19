import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnunciosPageRoutingModule } from './anuncios-routing.module';

import { AnunciosPage } from './anuncios.page';
import { ComponentsModule } from '../../components/components.module';
import { ListPage } from './list/list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnunciosPageRoutingModule,
    ComponentsModule
  ],
  
  declarations: [AnunciosPage, ListPage]
})
export class AnunciosPageModule {}
