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
  userContext: string = environment.authApiBaseUserOperation;

  constructor(private http:HttpClient) { }

  login(loginPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + environment.authApiGetTokenOperation, loginPayload).pipe(share());
  }

  logout(): void {
    window.localStorage.removeItem('userDetails');
    window.localStorage.removeItem('userConfig');
  }
    
}
