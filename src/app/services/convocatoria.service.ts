import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { DataLocalService } from './data-local.service';
import { Publicacion } from '../models/publicacion.model';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from "rxjs/index";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  convocatorias: Publicacion[] = [];


  
  nombreEtiqueta = "_convocatorias";
  baseUrl: string = environment.coreServiceBaseUrl;  
  publicacionContext: string = environment.coreApiBasePublicacionOperation;

  constructor(private http: HttpClient,
              private storage: Storage,
              private dataLocalService: DataLocalService) {
  }

  
  
  save(notificacionData: FormData): Observable<ApiResponse> {
    console.log('guardarConvocatoria:'+this.baseUrl + this.publicacionContext);    
    return this.http.post<ApiResponse>(this.baseUrl + this.publicacionContext, notificacionData).pipe(share());
  }

  saveWithPDF(notificacionData: FormData): Observable<ApiResponse> {
    console.log('guardarConvocatoria:'+this.baseUrl + environment.coreApiBasePublicacionPDFOperation);    
    return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBasePublicacionPDFOperation, notificacionData).pipe(share());
  }

  update(idConvocatoria: number, convocatoriaData: any) : Observable<ApiResponse> {
    console.log('update adeudo', this.baseUrl + this.publicacionContext + environment.coreApiBaseEditOperation+  "/" + idConvocatoria);
    return this.http.patch<ApiResponse>(this.baseUrl + this.publicacionContext + environment.coreApiBaseEditOperation+  "/" + idConvocatoria, convocatoriaData).pipe(share());
  }



  getConvocatorias(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl +environment.coreApiBasePublicacionOperation + environment.coreApiGetAnunciosListOperation +"/"+idEmpresa+ "/CONVOCATORIA?page="+page+"&size="+size+"");
    return this.http.get<ApiResponse>(this.baseUrl +environment.coreApiBasePublicacionOperation + environment.coreApiGetAnunciosListOperation + '/' + idEmpresa + '/CONVOCATORIA?page=' + page + '&size=' + size + (filters ? ('&filters=' + filters):'')).pipe(share());
  }

  getFullConvocatorias(idEmpresa: number){
    console.log(this.baseUrl +environment.coreApiBasePublicacionOperation + environment.coreApiGetAnunciosListOperation +"Full/"+idEmpresa+ "/CONVOCATORIA");
    return this.http.get<ApiResponse>(this.baseUrl +environment.coreApiBasePublicacionOperation + environment.coreApiGetAnunciosListOperation + 'Full/' + idEmpresa + '/CONVOCATORIA');
  }

  borrarConvocatoria(idPublicacion: number) : Observable<ApiResponse> {
    console.log('borrarConvocatoria: ',this.baseUrl + environment.coreApiBasePublicacionOperation +environment.coreApiBaseDeleteOperation + "/" + idPublicacion );    
    return this.http.delete<ApiResponse>(this.baseUrl + environment.coreApiBasePublicacionOperation +environment.coreApiBaseDeleteOperation + "/" + idPublicacion).pipe(share());
  }

  async getConvocatoriasFromStorage(idEmpresa : number){
    console.log('getConvocatoriasFromStorage: ', idEmpresa + this.nombreEtiqueta);   
     const conn = await this.storage.get(idEmpresa + this.nombreEtiqueta)
     console.log('conn: '+conn);
     if (conn) {
       this.convocatorias = conn;
     }else{
      this.convocatorias =[];
     }
   }


 /*  guardar(convocatoria : Publicacion){
    const existe = this.convocatorias.find(con => con.id === convocatoria.id);
    if (!existe) {
      convocatoria.id = this.dataLocalService.getNumeroNegativo() * -1;
      this.convocatorias.unshift(convocatoria);
      this.storage.set(this.construyeNombreEtiqueta(), this.convocatorias);
      this.dataLocalService.presentToast('Convocatoria agregada');
    }

  } */
  /* borrar(convocatoria : Publicacion){
    this.convocatorias = this.convocatorias.filter(con => con.id !== convocatoria.id)
    this.storage.set(this.construyeNombreEtiqueta(), this.convocatorias);
    this.dataLocalService.presentToast('Convocatoria borrada');
  } */
 /*  async cargarRegistros(){
    console.log('this.construyeNombreEtiqueta(): '+this.construyeNombreEtiqueta());
    
    const conv = await this.storage.get(this.construyeNombreEtiqueta());
    if (conv) {
      //Cuando viene != null se iguala al arreglo global
      this.convocatorias = conv;
    }
  } */

}
