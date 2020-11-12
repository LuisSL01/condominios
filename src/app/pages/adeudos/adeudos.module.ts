import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdeudosPageRoutingModule } from './adeudos-routing.module';

import { AdeudosPage } from './adeudos.page';
import { ComponentsModule } from '../../components/components.module';
import { ListPage } from './list/list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdeudosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdeudosPage, ListPage]
})
export class AdeudosPageModule {}
