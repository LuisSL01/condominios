import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdeudoPlantillaPageRoutingModule } from './adeudo-plantilla-routing.module';

import { AdeudoPlantillaPage } from './adeudo-plantilla.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdeudoPlantillaPageRoutingModule
  ],
  declarations: [AdeudoPlantillaPage]
})
export class AdeudoPlantillaPageModule {}
