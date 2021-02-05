import { Injectable } from '@angular/core';
import { AdeudoPago } from '../models/adeudo-pago.model';
import { Storage } from '@ionic/storage';
import { DataLocalService } from './data-local.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdeudoService {

  adeudos:AdeudoPago[] =[];
 

  baseUrl: string = environment.coreServiceBaseUrl;
  adeudoContext: string = environment.coreApiBaseAdeudoOperation;  
  nombreEtiqueta = "_adeudo";

  constructor(private storage:Storage,
              private dataLocalService:DataLocalService,              
              private http: HttpClient) {                                 
                 
              }


  save(adeudoData: any): Observable<ApiResponse> {
    console.log('save adeudoData:'+this.baseUrl + this.adeudoContext);
    return this.http.post<ApiResponse>(this.baseUrl + this.adeudoContext, adeudoData).pipe(share());
  }
   
  saveByEmpresa(idEmpresa:number, adeudoData: any): Observable<ApiResponse> {
    console.log('save saveByEmpresa:'+this.baseUrl + environment.coreApiBaseAdeudoByEmpresaOperation+"/"+idEmpresa);
    return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBaseAdeudoByEmpresaOperation+"/"+idEmpresa, adeudoData).pipe(share());
  } 
  
  delete(idAdeudo: number) : Observable<ApiResponse> {
    console.log('borrando registro: ',this.baseUrl + this.adeudoContext +environment.coreApiBaseDeleteOperation + "/" + idAdeudo );    
    return this.http.delete<ApiResponse>(this.baseUrl + this.adeudoContext + environment.coreApiBaseDeleteOperation + "/" + idAdeudo).pipe(share());
  }

  getAdeudos(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl + this.adeudoContext+ environment.coreApiGetAdeudoListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):''));
    return this.http.get<ApiResponse>(this.baseUrl + this.adeudoContext+ environment.coreApiGetAdeudoListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):'')).pipe(share());
  }

  
  getAdeudosByEmpresaAndAgente(idEmpresa: number, idAgente:number){
    console.log(this.baseUrl + this.adeudoContext+ environment.coreApiGetAdeudoAgenteListOperation +"/"+idEmpresa+"/"+idAgente);
    return this.http.get<ApiResponse>(this.baseUrl + this.adeudoContext+ environment.coreApiGetAdeudoAgenteListOperation +"/"+idEmpresa+"/"+idAgente).pipe(share());
  }
            

  construyeNombreEtiqueta(){
    return this.nombreEtiqueta = this.dataLocalService.idempresa+'_adeudo';
  }            

  guardarAdeudo(adeudo: AdeudoPago){
    const existe = this.adeudos.find(add => add.id === adeudo.id);
    if(! existe){
      adeudo.id = this.dataLocalService.getNumeroNegativo() * -1;
      this.adeudos.unshift(adeudo);
      this.storage.set(this.construyeNombreEtiqueta(), this.adeudos);
      this.dataLocalService.presentToast('Adeudo agregado');
    }

  }
  borrarAdeudo(adeudo: AdeudoPago){
    this.adeudos = this.adeudos.filter(add => add.id !== adeudo.id);
    this.storage.set(this.construyeNombreEtiqueta(), this.adeudos);
    this.dataLocalService.presentToast('Adeudo borrado');

  }

  async getAdeudosFromStorage(idEmpresa : number){
    console.log('getAdeudosFromStorage: ', idEmpresa + this.nombreEtiqueta);   
     const arr = await this.storage.get(idEmpresa + this.nombreEtiqueta)
     console.log('arr: '+arr);
     if (arr) {
       this.adeudos = arr;
     }else{
      this.adeudos =[];
     }
   }

}
