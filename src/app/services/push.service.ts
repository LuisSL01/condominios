import { Injectable, EventEmitter } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class PushService {

  
  mensajes: OSNotificationPayload []= [
    /*    {
         notificationID:1,  
         title:'Titulo de la push',
         body:'Este es el body de la push',
         date: new Date()
       } */
     ];
   
     userId:string;
   
     pushListener = new EventEmitter<OSNotificationPayload>();

  constructor(private oneSignal: OneSignal,
            private storage: Storage) {}

  async getMensajes() {
    await this.cargarMensajes();
    return [...this.mensajes];
  }

  configuracionInicial(){
    console.log('configuracionInicial()');
    
    

    //El primero es la ONESIGNAL APP ID
    //443f2c44-d14e-456d-a9e2-3dab0afa3122
    //Segundo argumento es el id del remitente de firebase    
    this.oneSignal.startInit('443f2c44-d14e-456d-a9e2-3dab0afa3122', '800047039884');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      // do something when notification is received
      console.log('Notificacion recibida ',noti);
      this.notificacionRecibida(noti);
      
    });

    this.oneSignal.handleNotificationOpened().subscribe( async(noti) => {
      // do something when a notification is opened
      console.log('Notificacion abierta ',noti);
      await this.notificacionRecibida(noti.notification);
    });

    //Obtener el id del suscriptor
    this.oneSignal.getIds().then( info =>{
      this.userId = info.userId;
      console.log('this.userId: '+this.userId);    
    }
    );
    this.oneSignal.endInit();

  }

  async notificacionRecibida(noti: OSNotification){
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
