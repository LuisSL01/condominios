import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from "rxjs/index";
import { share } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.authServiceBaseUrl;
  baseUrlCore:string = environment.coreServiceBaseUrl;
  userContext: string = environment.authApiBaseUserOperation;

  constructor(private http:HttpClient) { }

  login(loginPayload): Observable<ApiResponse> {
    console.log('login: '+this.baseUrl + environment.authApiGetTokenOperation);    
    return this.http.post<ApiResponse>(this.baseUrl + environment.authApiGetTokenOperation, loginPayload).pipe(share());
  }

  
  getListEmpresas(idAgente: number): Observable<ApiResponse> {//Recupera las empresas del usuario
    console.log("getListEmpresas: "+this.baseUrlCore + environment.coreApiBaseAgenteOperation + environment.coreApiGetEmpresasAgente + "/" + idAgente);
    return this.http.get<ApiResponse>(this.baseUrlCore + environment.coreApiBaseAgenteOperation + environment.coreApiGetEmpresasAgente + "/" + idAgente).pipe(share());
  }

  logout(): void {
    window.localStorage.removeItem('userDetails');
    window.localStorage.removeItem('userConfig');
  }


  
g
    
}
