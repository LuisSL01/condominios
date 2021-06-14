import { EventEmitter, Injectable } from '@angular/core';
import { AdeudoPago } from '../models/adeudo-pago.model';
import { Storage } from '@ionic/storage';
import { DataLocalService } from './data-local.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  conceptoAdeudoContext: string = environment.coreApiBaseConceptoAdeudoOperation;  
  


  nombreEtiqueta = "_adeudo";
  adeudoListener = new EventEmitter<AdeudoPago>();
  
  constructor(private storage:Storage,
              private dataLocalService:DataLocalService,              
              private http: HttpClient) {                                 
                 
              }
              
  removeElement(elm:AdeudoPago){
    this.adeudoListener.emit(elm);
  }              


  save(adeudoData: any): Observable<ApiResponse> {
    console.log('save adeudoData:'+this.baseUrl + this.adeudoContext);
    return this.http.post<ApiResponse>(this.baseUrl + this.adeudoContext, adeudoData).pipe(share());
  }

  update(idAdeudo: number, adeudoData: any) : Observable<ApiResponse> {
    console.log('update adeudo', this.baseUrl + this.adeudoContext + environment.coreApiBaseEditOperation+  "/" + idAdeudo);
    return this.http.patch<ApiResponse>(this.baseUrl + this.adeudoContext + environment.coreApiBaseEditOperation+  "/" + idAdeudo, adeudoData).pipe(share());
  }
   
  saveByEmpresa(idEmpresa:number, adeudoData: any): Observable<ApiResponse> {
    console.log('save saveByEmpresa:'+this.baseUrl + environment.coreApiBaseAdeudoByEmpresaOperation+"/"+idEmpresa);
    return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBaseAdeudoByEmpresaOperation+"/"+idEmpresa, adeudoData).pipe(share());
  } 

  saveByTorre(idTorre:number, adeudoData: any): Observable<ApiResponse> {
    console.log('save saveByEmpresa:'+this.baseUrl + environment.coreApiBaseAdeudoByTorreOperation+"/"+idTorre);
    return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBaseAdeudoByTorreOperation+"/"+idTorre, adeudoData).pipe(share());
  } 
  
  delete(idAdeudo: number) : Observable<ApiResponse> {
    console.log('borrando registro: ',this.baseUrl + this.adeudoContext +environment.coreApiBaseDeleteOperation + "/" + idAdeudo );    
    return this.http.delete<ApiResponse>(this.baseUrl + this.adeudoContext + environment.coreApiBaseDeleteOperation + "/" + idAdeudo).pipe(share());
  }

  getAdeudos(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl + this.adeudoContext+ environment.coreApiGetAdeudoListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):''));
    return this.http.get<ApiResponse>(this.baseUrl + this.adeudoContext+ environment.coreApiGetAdeudoListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):'')).pipe(share());
  }


  
  getAdeudosPorAgente(idEmpresa: number, idAgente:number, page: number, size: number, filters: string){
    console.log(this.baseUrl + this.adeudoContext+":listByAgente/"+idEmpresa+"/"+idAgente+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):''));
    return this.http.get<ApiResponse>(this.baseUrl + this.adeudoContext+":listByAgente/"+idEmpresa+"/"+idAgente+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):'')).pipe(share());
  }

  getAdeudosPorDepartamento(idEmpresa: number, idDepartamento:number, page: number, size: number, filters: string){
    console.log(this.baseUrl + this.adeudoContext+":listByDepartamento/"+idEmpresa+"/"+idDepartamento+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):''));
    return this.http.get<ApiResponse>(this.baseUrl + this.adeudoContext+":listByDepartamento/"+idEmpresa+"/"+idDepartamento+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):'')).pipe(share());
  }

  
  getAdeudosByEmpresaAndAgente(idEmpresa: number, idAgente:number){
    console.log(this.baseUrl + this.adeudoContext+ environment.coreApiGetAdeudoAgenteListOperation +"/"+idEmpresa+"/"+idAgente);
    return this.http.get<ApiResponse>(this.baseUrl + this.adeudoContext+ environment.coreApiGetAdeudoAgenteListOperation +"/"+idEmpresa+"/"+idAgente).pipe(share());
  }

  getAdeudosByEmpresaAndDepartamento(idEmpresa: number, idDepartamento:number){
    console.log(this.baseUrl + this.adeudoContext+ environment.coreApiGetAdeudoDepartamentoListOperation +"/"+idEmpresa+"/"+idDepartamento);
    return this.http.get<ApiResponse>(this.baseUrl + this.adeudoContext+ environment.coreApiGetAdeudoDepartamentoListOperation +"/"+idEmpresa+"/"+idDepartamento).pipe(share());
  }

/*Concepto adeudos */

  getConceptoAdeudoAllPorEmpresa(idEmpresa: number){
    console.log(this.baseUrl+this.conceptoAdeudoContext+ environment.coreApiBaseConceptoAdeudoListOperation+"All/"+idEmpresa);
    return this.http.get<ApiResponse>(this.baseUrl+this.conceptoAdeudoContext+environment.coreApiBaseConceptoAdeudoListOperation+"All/"+idEmpresa).pipe(share());
  }

  saveConceptoAdeudo(conceptoAdeudoData: any): Observable<ApiResponse> {
    console.log('saveConceptoAdeudo:'+this.baseUrl + this.conceptoAdeudoContext);
    return this.http.post<ApiResponse>(this.baseUrl + this.conceptoAdeudoContext, conceptoAdeudoData).pipe(share());
  }

  updateConceptoAdeudo(idConceptoAdeudo: number, conceptoAdeudoData: any) : Observable<ApiResponse> {
    console.log('updateConceptoAdeudo', this.baseUrl + this.conceptoAdeudoContext + environment.coreApiBaseEditOperation+  "/" + idConceptoAdeudo);
    return this.http.patch<ApiResponse>(this.baseUrl+this.conceptoAdeudoContext+environment.coreApiBaseEditOperation+  "/" + idConceptoAdeudo, conceptoAdeudoData).pipe(share());
  }

  deleteConceptoAdeudo(idPublicidad: number): Observable<ApiResponse> {
    console.log('deleteConceptoAdeudo ', this.baseUrl + this.conceptoAdeudoContext + environment.coreApiBaseDeleteOperation + "/" + idPublicidad );
    return this.http.delete<ApiResponse>(this.baseUrl + this.conceptoAdeudoContext + environment.coreApiBaseDeleteOperation + "/" + idPublicidad).pipe(share());
  }

  uploadPlantilla(formData: any, idEmpresa: number, idAgente:number): Observable<ApiResponse> {
    console.log('saveReglamentoPDF: ' + this.baseUrl + this.adeudoContext + "/plantilla/" + idEmpresa+"/agente/"+idAgente);
    return this.http.post<ApiResponse>(this.baseUrl + this.adeudoContext + "/plantilla/" + idEmpresa+"/agente/"+idAgente, formData).pipe(share());
  }

  getPlantila(): Observable<Blob> {
    const headers = new HttpHeaders({'Content-Type': 'application/json', responseType: 'blob'});
    console.log(this.baseUrl + this.adeudoContext + '/getPlantilla');
        
    return this.http.get<Blob>(this.baseUrl + this.adeudoContext + '/getPlantilla', {
        headers: headers,
        responseType: 'blob' as 'json'
      });
  }

/*Concepto adeudo */
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
