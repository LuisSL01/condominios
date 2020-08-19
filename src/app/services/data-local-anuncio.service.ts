import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Anuncio } from '../models/anuncio.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalAnuncioService {

  anuncios:Anuncio[]=[];

  constructor(private storage: Storage,
    public toastController: ToastController) { 
      console.log('constructor de data local anuncio service');
      this.cargarAnuncios();
    }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }
  guardarAnuncio( anuncio : Anuncio ){
    this.anuncios.unshift(anuncio)
    this.storage.set('anuncios',this.anuncios);
    this.presentToast('Anuncio agregado')
  }
  async cargarAnuncios(){
    const anncios = await this.storage.get('anuncios') 
    if(anncios){
      this.anuncios = anncios;
    }
  }
}
