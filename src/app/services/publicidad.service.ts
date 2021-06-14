import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/index';
import { environment } from 'src/environments/environment';
import { Publicidad } from '../models/publicidad.model';
import { UserData } from '../providers/user-data';

@Injectable({
  providedIn: 'root'
})
export class PublicidadService {

  baseUrl: string = environment.coreServiceBaseUrl;
  publicidadContext: string = environment.coreApiBasePublicidadOperation;
  idEmpresa:number;

  imagesPublicidad:Publicidad[]=[];


  constructor(private http: HttpClient,
              private userData:UserData) {                
   }

   
  async cargarRegistros(){
    this.idEmpresa = this.userData.getIdEmpresa();
    await this.getPublicidadAllPorEmpresa(this.idEmpresa).subscribe(
      data=>{        
        if(data.status === 200){
          this.imagesPublicidad = data.result;
          console.log('this.imagesPublicidad', JSON.stringify(this.imagesPublicidad));
        }
      }, err => {                  
        console.log('Error en el servicio al buscar registros');
      }
    );
    console.log('this.imagesPublicidad', JSON.stringify(this.imagesPublicidad));    
  }

  save(publicidadData: any): Observable<ApiResponse> {
    console.log('save: ' + this.baseUrl + this.publicidadContext);
    return this.http.post<ApiResponse>(this.baseUrl + this.publicidadContext, publicidadData).pipe(share());
  }

  getPublicidad(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl + this.publicidadContext + environment.coreApiBasePublicidadListOperation + "/" + idEmpresa + "?page=" + page + "&size=" + size + (filters ? ('&filters=' + filters) : ''));
    return this.http.get<ApiResponse>(this.baseUrl + this.publicidadContext+ environment.coreApiBasePublicidadListOperation + "/" + idEmpresa + "?page=" + page + "&size=" + size +(filters ? ('&filters=' + filters) : '')).pipe(share());
  }

  getPublicidadAllPorEmpresa(idEmpresa: number){
    console.log(this.baseUrl + this.publicidadContext+":listByEmpresaAll/"+idEmpresa);
    return this.http.get<ApiResponse>(this.baseUrl + this.publicidadContext+":listByEmpresaAll/"+idEmpresa).pipe(share());
  }

  update(idPublicidad: number, publicacionData: any) : Observable<ApiResponse> {
    console.log('update publicidad', this.baseUrl + this.publicidadContext + environment.coreApiBaseEditOperation+  "/" + idPublicidad);
    return this.http.patch<ApiResponse>(this.baseUrl+this.publicidadContext+environment.coreApiBaseEditOperation+  "/" + idPublicidad, publicacionData).pipe(share());
  }

  delete(idPublicidad: number): Observable<ApiResponse> {
    console.log('borrando registro publicidad: ', this.baseUrl + this.publicidadContext + environment.coreApiBaseDeleteOperation + "/" + idPublicidad );
    return this.http.delete<ApiResponse>(this.baseUrl + this.publicidadContext + environment.coreApiBaseDeleteOperation + "/" + idPublicidad).pipe(share());
  }

}
