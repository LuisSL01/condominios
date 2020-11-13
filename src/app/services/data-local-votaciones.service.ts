import { Injectable } from '@angular/core';
import { Encuesta } from '../models/votaciones.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalVotacionesService {

  votaciones:Encuesta[]=[];
  nombreEtiquetaJson = "encuestas";
  constructor(public storage : Storage,
    private dataLocalService : DataLocalService) {
      this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_" + this.nombreEtiquetaJson;
      this.cargarVotaciones();
   }

   guardarVotacion( votacion : Encuesta ){
    const existe = this.votaciones.find( vot => vot.idvotacion === votacion.idvotacion );
    if( ! existe){
      votacion.idvotacion = this.dataLocalService.getNumeroNegativo() *-1;
      this.votaciones.unshift(votacion);
      this.storage.set(this.nombreEtiquetaJson, this.votaciones);
      this.dataLocalService.presentToast('Encuesta agregada');
    }
   }


   borrarVotacion(votacion: Encuesta) {
    this.votaciones = this.votaciones.filter(vot => vot.idvotacion !== votacion.idvotacion)
    this.storage.set(this.nombreEtiquetaJson, this.votaciones);
    this.dataLocalService.presentToast('Encuesta borrada');
  }

   async cargarVotaciones(){
      const vot = await this.storage.get(this.nombreEtiquetaJson);
      if(vot){
        this.votaciones = vot;
      }
   }

}
