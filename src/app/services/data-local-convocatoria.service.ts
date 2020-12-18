import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { DataLocalService } from './data-local.service';
import { Publicacion } from '../models/publicacion.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalConvocatoriaService {

  convocatorias: Publicacion[] = [];


  nombreEtiquetaJson = "convocatorias";

  constructor(private storage: Storage,
    private dataLocalService: DataLocalService) {
      console.log('en el constructor de convocatorias service...');
      

      this.cargarRegistros();

  }

  construyeNombreEtiqueta() {
    return this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_convocatorias";
  }

  guardar(convocatoria : Publicacion){
    const existe = this.convocatorias.find(con => con.id === convocatoria.id);
    if (!existe) {
      convocatoria.id = this.dataLocalService.getNumeroNegativo() * -1;
      this.convocatorias.unshift(convocatoria);
      this.storage.set(this.construyeNombreEtiqueta(), this.convocatorias);
      this.dataLocalService.presentToast('Convocatoria agregada');
    }

  }
  borrar(convocatoria : Publicacion){
    this.convocatorias = this.convocatorias.filter(con => con.id !== convocatoria.id)
    this.storage.set(this.construyeNombreEtiqueta(), this.convocatorias);
    this.dataLocalService.presentToast('Convocatoria borrada');
  }
  async cargarRegistros(){
    console.log('this.construyeNombreEtiqueta(): '+this.construyeNombreEtiqueta());
    
    const conv = await this.storage.get(this.construyeNombreEtiqueta());
    if (conv) {
      //Cuando viene != null se iguala al arreglo global
      this.convocatorias = conv;
    }
  }

}
