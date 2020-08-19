import { Component } from '@angular/core';

import { Platform, Config } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


//Se implementa para poder modificar los meses

import * as moment from 'moment-timezone';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  momentjs: any = moment;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private config: Config
    
    
    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.momentjs().tz('America/Mexico_City');
      console.log('antes de setear los new values');
      
      



      //this.config.set('monthNames', this.momentjs.months());
      
      
      
      /* this.config.set('monthShortNames',  this.moment.monthsShort());
      this.config.set('dayNames',  this.moment.weekdays());
      this.config.set('dayShortNames',  this.moment.weekdaysShort()); */
      

    });
  }
}
