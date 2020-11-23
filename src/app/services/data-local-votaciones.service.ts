import { Injectable, OnInit } from '@angular/core';
import { Encuesta } from '../models/votaciones.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';
import { EncuestaPregunta } from '../models/encuesta-pregunta.model';
import { EncuestaPreguntaRespuesta } from '../models/encuesta-pregunta-respuesta.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalVotacionesService{

  votaciones: Encuesta[] = [];
  nombreEtiquetaJson = "encuestas";
  constructor(public storage: Storage,
    private dataLocalService: DataLocalService) {
      
  }
  
  construyeNombreEtiquetaJson(){
    console.log('construyeNombreEtiquetaJson:',this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_encuestas");
    return this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_encuestas" ;
  }


  guardarVotacion(votacion: Encuesta) {
    const existe = this.votaciones.find(vot => vot.idvotacion === votacion.idvotacion);
    if (!existe) {
      votacion.idvotacion = this.dataLocalService.getNumeroNegativo() * -1;
      this.votaciones.unshift(votacion);
      this.storage.set(this.construyeNombreEtiquetaJson(), this.votaciones);
      this.dataLocalService.presentToast('Encuesta agregada');
    }
  }

  guardarRespuestaEncuesta(pregunta: EncuestaPregunta, respuesta: EncuestaPreguntaRespuesta) {
    pregunta.respuestas.unshift(respuesta);
    this.storage.set(this.construyeNombreEtiquetaJson(), this.votaciones);
    this.dataLocalService.presentToast('respuesta agregada');
  }

  editarRespuestaEncuesta() {
    this.storage.set(this.construyeNombreEtiquetaJson(), this.votaciones);
    this.dataLocalService.presentToast('respuesta editada');
  }


  borrarVotacion(votacion: Encuesta) {
    this.votaciones = this.votaciones.filter(vot => vot.idvotacion !== votacion.idvotacion);
    this.storage.set(this.construyeNombreEtiquetaJson(), this.votaciones);
    this.dataLocalService.presentToast('Encuesta borrada');
  }

  async cargarVotaciones() {
    console.log('recuperare los registros de encuestas: ', this.construyeNombreEtiquetaJson());
    
    const vot = await this.storage.get(this.construyeNombreEtiquetaJson());
    if (vot) {
      this.votaciones = vot;
    }else{
      this.votaciones = [];
    }
  }

}
