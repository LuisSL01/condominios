import { Injectable } from '@angular/core';
import { Votacion } from '../models/votaciones.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalVotacionesService {

  votaciones:Votacion[]=[];
  nombreEtiquetaJson = "votaciones";
  constructor(public storage : Storage,
    private dataLocalService : DataLocalService) {
      this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_" + this.nombreEtiquetaJson;
      this.cargarVotaciones();
   }

   guardarVotacion( votacion : Votacion ){
    const existe = this.votaciones.find( vot => vot.idvotacion === votacion.idvotacion );
    if( ! existe){
      votacion.idvotacion = this.dataLocalService.getNumeroNegativo() *-1;
      this.votaciones.unshift(votacion);
      this.storage.set(this.nombreEtiquetaJson, this.votaciones);
      this.dataLocalService.presentToast('Votación agregado');
    }
   }


   borrarVotacion(votacion: Votacion) {
    this.votaciones = this.votaciones.filter(vot => vot.idvotacion !== votacion.idvotacion)
    this.storage.set(this.nombreEtiquetaJson, this.votaciones);
    this.dataLocalService.presentToast('Votación borrada');
  }

   async cargarVotaciones(){
      const vot = await this.storage.get(this.nombreEtiquetaJson);
      if(vot){
        this.votaciones = vot;
      }
   }

}
