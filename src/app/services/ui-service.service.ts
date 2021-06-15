import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  loading:any;

  constructor(public loadingController: LoadingController) { }

  async presentLoading() {    
     this.loading = await this.loadingController.create({
      spinner:'bubbles',
//      cssClass: 'my-custom-class',
      message: 'Procesando...',
      translucent:true,
      
      //duration: 2000
    });
    this.loading.present();
  }
  dismissLoading(){    
    if(this.loading){
      this.loading.dismiss();
    }
  }
}
