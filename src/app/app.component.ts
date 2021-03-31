import { Component, OnInit } from '@angular/core';

import { Platform, Config } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PushService } from './services/push.service';
import { DataService } from './services/data.service';
import { UserData } from './providers/user-data';
import { Componente } from 'src/app/interfaces/interface';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{


  componentes: Observable<Componente[]>;
  pathImage:string;
  idEmpresa:number;

  dark = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private pushService:PushService,
    private dataService:DataService, 
    public userData: UserData,
    private storage: Storage,
    private router:Router
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.componentes = this.dataService.getMenuOpts();    
    this.userData.retrieveBase64ToImageEmpresa();    
  }

  theme(){// Cuando se presiona el togle de tema oscuro entra a este metodo

    this.dark = !this.dark;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log('iniciando configuracion inicial');
      

      this.pushService.configuracionInicial()
    });
  }

  logOut(){
    console.log('log out');
    this.userData.logout().then(() => {
      this.storage.remove('empresaData');
      this.storage.remove('userDetails');
      this.storage.remove('userFull');
      window.localStorage.removeItem('empresaData');
      window.localStorage.removeItem('userDetails');
      this.userData.empresa_id = 0;
      this.userData.agente_id = 0;
      this.userData.nameImageEmpresa ="";
      this.eliminarStorage();
      return this.router.navigateByUrl('/home');
    });

  }

  async eliminarStorage(){
    await this.storage.clear();
  }
}
