import { Injectable } from '@angular/core';
import { BitacoraVisita } from '../models/bitacora-visitas.model';
import { Storage } from '@ionic/storage';
import { DataLocalService } from './data-local.service';
import { environment } from 'src/environments/environment';
import { UserData } from '../providers/user-data';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class BitacoraVisitaService {

  bitacoraVisitas: BitacoraVisita[]=[];
  nombreEtiquetaJson ="bitacoraVisitas";


  baseUrl: string = environment.coreServiceBaseUrl;
  bitacoraVisitaContext: string = environment.coreApiBaseBitacoraVisitaOperation;  
  nombreEtiqueta = "_bitacora-visita";

  constructor(private storage:Storage ,
              private dataLocalService:DataLocalService,
              private userData:UserData,
              private http: HttpClient) {
   }

   save(bitacoraVisitaData: FormData): Observable<ApiResponse> {
    console.log('save bitacora-comun:'+this.baseUrl + this.bitacoraVisitaContext);    
    return this.http.post<ApiResponse>(this.baseUrl + this.bitacoraVisitaContext, bitacoraVisitaData).pipe(share());
  } 
  
  delete(idBitacoraVisita: number) : Observable<ApiResponse> {
    console.log('borrando registro: ',this.baseUrl + this.bitacoraVisitaContext +environment.coreApiBaseDeleteOperation + "/" + idBitacoraVisita );    
    return this.http.delete<ApiResponse>(this.baseUrl + this.bitacoraVisitaContext + environment.coreApiBaseDeleteOperation + "/" + idBitacoraVisita).pipe(share());
  }

  getBitacoraVisitas(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl + this.bitacoraVisitaContext+ environment.coreApiGetAreaComunListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):''));
    return this.http.get<ApiResponse>(this.baseUrl + this.bitacoraVisitaContext+ environment.coreApiGetAreaComunListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):'')).pipe(share());
  }

   public construyeNombreEtiqueta(){
      console.log('construyeNombreEtiqueta');       
      return this.nombreEtiquetaJson = this.dataLocalService.idempresa+"_bitacoraVisitas";
   }

   guardar(bitacoraVisita:BitacoraVisita){
    const existe = this.bitacoraVisitas.find(bit => bit.id === bitacoraVisita.id);
    if(! existe){
      bitacoraVisita.id = this.dataLocalService.getNumeroNegativo() * -1;
      this.bitacoraVisitas.unshift(bitacoraVisita);
      this.storage.set(this.construyeNombreEtiqueta(), this.bitacoraVisitas);      
      this.dataLocalService.presentToast('Registro de visita agregada');
    }
   }

   borrar(bitacoraVisita:BitacoraVisita){
    this.bitacoraVisitas = this.bitacoraVisitas.filter(bit => bit.id !== bitacoraVisita.id);
    this.storage.set(this.construyeNombreEtiqueta(), this.bitacoraVisitas);      
    this.dataLocalService.presentToast('Registro de visita borrada');
   }

   async cargarBitacoraVisitas(){
    console.log('cargarBitacoraVisitas:'+this.construyeNombreEtiqueta());    
    const bit = await this.storage.get(this.construyeNombreEtiqueta());
    if(bit){
      this.bitacoraVisitas = bit;
    }
  }

  async getBitacoraVisitasFromStorage(idEmpresa : number){
    console.log('getBitacoraVisitasFromStorage: ', idEmpresa + this.nombreEtiqueta);   
     const arr = await this.storage.get(idEmpresa + this.nombreEtiqueta)
     console.log('arr: '+arr);
     if (arr) {
       this.bitacoraVisitas = arr;
     }else{
      this.bitacoraVisitas =[];
     }
   }
}
