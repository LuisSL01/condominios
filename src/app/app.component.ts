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
import { LogService } from './services/log.service';



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
    private router:Router,
    private logService:LogService

  ) {
    /* this.logService.escribeLog("Iniciando constructor en app components"); */
    this.initializeApp();
    /* this.logService.escribeLog("Iniciando constructor en app components"); */
  }

  ngOnInit() {
    this.componentes = this.dataService.getMenuOpts();    

    
    if(this.isEmpty(this.userData.base64ImageEmpresa)) {
      this.userData.procesaDatosEmpresa();
   }
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }

  theme(){// Cuando se presiona el togle de tema oscuro entra a este metodo

    this.dark = !this.dark;
  }

  initializeApp() {
    
    
    this.platform.ready().then(() => {      
      this.logService.creaCarpeta(); 
      

      this.logService.escribeLog("*******************************");
      this.logService.escribeLog("termino de levantar plataforma");
      /* this.logService.escribeLog("this.platform.ready().then"); 
      */
      this.logService.escribeLog("comienza a cargar estilos");
      this.statusBar.styleDefault();
      this.logService.escribeLog("se oculta splashcreen");
      this.splashScreen.hide();
      this.logService.escribeLog("comienza configuracion inicial de push service");
      this.pushService.configuracionInicial()
      /* this.logService.escribeLog("terminando this.platform.ready().then"); */
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
