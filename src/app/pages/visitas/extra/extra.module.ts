import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtraPageRoutingModule } from './extra-routing.module';

import { ExtraPage } from './extra.page';
import { ComponentsModule } from '../../../components/components.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ExtraPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [ExtraPage]
})
export class ExtraPageModule {}
