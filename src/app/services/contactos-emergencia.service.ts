import { Injectable } from '@angular/core';
import { ContactosEmergencia } from '../models/contactos-emergencia.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class ContactosEmergenciaService {

  contactos: ContactosEmergencia[] = [];
  baseUrl: string = environment.coreServiceBaseUrl;
  contactoContext: string = environment.coreApiBaseContactoOperation;  
  nombreEtiqueta = "_contactos";


  constructor(private storage: Storage,
              private http: HttpClient) {
  }

  save(contactoData: any): Observable<ApiResponse> {
    console.log('save contacto:'+this.baseUrl + this.contactoContext);
    return this.http.post<ApiResponse>(this.baseUrl + this.contactoContext, contactoData).pipe(share());
  }

  update(idContacto: number, contacto: any) : Observable<ApiResponse> {
    console.log('update contacto', this.baseUrl+this.contactoContext+environment.coreApiBaseEditOperation+"/"+idContacto);
    return this.http.patch<ApiResponse>(this.baseUrl+this.contactoContext+environment.coreApiBaseEditOperation+"/"+idContacto, contacto).pipe(share());
  } 

  delete(idContacto: number) : Observable<ApiResponse> {
    console.log('borrando registro: ',this.baseUrl + this.contactoContext +environment.coreApiBaseDeleteOperation + "/" + idContacto );    
    return this.http.delete<ApiResponse>(this.baseUrl + this.contactoContext + environment.coreApiBaseDeleteOperation + "/" + idContacto).pipe(share());
  }

  getContactos(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl + this.contactoContext+ environment.coreApiGetContactoListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):''));
    return this.http.get<ApiResponse>(this.baseUrl + this.contactoContext+ environment.coreApiGetContactoListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):'')).pipe(share());
  }

  async getContactosFromStorage(idEmpresa:number) {
    const contacts = await this.storage.get(idEmpresa+this.nombreEtiqueta);
    if (contacts) this.contactos = contacts;
    else this.contactos =[];    
  }

}
