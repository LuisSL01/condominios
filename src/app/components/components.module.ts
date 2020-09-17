import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [    
    HeaderComponent,
    MenuComponent
  ],
  exports:[    
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
