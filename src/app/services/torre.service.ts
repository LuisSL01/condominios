import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TorreService {

  baseUrl: string = environment.coreServiceBaseUrl;
  torreContext: string = environment.coreApiBaseTorreOperation;

  constructor(private http: HttpClient) { }

  save(torreData: any): Observable<ApiResponse> {
    console.log('save:'+this.baseUrl + this.torreContext);
    return this.http.post<ApiResponse>(this.baseUrl + this.torreContext, torreData).pipe(share());
  }

  getTorresFull(idEmpresa: number){
    console.log(this.baseUrl+this.torreContext+"/listByEmpresa/"+idEmpresa);
    return this.http.get<ApiResponse>(this.baseUrl+this.torreContext+"/listByEmpresa/"+idEmpresa).pipe(share());
  }

  getTorres(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl + this.torreContext+ environment.coreApiGetTorreListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):''));
    return this.http.get<ApiResponse>(this.baseUrl + this.torreContext+ environment.coreApiGetTorreListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):'')).pipe(share());
  }

}
