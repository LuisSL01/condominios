import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http:HttpClient) { }
  baseUrl: string = environment.coreServiceBaseUrl;
  empresaContext: string = environment.coreApiBaseEmpresaOperation;



  registerEmpresa(empresaData: any) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + this.empresaContext+"-app", empresaData).pipe(share());
  }

  filterEmpresasByActividadEconomica(actividadEconomica: number) : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + this.empresaContext + environment.coreApiActividadEconomicaEmpresaOperation + "/" + actividadEconomica).pipe(share());
  }

  getEmpresaById(idEmpresa: number) : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + this.empresaContext + "/" + idEmpresa).pipe(share());
  }

  saveReglamentoPDF(reglamentoData: any, idEmpresa: number): Observable<ApiResponse> {
    console.log('saveReglamentoPDF: ' + this.baseUrl + this.empresaContext + "/" + idEmpresa + "/reglamento");
    return this.http.post<ApiResponse>(this.baseUrl + this.empresaContext + "/" + idEmpresa + "/reglamento", reglamentoData).pipe(share());
  }

  saveFileConstruccion(formatoData: any, idEmpresa: number, tipo:string): Observable<ApiResponse> {
    console.log('saveFormatoConstruccionPDF: ' + this.baseUrl + this.empresaContext + "/" + idEmpresa + "/"+tipo +"/formatoConstruccion");
    return this.http.post<ApiResponse>(this.baseUrl + this.empresaContext + "/" + idEmpresa + "/"+tipo + "/formatoConstruccion", formatoData).pipe(share());
  }

  update(data:FormData): Observable<ApiResponse> {
    console.log('update empresa: ', this.baseUrl + this.empresaContext);    
    return this.http.patch<ApiResponse>(this.baseUrl + this.empresaContext ,data).pipe(share());    
  }

  updateEmpresa(id: number, empresaData: any): Observable<ApiResponse> {
    console.log('updateEmpresa', this.baseUrl + this.empresaContext + '/edit' + id, empresaData);
    return this.http.patch<ApiResponse>(this.baseUrl + this.empresaContext + '/edit' + id, empresaData).pipe(share());
  }

  countUsers(idEmpresa:number){
    console.log('countUsers:'+this.baseUrl + environment.coreApiBaseAgenteEmpresaOperation + environment.coreApiBaseAgenteEmpresaCountOperation+"/"+idEmpresa);
    return this.http.get<ApiResponse>(this.baseUrl + environment.coreApiBaseAgenteEmpresaOperation + environment.coreApiBaseAgenteEmpresaCountOperation+"/"+idEmpresa).pipe(share());

  }




}
