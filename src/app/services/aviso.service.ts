import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import {Publicacion} from '../models/publicacion.model';
import { DataLocalService } from './data-local.service';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from "rxjs/index";
import { share } from 'rxjs/operators';
import { UserData } from '../providers/user-data';
import { RespuestaPublicacion } from '../models/respuesta-publicacion.model';


@Injectable({
  providedIn: 'root'
})
export class AvisoService {

  notificaciones: Publicacion[] = [];
  notificacionesLocales: Publicacion[] = [];
  

  nombreEtiquetaJson = "";

  baseUrl: string = environment.coreServiceBaseUrl;  
  publicacionContext: string = environment.coreApiBasePublicacionOperation;

  constructor(private http: HttpClient,
              private storage: Storage,
              private dataLocalService: DataLocalService,
              private userData:UserData) {
  }

  

  construyeNombreEtiqueta(){
    return this.nombreEtiquetaJson =  this.userData.getIdEmpresa() + "_notificaciones_local";
  }

  saveLocal(anuncio: Publicacion) {
    anuncio.id = this.dataLocalService.getNumeroRandom() * -1;
    this.notificacionesLocales.unshift(anuncio);
    this.storage.set(this.construyeNombreEtiqueta(), this.notificacionesLocales);
    this.dataLocalService.presentToast('Notiificacion agregada localmente');      
  }

  getNotificaciones(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl +environment.coreApiBasePublicacionOperation + environment.coreApiGetAnunciosListOperation +"/"+idEmpresa+"/NOTIFICACION?page="+page+"&size="+size+"");
    return this.http.get<ApiResponse>(this.baseUrl +environment.coreApiBasePublicacionOperation + environment.coreApiGetAnunciosListOperation + '/' + idEmpresa + '/NOTIFICACION?page=' + page + '&size=' + size + (filters ? ('&filters=' + filters):'')).pipe(share());
  }

  async getNotificacionesFromStorage(idEmpresa : number){   
    console.log('getNotificacionesFromStorage: ', idEmpresa + "_notificaciones");   
     const not = await this.storage.get(idEmpresa + "_notificaciones")
     console.log('ann: '+not);    
     if (not) {
       this.notificaciones = not;
     }else{
       this.notificaciones =[];
     }
   }

  save(notificacionData: FormData): Observable<ApiResponse> {    
    return this.http.post<ApiResponse>(this.baseUrl + this.publicacionContext, notificacionData).pipe(share());
  }

  update(idNotificacion: number, notificacionData: any) : Observable<ApiResponse> {
    console.log('update notificacion',this.baseUrl + this.publicacionContext + environment.coreApiBaseEditOperation+  "/" + idNotificacion);    
    return this.http.patch<ApiResponse>(this.baseUrl + this.publicacionContext + environment.coreApiBaseEditOperation+  "/" + idNotificacion, notificacionData).pipe(share());
  }

  saveRespuesta(idPublicacion:number, respuesta: any): Observable<ApiResponse> {
    console.log('saveRespuesta:'+this.baseUrl + this.publicacionContext + environment.coreApiBasePublicacionRespuestaOperation+"/"+idPublicacion);
    console.log('respuesta',respuesta);
    return this.http.post<ApiResponse>(this.baseUrl + this.publicacionContext + environment.coreApiBasePublicacionRespuestaOperation+'/'+idPublicacion, respuesta).pipe(share());
  }  

  saveNotificaciones(listNotificaciones: FormData): Observable<ApiResponse> {
    console.log('guardarNotificaciones->sincronizando:'+this.baseUrl + environment.coreApiBasePublicacionesOperation);    
    return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBasePublicacionesOperation, listNotificaciones).pipe(share());
  }


  saveRespuestaAvisoLocal(avisoOriginal: Publicacion, respuestaAviso: RespuestaPublicacion) {
    console.log('guardarRespuestaAviso');
    avisoOriginal.respuestas.respuestasPublicacion.unshift(respuestaAviso);
    this.notificacionesLocales.unshift(avisoOriginal);
    this.storage.set(this.construyeNombreEtiqueta(), this.notificacionesLocales);
    this.dataLocalService.presentToast('respuesta agregada');   
  }

  deleteLocal(noti: Publicacion) {
    this.notificacionesLocales = this.notificacionesLocales.filter(not => not.id !== noti.id);
    this.storage.set(this.construyeNombreEtiqueta(), this.notificacionesLocales);
    this.dataLocalService.presentToast('Aviso borrado');
  }

  delete(idPublicacion: number) : Observable<ApiResponse> {
    console.log('borrando pub: ',this.baseUrl + environment.coreApiBasePublicacionOperation +environment.coreApiBaseDeleteOperation + "/" + idPublicacion );    
    return this.http.delete<ApiResponse>(this.baseUrl + environment.coreApiBasePublicacionOperation + environment.coreApiBaseDeleteOperation + "/" + idPublicacion).pipe(share());
  }



  async cargarNotificacionesLocales() {
    console.log('cargando mis avisos');
    const notTemp = await this.storage.get(this.construyeNombreEtiqueta());
    if (notTemp) {
      //Cuando viene != null se iguala al arreglo global
      this.notificacionesLocales = notTemp;
    }else{
      this.notificacionesLocales = [];
    }
  }


}
