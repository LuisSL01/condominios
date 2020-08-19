import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [    
    HeaderComponent
  ],
  exports:[
    
    HeaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
