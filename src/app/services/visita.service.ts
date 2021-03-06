import { EventEmitter, Injectable } from '@angular/core';
import { Visita } from '../models/visita.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { UserData } from '../providers/user-data';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/index'

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  visitas: Visita[] = [];
  nombreEtiquetaJson = "visitas";

  baseUrl: string = environment.coreServiceBaseUrl;
  visitaContext: string = environment.coreApiBaseVisitaOperation;  
  nombreEtiqueta = "_visitas";

  visitaListener = new EventEmitter<Visita>();

  constructor(private dataLocalService: DataLocalService,
              private storage: Storage,              
              private http: HttpClient) {
    
    /* this.cargarVisitas(); */

  }

                
  removeElement(elm:Visita){
    this.visitaListener.emit(elm);
  }

  construyeNombreEtiqueta() {
    return this.nombreEtiquetaJson = "_visitas";
  }

  save(visitaData: any): Observable<ApiResponse> {
    console.log('save visita:'+this.baseUrl + this.visitaContext);    
    return this.http.post<ApiResponse>(this.baseUrl + this.visitaContext, visitaData).pipe(share());
  }

  update(idVisita: number, visita: any) : Observable<ApiResponse> {
    console.log('update visita', this.baseUrl + this.visitaContext + environment.coreApiBaseEditOperation+  "/" + idVisita);    
    return this.http.patch<ApiResponse>(this.baseUrl + this.visitaContext + environment.coreApiBaseEditOperation+  "/" + idVisita, visita).pipe(share());
  } 

  delete(idVisita: number) : Observable<ApiResponse> {
    console.log('borrando visita: ',this.baseUrl + this.visitaContext +environment.coreApiBaseDeleteOperation + "/" + idVisita );    
    return this.http.delete<ApiResponse>(this.baseUrl + this.visitaContext + environment.coreApiBaseDeleteOperation + "/" + idVisita).pipe(share());
  }

  getVisitas(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl + this.visitaContext+ environment.coreApiGetVisitaListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):''));
    return this.http.get<ApiResponse>(this.baseUrl + this.visitaContext+ environment.coreApiGetVisitaListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):'')).pipe(share());
  }

  getVisitasPorAgente(idEmpresa: number, idAgente:number, page: number, size: number, filters: string){
    console.log(this.baseUrl+this.visitaContext+":listByAgente/"+idEmpresa+"/"+idAgente+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):''));
    return this.http.get<ApiResponse>(this.baseUrl+this.visitaContext+":listByAgente/"+idEmpresa+"/"+idAgente+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):'')).pipe(share());
  }

  getVisitaByIdAndUUID(id:string, uuid:string){
    console.log('getVisitaByIdAndUUID');    
    console.log(this.baseUrl + this.visitaContext+ environment.coreApiGetVisitaByIdAndUUIDOperation +"/"+id+"/"+uuid);
    return this.http.get<ApiResponse>(this.baseUrl + this.visitaContext+ environment.coreApiGetVisitaByIdAndUUIDOperation +"/"+id+"/"+uuid).pipe(share());
  }



  guardarVisita(visita: Visita) {
    const existe = this.visitas.find(vis => vis.id === visita.id);
    if (!existe) {
      visita.id = this.dataLocalService.getNumeroNegativo() * -1;
      this.visitas.unshift(visita);
      this.storage.set(this.construyeNombreEtiqueta(), this.visitas);
      this.dataLocalService.presentToast('Visita agregada');
    }
  }

  borrarVisita(visita: Visita) {
    this.visitas = this.visitas.filter(vis => vis.id !== visita.id)
    this.storage.set(this.construyeNombreEtiqueta(), this.visitas);
    this.dataLocalService.presentToast('Visita borrada');
  }

/*Asi tendría que ser par que al hora de borrar una visita se acturlice la vista 
  //borrarVisita(visita: Visita) {
    // se obtiene el índice del objeto filtrando por su id
    //let index = this.visitas.findIndex(vis => vis.idvisita == visita.idvisita);
    // se elimina ese elemento del arreglo orignal y la vista
    // se actualiza
   // this.visitas.slice(index,1);
   // this.storage.set(this.construyeNombreEtiqueta(), this.visitas);
   // this.dataLocalService.presentToast('Visita borrada');
   }*/

  async cargarVisitas() {
    const visitas = await this.storage.get(this.construyeNombreEtiqueta());
    if (visitas) {
      this.visitas = visitas;
    }
  }

  async getVisitasFromStorage(idEmpresa : number){
    console.log('getVisitasFromStorage: ', idEmpresa + this.nombreEtiqueta);   
     const viss = await this.storage.get(idEmpresa + this.nombreEtiqueta)
     console.log('viss: '+viss);    
     if (viss) this.visitas = viss;
     else this.visitas =[];
   }
}
