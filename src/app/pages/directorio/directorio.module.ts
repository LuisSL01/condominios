import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectorioPageRoutingModule } from './directorio-routing.module';

import { DirectorioPage } from './directorio.page';
import { ComponentsModule } from '../../components/components.module';
import { ListPage } from './list/list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectorioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DirectorioPage, ListPage]
})
export class DirectorioPageModule {}
