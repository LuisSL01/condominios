import { Injectable } from '@angular/core';

import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';
import { Publicacion } from '../models/publicacion.model';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from "rxjs/index";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ResolucionService {

  resoluciones: Publicacion[] = [];

  
  nombreEtiqueta = "_resoluciones";
  baseUrl: string = environment.coreServiceBaseUrl;  
  publicacionContext: string = environment.coreApiBasePublicacionOperation;


  constructor(
    private http: HttpClient,
    private storage: Storage,
    private dataLocalService: DataLocalService) {
      console.log('en el constrictor de data local resolucion service');
      /* this.cargarRegistros(); */
  }

  construyeNombreEtiqueta() {
    return this.nombreEtiqueta = this.dataLocalService.idempresa + "_resoluciones";
  }


  save(notificacionData: FormData): Observable<ApiResponse> {
    console.log('guardarResolucion:'+this.baseUrl + this.publicacionContext);    
    return this.http.post<ApiResponse>(this.baseUrl + this.publicacionContext, notificacionData).pipe(share());
  }

  getResoluciones(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl +environment.coreApiBasePublicacionOperation + environment.coreApiGetAnunciosListOperation +"/"+idEmpresa+ "/RESOLUCION?page="+page+"&size="+size+"");
    return this.http.get<ApiResponse>(this.baseUrl +environment.coreApiBasePublicacionOperation + environment.coreApiGetAnunciosListOperation + '/' + idEmpresa + '/RESOLUCION?page=' + page + '&size=' + size + (filters ? ('&filters=' + filters):'')).pipe(share());
  }

  borrarResolucion(idPublicacion: number) : Observable<ApiResponse> {
    console.log('borrando resolucion: ',this.baseUrl + environment.coreApiBasePublicacionOperation +environment.coreApiBaseDeleteOperation + "/" + idPublicacion );    
    return this.http.delete<ApiResponse>(this.baseUrl + environment.coreApiBasePublicacionOperation +environment.coreApiBaseDeleteOperation + "/" + idPublicacion).pipe(share());
  }

  async getResolucionesFromStorage(idEmpresa : number){
    console.log('getResolucionesFromStorage: ', idEmpresa + this.nombreEtiqueta);   
     const ress = await this.storage.get(idEmpresa + this.nombreEtiqueta)
     console.log('ress: '+ress);
     if (ress) {
       this.resoluciones = ress;
     }else{
      this.resoluciones =[];
     }
   }




  guardar(resolucion: Publicacion) {
    const existe = this.resoluciones.find(res => res.id === resolucion.id);
    if (!existe) {
      resolucion.id = this.dataLocalService.getNumeroNegativo() * -1;
      this.resoluciones.unshift(resolucion);
      this.storage.set(this.construyeNombreEtiqueta(), this.resoluciones);
      this.dataLocalService.presentToast('Resolución agregada');
    }

  }

  borrar(resolucion: Publicacion) {
    this.resoluciones = this.resoluciones.filter(res => res.id !== resolucion.id)
    this.storage.set(this.construyeNombreEtiqueta(), this.resoluciones);
    this.dataLocalService.presentToast('Resolución borrada');
  }



  

}
