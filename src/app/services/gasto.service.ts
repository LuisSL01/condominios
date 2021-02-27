import { Injectable } from '@angular/core';
import { Gasto } from '../models/gasto.model';
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
export class GastoService {
  
  gastos:Gasto[]=[];

  baseUrl: string = environment.coreServiceBaseUrl;
  gastoContext: string = environment.coreApiBaseGastoOperation
  nombreEtiqueta = "_gasto";


  constructor(private storage : Storage,
              private dataLocalService : DataLocalService,
              private http: HttpClient) {}


    save(gastoData: any): Observable<ApiResponse> {
      console.log('save gastoData: ' + this.baseUrl + this.gastoContext);
      return this.http.post<ApiResponse>(this.baseUrl + this.gastoContext, gastoData).pipe(share());
    }

    saveByEmpresa(idEmpresa: number, gastoData: any): Observable<ApiResponse> {
      console.log('saveByEmpresa gastoData: ' + this.baseUrl + environment.coreApiBaseGastoByEmpresaOperation + "/" + idEmpresa);
      return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBaseGastoByEmpresaOperation + "/" + idEmpresa, gastoData).pipe(share());
    }

    delete(idGasto: number): Observable<ApiResponse> {
      console.log('borrando registro gasto: ', this.baseUrl + this.gastoContext + environment.coreApiBaseDeleteOperation + "/" + idGasto );    
      return this.http.delete<ApiResponse>(this.baseUrl + this.gastoContext + environment.coreApiBaseDeleteOperation + "/" + idGasto).pipe(share());
    }

    getAdeudos(idEmpresa: number, page: number, size: number, filters: string){
      console.log(this.baseUrl + this.gastoContext + environment.coreApiGetGastoListOperation + "/" + idEmpresa + "?page=" + page + "&size=" + size + (filters ? ('&filters=' + filters) : ''));
      return this.http.get<ApiResponse>(this.baseUrl + this.gastoContext+ environment.coreApiGetGastoListOperation + "/" + idEmpresa + "?page=" + page + "&size=" + size +(filters ? ('&filters=' + filters) : '')).pipe(share());
    }

    getAdeudosByEmpresaAndAgente(idEmpresa: number, idAgente: number){
      console.log(this.baseUrl + this.gastoContext + environment.coreApiGetGastoAgenteListOperation + "/" + idEmpresa + "/" + idAgente);
      return this.http.get<ApiResponse>(this.baseUrl + this.gastoContext + environment.coreApiGetGastoAgenteListOperation + "/" + idEmpresa + "/" + idAgente).pipe(share());
    }

    construyeNombreEtiqueta(){
      return this.nombreEtiqueta = this.dataLocalService.idempresa + "_gasto";
    }

    saveLocal(gasto: Gasto) {
      gasto.idgasto = this.dataLocalService.getNumeroRandom() * -1;
     /*  this.storage.set(this.construyeNombreEtiqueta(), this.notificacionesLocales); */
      this.dataLocalService.presentToast('Notiificacion agregada localmente');      
    }

    guardarGasto(gasto: Gasto){
      const existe = this.gastos.find( gas => gas.idgasto === gasto.idgasto);
      if(!existe){
        gasto.idgasto = this.dataLocalService.getNumeroNegativo() * -1;
        this.gastos.unshift(gasto);
        this.storage.set(this.construyeNombreEtiqueta(), this.gastos);
        this.dataLocalService.presentToast('Gasto agregado');
      }
    }

    borrarGasto(gasto: Gasto){
      this.gastos = this.gastos.filter(gas => gas.idgasto !== gasto.idgasto)
      this.storage.set(this.construyeNombreEtiqueta(),this.gastos);
      this.dataLocalService.presentToast('Gasto borrado');
    }

    async getGastosFromStorage(idEmpresa: number){
      console.log('getGastosFromStorage: ', idEmpresa + this.nombreEtiqueta); 
      const gastos = await this.storage.get(idEmpresa + this.nombreEtiqueta)
      console.log('gastos: ' + gastos);
      if(gastos){
        this.gastos = gastos;
      } else {
        this.gastos = [];
      }
    }
}
