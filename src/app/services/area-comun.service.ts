import { Injectable } from '@angular/core';
import { AreaComun } from '../models/area-comun.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { UserData } from '../providers/user-data';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class AreaComunService {

  areasComunes:AreaComun[]=[];
  areasComunesLocal:AreaComun[]=[];
  nombreEtiquetaJson = "";

  baseUrl: string = environment.coreServiceBaseUrl;
  areaComunContext: string = environment.coreApiBaseAreaComunOperation;  
  nombreEtiqueta = "_areas-comunes";

  constructor(private dataLocalService : DataLocalService,
              private storage:Storage, 
              private userData:UserData,
              private http: HttpClient) {              

   }

   getNombreEtiquetaLocal():string{
     return this.userData.getIdEmpresa() + this.nombreEtiqueta +"_local"
   }
   
  save(areaComunData: FormData): Observable<ApiResponse> {
    console.log('save area comun:'+this.baseUrl + this.areaComunContext);    
    return this.http.post<ApiResponse>(this.baseUrl + this.areaComunContext, areaComunData).pipe(share());
  } 

  saveReserva(areaComunReservaData: any): Observable<ApiResponse> {
      
    console.log('saveReserva:'+this.baseUrl + environment.coreApiBaseAreaComunReservaOperation);    
    return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBaseAreaComunReservaOperation, areaComunReservaData).pipe(share());
  } 

  delete(idAreaComun: number) : Observable<ApiResponse> {
    console.log('borrando pub: ',this.baseUrl + this.areaComunContext +environment.coreApiBaseDeleteOperation + "/" + idAreaComun );    
    return this.http.delete<ApiResponse>(this.baseUrl + this.areaComunContext + environment.coreApiBaseDeleteOperation + "/" + idAreaComun).pipe(share());
  }

  deleteReserva(idReserva: number) : Observable<ApiResponse> {
    console.log('borrando pub: ',this.baseUrl + environment.coreApiBaseAreaComunReservaOperation +environment.coreApiBaseDeleteOperation + "/" + idReserva );    
    return this.http.delete<ApiResponse>(this.baseUrl + environment.coreApiBaseAreaComunReservaOperation + environment.coreApiBaseDeleteOperation + "/" + idReserva).pipe(share());
  }

  updateStatusReserva(data:FormData): Observable<ApiResponse> {
    console.log('updateStatusReserva: ', this.baseUrl + environment.coreApiBaseAreaComunReservaOperation + '/updateStatus' );
    return this.http.patch<ApiResponse>(this.baseUrl + environment.coreApiBaseAreaComunReservaOperation + '/updateStatus' ,data).pipe(share());    
  }
  
  saveAreasComunes(listAreasComunes: FormData): Observable<ApiResponse> {
    console.log('guardarNotificaciones->sincronizando:'+this.baseUrl + environment.coreApiBaseAreasComunesOperation);    
    return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBaseAreasComunesOperation, listAreasComunes).pipe(share());
  }
   
  getAreasComunes(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl + this.areaComunContext+ environment.coreApiGetAreaComunListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):''));
    return this.http.get<ApiResponse>(this.baseUrl + this.areaComunContext+ environment.coreApiGetAreaComunListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):'')).pipe(share());
  }

  getAreaComunReservas(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl + environment.coreApiBaseAreaComunReservaOperation + environment.coreApiGetAreaComunListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):''));
    return this.http.get<ApiResponse>(this.baseUrl +  environment.coreApiBaseAreaComunReservaOperation  + environment.coreApiGetAreaComunListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):'')).pipe(share());
  }

  getAllAreasComunesByEmpresa(idEmpresa: number){
    console.log('getAllAreasComunesByEmpresa: '+ this.baseUrl + this.areaComunContext+'/listByEmpresa'+"/"+idEmpresa);
    return this.http.get<ApiResponse>(this.baseUrl + this.areaComunContext+'/listByEmpresa'+"/"+idEmpresa).pipe(share());
  }
   
   
  saveLocal(areaComun : AreaComun){    
    areaComun.id = this.dataLocalService.getNumeroRandom() * -1;
    this.areasComunesLocal.unshift(areaComun);
    this.storage.set(this.getNombreEtiquetaLocal() , this.areasComunesLocal);
    this.dataLocalService.presentToast('Área agregada');    
 }

  deleteLocal(areaComun : AreaComun) {
       this.areasComunesLocal = this.areasComunesLocal.filter(are => are.id !== areaComun.id)
       this.storage.set(this.getNombreEtiquetaLocal(),this.areasComunesLocal);
       this.dataLocalService.presentToast('Área borrada');
  }

  async getAreasComunesFromStorage(idEmpresa : number){
    console.log('getAreasComunesFromStorage: ', idEmpresa + this.nombreEtiqueta);   
     const arr = await this.storage.get(idEmpresa + this.nombreEtiqueta)
     console.log('arr: '+arr);    
     if (arr) {
       this.areasComunes = arr;
     }else{
      this.areasComunes =[];
     }
   }

   async getAreasComunesLocalFromStorage(idEmpresa : number){
     console.log('getAreasComunesLocalFromStorage: '+ this.getNombreEtiquetaLocal());     
     const areas = await this.storage.get(this.getNombreEtiquetaLocal());
     console.log('areas');
     
     if(areas){
       this.areasComunesLocal = areas;
     }else{
      this.areasComunesLocal = [];
     }
   }
}
