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


  filterEmpresasByActividadEconomica(actividadEconomica: number) : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + this.empresaContext + environment.coreApiActividadEconomicaEmpresaOperation + "/" + actividadEconomica).pipe(share());
  }

  update(data:FormData): Observable<ApiResponse> {
    console.log('update empresa: ', this.baseUrl + this.empresaContext);    
    return this.http.patch<ApiResponse>(this.baseUrl + this.empresaContext ,data).pipe(share());    
  }




}
