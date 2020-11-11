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
  nombreEtiquetaJson = "anuncios";

  constructor(private storage: Storage,
    private dataLocalService: DataLocalService) {
    this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_"+this.nombreEtiquetaJson;
    this.cargarAnuncios();
  }

  guardarAnuncio(anuncio: Anuncio) {
    const existe = this.anuncios.find(ann => ann.idanuncio === anuncio.idanuncio);
    if (!existe) {
      anuncio.idanuncio = this.dataLocalService.getNumeroNegativo() * -1;
      this.anuncios.unshift(anuncio)
      this.storage.set(this.nombreEtiquetaJson, this.anuncios);
      this.dataLocalService.presentToast('Anuncio agregado');
    }
  }

  borrarAnuncio(anuncio: Anuncio) {
    this.anuncios = this.anuncios.filter(ann => ann.idanuncio !== anuncio.idanuncio);
    this.storage.set(this.nombreEtiquetaJson, this.anuncios);
    this.dataLocalService.presentToast('Anuncio borrado');
  }

  async cargarAnuncios() {
    const anncios = await this.storage.get(this.nombreEtiquetaJson)
    if (anncios) {
      this.anuncios = anncios;
    }
  }
}
