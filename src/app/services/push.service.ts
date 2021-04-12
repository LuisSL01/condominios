import { Injectable, EventEmitter } from '@angular/core';
 import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/index';
import { Notificacion } from '../models/notificacion.model';
import { UserData } from '../providers/user-data';
import { Router } from '@angular/router';
import { LogService } from './log.service';
 
@Injectable({
  providedIn: 'root'
})
export class PushService {


  mensajes: OSNotificationPayload []= [];   
  userId:string;   
  pushListener = new EventEmitter<OSNotificationPayload>();
  notificacion : Notificacion;
  dataMapNotificacion: any = {};

  baseUrl: string = environment.coreServiceBaseUrl;
  notificacionContext: string = environment.coreApiBaseNotificacionOperation;  

  constructor(private oneSignal: OneSignal,
              private storage: Storage,
              private router: Router,
              private userData: UserData,
              private logService:LogService,
              private http: HttpClient) {}

  async getMensajes() {
    await this.cargarMensajes();
    return [...this.mensajes];
  }

  configuracionInicial(){
    console.log('configuracionInicial()');
    this.logService.escribeLog("configuracionInicial() de push service")
    //El primer valor es la ONESIGNAL APP ID -->443f2c44-d14e-456d-a9e2-3dab0afa3122
    //El Segundo argumento es el id del remitente de firebase --> 800047039884
    this.oneSignal.startInit('443f2c44-d14e-456d-a9e2-3dab0afa3122', '800047039884');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      console.log('Notificacion recibida ',noti);
      this.notificacion = new Notificacion();
      this.dataMapNotificacion = {};   
      this.notificacion.empresa = this.userData.getIdEmpresa();
      this.notificacion.agente = this.userData.getIdAgente();
      this.dataMapNotificacion.body = noti.payload.body;
      this.dataMapNotificacion.title = noti.payload.title;
      this.dataMapNotificacion.additionalData = noti.payload.additionalData;
      this.dataMapNotificacion.notificationID = noti.payload.notificationID;
      this.dataMapNotificacion.open = false;
      this.notificacion.data = this.dataMapNotificacion;
      this.saveNotificacion(this.notificacion);
      this.notificacionRecibida(noti);
    });

    this.oneSignal.handleNotificationOpened().subscribe( async(noti) => {
      // do something when a notification is opened
      console.log('Notificacion abierta ',noti);
      /* await this.notificacionRecibida(noti.notification); */
      await this.procesaDataNotificacionAbierta(noti.notification);
    });

    //Obtener el id del suscriptor
    this.oneSignal.getIds().then( info =>{
      this.userId = info.userId;
      console.log('this.userId: '+this.userId);
      this.logService.escribeLog("user id: "+ this.userId);
    }
    );
    this.oneSignal.endInit();
    this.logService.escribeLog("terminando configuracion de push");
    
  }

  saveNotificacion(notificacionData: any){
    this.save(notificacionData).subscribe((data) => {
      console.log(data);
      if (data.status === 200) {
      } else {this.userData.showToast('Error al registrar llego otro status');}
    },
    (err) => {console.log(err);this.userData.showToast("Error: "+ err);
    },() => {}
  );  
  }

  updateNotificacion(notificacionData: any){
    this.save(notificacionData).subscribe((data) => {
      console.log(data);
      if (data.status === 200) {
      } else {this.userData.showToast('Error al registrar llego otro status');}
    },
    (err) => {console.log(err);this.userData.showToast("Error: "+ err);
    },() => {}
  );  
  }


  



  save(notificacionData: any): Observable<ApiResponse> {
    console.log('save notificacion:'+this.baseUrl + this.notificacionContext);
    return this.http.post<ApiResponse>(this.baseUrl + this.notificacionContext, notificacionData).pipe(share());
  }

  
  updateStatus(notificacionData: any): Observable<ApiResponse> {
    console.log('save notificacion:'+this.baseUrl + this.notificacionContext);
    return this.http.post<ApiResponse>(this.baseUrl + this.notificacionContext, notificacionData).pipe(share());
  }

  async notificacionRecibida(noti: OSNotification){
    console.log('notificacionRecibida', JSON.stringify(noti));    
    await this.cargarMensajes();
    const payload = noti.payload;
    const existePush = this.mensajes.find( mensaje => mensaje.notificationID === payload.notificationID);
    if(existePush){
      return;
    }
    this.mensajes.unshift(payload);
    this.pushListener.emit(payload);
    await this.guardarMensajes();    
}


async procesaDataNotificacionAbierta(noti: OSNotification){

  const dt = await this.storage.get('userDetails');  
  if(dt){
    console.log('dt');    
      console.log('dt.id');      
      this.router.navigateByUrl(noti.payload.additionalData.routerLink);
    //Sy existe sesion debo redireccionar a la ruta del push
    
  }else{
    console.log('else');    
    //Sy existe sesion debo redireccionar al home
    this.router.navigate(['/home']);
  }

  
}

guardarMensajes(){
  this.storage.set('mensajes', this.mensajes);
}

async cargarMensajes(){
  

  this.mensajes = await this.storage.get('mensajes') || [];

  return this.mensajes;
}

async borrarMensajes(){
    await this.storage.clear();
    this.mensajes =[];
    this.guardarMensajes();
} 

}
