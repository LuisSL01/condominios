import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Anuncio } from '../models/anuncio.model';
import { DataLocalService } from './data-local.service';

@Injectable({
  providedIn: 'root'
})
export class DataLocalAnuncioService {

  anuncios: Anuncio[] = [];

  constructor(private storage: Storage,
    private dataLocalService: DataLocalService) {
    console.log('constructor de data local anuncio service');
    this.cargarAnuncios();
  }

  guardarAnuncio(anuncio: Anuncio) {
    const existe = this.anuncios.find(ann => ann.idanuncio === anuncio.idanuncio);
    if (!existe) {
      anuncio.idanuncio = this.dataLocalService.getNumeroNegativo() * -1;
      this.anuncios.unshift(anuncio)
      this.storage.set('anuncios', this.anuncios);
      this.dataLocalService.presentToast('Anuncio agregado');
    }
  }

  borrarAnuncio(anuncio: Anuncio) {
    this.anuncios = this.anuncios.filter(ann => ann.idanuncio !== anuncio.idanuncio);
    this.storage.set('anuncios', this.anuncios);
    this.dataLocalService.presentToast('Anuncio borrado');
  }

  async cargarAnuncios() {
    const anncios = await this.storage.get('anuncios')
    if (anncios) {
      this.anuncios = anncios;
    }
  }
}
