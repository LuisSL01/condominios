import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CodigoPostalService {

  baseUrl: string = environment.coreServiceBaseUrl;
  codigoPostalContext: string = environment.coreApiGetCodigoPostalCatalog;
  
  constructor(private http: HttpClient) { }

  filterCodigosPostales(codigoPostal: string) : Observable<ApiResponse> {
    console.log('filter codigos podtales');
    console.log(this.baseUrl + this.codigoPostalContext+"/"+codigoPostal);    
    return this.http.get<ApiResponse>(this.baseUrl + this.codigoPostalContext + "/" + codigoPostal).pipe(share());
  }
}
