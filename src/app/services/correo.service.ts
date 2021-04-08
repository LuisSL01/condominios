import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {


  baseUrl: string = environment.coreServiceBaseUrl;
  baseUrlAuth: string = environment.authServiceBaseUrl;

  constructor(private http:HttpClient) { }

  enviarCorreo(correoData: FormData): Observable<ApiResponse> {
    /* console.log('enviarCorreo:'+this.baseUrl + environment.coreApiBaseCorreoOperation + environment.coreApiBaseCorreoSimpleOperation); */
    return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBaseCorreoOperation + environment.coreApiBaseCorreoSimpleOperation, correoData).pipe(share());
  }

}
