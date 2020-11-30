import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Anuncio } from '../models/anuncio.model';
import { DataLocalService } from './data-local.service';
import { Publicacion } from '../models/publicacion.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalAnuncioService {

  anuncios: Publicacion[] = [];
  nombreEtiquetaJson = "";

  constructor(private storage: Storage,
    private dataLocalService: DataLocalService) {   
    this.cargarAnuncios();
  }
  construyeNombreEtiqueta(){
    return this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_anuncios";
  }

  guardarAnuncio(anuncio: Publicacion) {
    const existe = this.anuncios.find(ann => ann.idpublicacion === anuncio.idpublicacion);
    if (!existe) {
      anuncio.idpublicacion = this.dataLocalService.getNumeroNegativo() * -1;
      this.anuncios.unshift(anuncio)
      this.storage.set(this.construyeNombreEtiqueta(), this.anuncios);
      this.dataLocalService.presentToast('Anuncio agregado');
    }
  }

  borrarAnuncio(anuncio: Publicacion) {
    this.anuncios = this.anuncios.filter(ann => ann.idpublicacion !== anuncio.idpublicacion);
    this.storage.set(this.construyeNombreEtiqueta(), this.anuncios);
    this.dataLocalService.presentToast('Anuncio borrado');
  }

  async cargarAnuncios() {
    const anncios = await this.storage.get(this.construyeNombreEtiqueta())
    if (anncios) {
      this.anuncios = anncios;
    }
  }
}
