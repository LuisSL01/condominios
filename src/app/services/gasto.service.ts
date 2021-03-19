import { Injectable } from '@angular/core';
import { Gasto } from '../models/gasto.model';
import { Storage } from '@ionic/storage';
import { DataLocalService } from './data-local.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/index';
import { environment } from 'src/environments/environment';
import { UserData } from '../providers/user-data';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  
  gastos:Gasto[] = [];
  gastosLocales: Gasto[] = [];

  baseUrl: string = environment.coreServiceBaseUrl;
  gastoContext: string = environment.coreApiBaseGastoOperation
  nombreEtiquetaJson = "";


  constructor(private storage : Storage,
              private dataLocalService : DataLocalService,
              private http: HttpClient,
              private userData: UserData) {}

  construyeNombreEtiqueta(){
    return this.nombreEtiquetaJson =  this.userData.getIdEmpresa()  + "_gastos_local";
  }

  saveLocal(gasto: Gasto) {
    gasto.id = this.dataLocalService.getNumeroRandom() * -1;
    this.gastosLocales.unshift(gasto);
    this.storage.set(this.construyeNombreEtiqueta(), this.gastosLocales);
    this.dataLocalService.presentToast('Gasto agregado localmente');      
  }
    
  getGastos(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl + this.gastoContext + environment.coreApiGetGastoListOperation + "/" + idEmpresa + "?page=" + page + "&size=" + size + (filters ? ('&filters=' + filters) : ''));
    return this.http.get<ApiResponse>(this.baseUrl + this.gastoContext+ environment.coreApiGetGastoListOperation + "/" + idEmpresa + "?page=" + page + "&size=" + size +(filters ? ('&filters=' + filters) : '')).pipe(share());
  }

  getReportePDF(id: number){
    console.log(this.baseUrl + this.gastoContext + ":getPdf/" + id);
    return this.http.get<ApiResponse>(this.baseUrl + this.gastoContext + ":getPdf/" + id).pipe(share());
  }

  async getGastosFromStorage(idEmpresa: number){
    console.log('getGastosFromStorage: ', idEmpresa + "_gastos"); 
    const gastos = await this.storage.get(idEmpresa + "_gastos")
    console.log('gastos: ' + gastos);
    if(gastos){
      this.gastos = gastos;
    } else {
      this.gastos = [];
    }
  }

  save(gastoData: any): Observable<ApiResponse> {
    console.log('save gastoData: ' + this.baseUrl + this.gastoContext);
    return this.http.post<ApiResponse>(this.baseUrl + this.gastoContext, gastoData).pipe(share());
  }


  
  update(idGasto: number, gastoData: any) : Observable<ApiResponse> {
    console.log('update gasto', this.baseUrl + this.gastoContext + environment.coreApiBaseEditOperation+  "/" + idGasto);
    return this.http.patch<ApiResponse>(this.baseUrl+this.gastoContext+environment.coreApiBaseEditOperation+  "/" + idGasto, gastoData).pipe(share());
  }

  deleteLocal(gasto: Gasto){
    this.gastosLocales = this.gastosLocales.filter(gas => gas.id !== gasto.id)
    this.storage.set(this.construyeNombreEtiqueta(), this.gastosLocales);
    this.dataLocalService.presentToast('Gasto borrado');
  }
   
  delete(idGasto: number): Observable<ApiResponse> {
    console.log('borrando registro gasto: ', this.baseUrl + this.gastoContext + environment.coreApiBaseDeleteOperation + "/" + idGasto );    
    return this.http.delete<ApiResponse>(this.baseUrl + this.gastoContext + environment.coreApiBaseDeleteOperation + "/" + idGasto).pipe(share());
  }

  guardarGasto(gasto: Gasto){
    const existe = this.gastos.find( gas => gas.id === gasto.id);
    if(!existe){
      gasto.id = this.dataLocalService.getNumeroNegativo() * -1;
      this.gastos.unshift(gasto);
      this.storage.set(this.construyeNombreEtiqueta(), this.gastos);
      this.dataLocalService.presentToast('Gasto agregado');
    }
  }

  async cargarGastosLocales() {
    console.log('cargando mis gastos');
    const notTemp = await this.storage.get(this.construyeNombreEtiqueta());
    if (notTemp) {
      //Cuando viene != null se iguala al arreglo global
      this.gastosLocales = notTemp;
    }else{
      this.gastosLocales = [];
    }
  }

}
