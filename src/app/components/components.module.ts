import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { MenuComponent } from './menu/menu.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { FooterComponent } from './footer/footer.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { AnuncioListComponent } from './anuncio-list/anuncio-list.component';






@NgModule({
  declarations: [    
    HeaderComponent,
    MenuComponent,
    MenuHeaderComponent,
    FooterComponent,
    ButtonsComponent,
    AnuncioListComponent
    
  ],
  exports:[    
    HeaderComponent,
    MenuComponent,
    MenuHeaderComponent,
    FooterComponent,
    ButtonsComponent,    
    AnuncioListComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    IonicModule,
    PipesModule,
    
  ]
})
export class ComponentsModule { }
