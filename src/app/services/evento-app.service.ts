import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoAppService {

  baseUrl: string = environment.coreServiceBaseUrl;
  eventoContext: string = environment.coreApiBaseEventoAppOperation;  

  constructor(private http: HttpClient) { }

  save(eventoData: any): Observable<ApiResponse> {
    console.log('save:'+this.baseUrl + this.eventoContext);
    return this.http.post<ApiResponse>(this.baseUrl + this.eventoContext,eventoData).pipe(share());
  }
}
