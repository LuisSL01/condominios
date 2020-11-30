import { Injectable } from '@angular/core';

import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';
import { Publicacion } from '../models/publicacion.model';


@Injectable({
  providedIn: 'root'
})
export class DataLocalResolucionService {

  resoluciones: Publicacion[] = [];

  nombreEtiquetaJson = "resoluciones";


  constructor(private storage: Storage,
    private dataLocalService: DataLocalService) {
      console.log('en el constrictor de data local resolucion service');
      

      /* this.cargarRegistros(); */


  }

  construyeNombreEtiqueta() {
    return this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_resoluciones";
  }

  guardar(resolucion: Publicacion) {
    const existe = this.resoluciones.find(res => res.idpublicacion === resolucion.idpublicacion);
    if (!existe) {
      resolucion.idpublicacion = this.dataLocalService.getNumeroNegativo() * -1;
      this.resoluciones.unshift(resolucion);
      this.storage.set(this.construyeNombreEtiqueta(), this.resoluciones);
      this.dataLocalService.presentToast('Resolución agregada');
    }

  }

  borrar(resolucion: Publicacion) {
    this.resoluciones = this.resoluciones.filter(res => res.idpublicacion !== resolucion.idpublicacion)
    this.storage.set(this.construyeNombreEtiqueta(), this.resoluciones);
    this.dataLocalService.presentToast('Resolución borrada');
  }

  async cargarRegistros() {
    console.log('this.construyeNombreEtiqueta(): '+this.construyeNombreEtiqueta());
    const ress = await this.storage.get(this.construyeNombreEtiqueta());
    if (ress) {
      this.resoluciones = ress;
    }
  }


}
