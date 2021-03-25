import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  baseUrl: string = environment.coreServiceBaseUrl;
  departamentoContext: string = environment.coreApiBaseDepartamentoOperation;

  constructor(private http: HttpClient) { }

  save(torreData: any): Observable<ApiResponse> {
    console.log('save:'+this.baseUrl + this.departamentoContext);
    return this.http.post<ApiResponse>(this.baseUrl + this.departamentoContext, torreData).pipe(share());
  }

  getDepartamentosPorEmpresa(idEmpresa: number){
    console.log(this.baseUrl+this.departamentoContext+"/listByEmpresa/"+idEmpresa);
    return this.http.get<ApiResponse>(this.baseUrl+this.departamentoContext+"/listByEmpresa/"+idEmpresa).pipe(share());
  }

  getDepartamentosPorTorre(idTorre: number){
    console.log(this.baseUrl+this.departamentoContext+"/listByTorre/"+idTorre);
    return this.http.get<ApiResponse>(this.baseUrl+this.departamentoContext+"/listByTorre/"+idTorre).pipe(share());
  }


  getDepartamentos(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl + this.departamentoContext+ environment.coreApiGetDepartamentoListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):''));
    return this.http.get<ApiResponse>(this.baseUrl + this.departamentoContext+ environment.coreApiGetDepartamentoListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):'')).pipe(share());
  }

}
