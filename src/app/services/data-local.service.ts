import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  //Actualmense se utilizara para lanzar los toast de la aplicacion.


  numeroNegativo = -1;//Numero negativo para tener un numero consucitivo de los registros que se vayan creando
  
  idempresa:number =0;
  miIdAgente:number =0;
  
  constructor(public toastController: ToastController) {
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  getNumeroNegativo() {
    return new Date().getTime() + Math.floor((Math.random() * (1000-1))+1);//NUmero entre 1 y 1000
  }

  getNumeroRandom() {
    return new Date().getTime() + Math.floor((Math.random() * (1000-1))+1);//NUmero entre 1 y 1000
  }

  


}
