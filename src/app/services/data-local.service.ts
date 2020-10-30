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
    return this.numeroNegativo--;
  }

  


}
