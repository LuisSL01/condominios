import { Injectable, EventEmitter } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';

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

  constructor(private oneSignal: OneSignal) {}

  configuracionInicial(){
    console.log('configuracionInicial()');
    

    //El primero es la ONESIGNAL APP ID
    //Segundo argumento es el id del remitente de firebase
    //2f08fd80-3bc4-43ed-b56c-6346208f5118
    this.oneSignal.startInit('2f08fd80-3bc4-43ed-b56c-6346208f5118', '204984176023');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      // do something when notification is received
      console.log('Notificacion recibida ',noti);
      //this.notificacionRecibida(noti);
      
    });

    this.oneSignal.handleNotificationOpened().subscribe( async(noti) => {
      // do something when a notification is opened
      console.log('Notificacion abierta ',noti);
      //await this.notificacionRecibida(noti.notification);
    });

    //Obtener el id del suscriptor
    this.oneSignal.getIds().then( info =>{
      this.userId = info.userId;
      console.log(this.userId);
      

    }

    );
    this.oneSignal.endInit();

  }
}
