import { Injectable, OnInit } from '@angular/core';
import { Encuesta } from '../models/votaciones.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';
import { EncuestaPregunta } from '../models/encuesta-pregunta.model';
import { EncuestaPreguntaRespuesta } from '../models/encuesta-pregunta-respuesta.model';
import { environment } from 'src/environments/environment';
import { UserData } from '../providers/user-data';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class VotacionesService{

  votaciones: Encuesta[] = [];
  

  baseUrl: string = environment.coreServiceBaseUrl;
  votacionContext: string = environment.coreApiBaseVotacionOperation;
  

  nombreEtiqueta = "_encuestas";
  constructor(public storage: Storage,
              private dataLocalService: DataLocalService,
              private userData:UserData,
              private http: HttpClient) {
     /*  this.cargarVotaciones(); */      
  }
  
  construyeNombreEtiquetaJson(){    
    return this.nombreEtiqueta = this.dataLocalService.idempresa + "_encuestas" ;
  }

    
  save(votacionData: any): Observable<ApiResponse> {
    console.log('save votacion:'+this.baseUrl + this.votacionContext);    
    return this.http.post<ApiResponse>(this.baseUrl + this.votacionContext, votacionData).pipe(share());
  } 

  saveRespuesta(idVotacion:number, respuesta: any): Observable<ApiResponse> {
    console.log('saveRespuesta:'+this.baseUrl + this.votacionContext + environment.coreApiBaseVotacionRespuestaOperation+"/"+idVotacion);    
    return this.http.post<ApiResponse>(this.baseUrl + this.votacionContext + environment.coreApiBaseVotacionRespuestaOperation+'/'+idVotacion, respuesta).pipe(share());
  }  

  editRespuesta(idVotacion:number, respuesta: any): Observable<ApiResponse> {
    console.log('saveRespuesta:'+this.baseUrl + this.votacionContext + environment.coreApiBaseVotacionRespuestaOperation+"-edit/"+idVotacion);    
    return this.http.post<ApiResponse>(this.baseUrl + this.votacionContext + environment.coreApiBaseVotacionRespuestaOperation+'-edit/'+idVotacion, respuesta).pipe(share());
  } 



  delete(idVotacion: number) : Observable<ApiResponse> {
    console.log('borrando votacion: ',this.baseUrl + this.votacionContext +environment.coreApiBaseDeleteOperation + "/" + idVotacion );    
    return this.http.delete<ApiResponse>(this.baseUrl + this.votacionContext + environment.coreApiBaseDeleteOperation + "/" + idVotacion).pipe(share());
  }

  getVotaciones(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl + this.votacionContext+ environment.coreApiGetVotacionListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):''));
    return this.http.get<ApiResponse>(this.baseUrl + this.votacionContext+ environment.coreApiGetVotacionListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):'')).pipe(share());
  }


  guardarVotacion(votacion: Encuesta) {
    const existe = this.votaciones.find(vot => vot.id === votacion.id);
    if (!existe) {
      votacion.id = this.dataLocalService.getNumeroNegativo() * -1;
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
    this.votaciones = this.votaciones.filter(vot => vot.id !== votacion.id);
    this.storage.set(this.construyeNombreEtiquetaJson(), this.votaciones);
    this.dataLocalService.presentToast('Encuesta borrada');
  }

/*   async cargarVotaciones() {
    console.log('recuperare los registros de encuestas: ', this.construyeNombreEtiquetaJson());
    
    const vot = await this.storage.get(this.construyeNombreEtiquetaJson());
    if (vot) {
      this.votaciones = vot;
    }else{
      this.votaciones = [];
    }
  } */

  async getVotacionesFromStorage(idEmpresa : number){
    console.log('getVotacionesFromStorage: ', idEmpresa + this.nombreEtiqueta);   
     const vott = await this.storage.get(idEmpresa + this.nombreEtiqueta)
     console.log('vott: '+vott);    
     if (vott) this.votaciones = vott;
     else this.votaciones =[];     
   }

}
