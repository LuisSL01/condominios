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
}
