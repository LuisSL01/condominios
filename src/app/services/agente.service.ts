import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgenteService {


  baseUrl: string = environment.coreServiceBaseUrl;
  baseUrlAuth: string = environment.authServiceBaseUrl;
  agenteContext: string = environment.coreApiBaseAgenteOperation;  
  
  constructor(private http:HttpClient) { }

  registerUsuario(userData: any): Observable<ApiResponse> {
    console.log('registerUsuario:'+this.baseUrlAuth + environment.authApiRegisterAgenteOperation);
    return this.http.post<ApiResponse>(this.baseUrlAuth + environment.authApiRegisterAgenteOperation, userData).pipe(share());
  }

  addAgenteToEmpresa(userData: FormData): Observable<ApiResponse> {
    console.log('addAgenteToEmpresa:'+this.baseUrl + environment.coreApiBaseAgenteOperation + environment.coreApiBaseAddEmpresaOperation);
    return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBaseAgenteOperation + environment.coreApiBaseAddEmpresaOperation, userData).pipe(share());
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + this.agenteContext + '/' + id).pipe(share());    
  }

  updateStatus(data:FormData): Observable<ApiResponse> {
    console.log('updateStatus: ', this.baseUrl + this.agenteContext+':'+ environment.coreApiUpdateStatusAgenteOperation );    
    return this.http.patch<ApiResponse>(this.baseUrl + this.agenteContext+':'+ environment.coreApiUpdateStatusAgenteOperation ,data).pipe(share());    
  }


  getAgentes(idEmpresa: number, page: number, size: number, filters: string): Observable<any> {
    console.log("getAgentes: ",this.baseUrl +this.agenteContext +environment.coreApiBaseAgenteOperationList+ '/' + idEmpresa + '?page=' + page + '&size=' + size + (filters ? ('&filters=' + filters) : ''));    
    return this.http.get<any>(this.baseUrl +this.agenteContext +environment.coreApiBaseAgenteOperationList+ '/' + idEmpresa + '?page=' + page + '&size=' + size + (filters ? ('&filters=' + filters) : '')).pipe(share());
  }

  getManzanas(idEmpresa:number){
    console.log("getManzanas: ",this.baseUrl +this.agenteContext + ':listManzanas/' + idEmpresa);    
    return this.http.get<any>(this.baseUrl +this.agenteContext + ':listManzanas/' + idEmpresa).pipe(share()); 
  }

  getAllAgentesByEmpresa(idEmpresa:number): Observable<any> {
    console.log("getAllAgentesByEmpresa: ",this.baseUrl +this.agenteContext + 'list/' + idEmpresa);    
    return this.http.get<any>(this.baseUrl +this.agenteContext + 'list/' + idEmpresa).pipe(share());
  }




}
