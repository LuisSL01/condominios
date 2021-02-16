import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Directorio } from '../models/directorio.model';
import { DataLocalService } from './data-local.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/index';
@Injectable({
  providedIn: 'root'
})
export class DirectorioService {

  directorios: Directorio[] = [];
  baseUrl: string = environment.coreServiceBaseUrl;
  directorioContext: string = environment.coreApiBaseDirectorioOperation;  
  nombreEtiqueta = "_directorios";

  constructor(private storage: Storage,              
              private http: HttpClient) {
      
  
  }

  
  save(directorioData: any): Observable<ApiResponse> {
    console.log('save directorio:'+this.baseUrl + this.directorioContext);
    return this.http.post<ApiResponse>(this.baseUrl + this.directorioContext, directorioData).pipe(share());
  }

  update(idDirectorio: number, directorio: any) : Observable<ApiResponse> {
    console.log('update directorio', this.baseUrl + this.directorioContext + environment.coreApiBaseEditOperation+  "/" + idDirectorio);
    
    return this.http.patch<ApiResponse>(this.baseUrl + this.directorioContext + environment.coreApiBaseEditOperation+  "/" + idDirectorio, directorio).pipe(share());
  }

  delete(idDirectorio: number) : Observable<ApiResponse> {
    console.log('borrando registro: ',this.baseUrl + this.directorioContext +environment.coreApiBaseDeleteOperation + "/" + idDirectorio );    
    return this.http.delete<ApiResponse>(this.baseUrl + this.directorioContext + environment.coreApiBaseDeleteOperation + "/" + idDirectorio ).pipe(share());
  }

  getDirectorios(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl + this.directorioContext+ environment.coreApiGetDirectorioListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):''));
    return this.http.get<ApiResponse>(this.baseUrl + this.directorioContext+ environment.coreApiGetDirectorioListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):'')).pipe(share());
  }

  async getDirectoriosFromStorage(idEmpresa:number) {
    const dircs = await this.storage.get(idEmpresa+this.nombreEtiqueta);
    if (dircs) this.directorios = dircs;
    else this.directorios =[];
  }


 /*  construyeNombreEtiqueta(){
    return this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_directorios";
  } */

 /*  guardarDirectorio(directorio: Directorio) {
    const existe = this.directorios.find(dir => dir.iddirectorio === directorio.iddirectorio);
    if (!existe) {
      directorio.iddirectorio = this.dataLocalService.getNumeroNegativo() * -1;
      this.directorios.unshift(directorio);
      this.storage.set(this.construyeNombreEtiqueta(), this.directorios);
      this.dataLocalService.presentToast('Directorio agregado');
    }
  }


  borrarDirectorio(directorio: Directorio) {
    //Nota en lugar de estar filtrando por titulo deberia ser por ID.    
    this.directorios = this.directorios.filter(dir => dir.iddirectorio !== directorio.iddirectorio);
    this.storage.set(this.construyeNombreEtiqueta(), this.directorios);
    this.dataLocalService.presentToast('Directorio borrado');
  }

  async cargarDirectorios() {
    const dirs = await this.storage.get(this.construyeNombreEtiqueta())
    if (dirs) {
      this.directorios = dirs;
    }
  }

  buscar(textoBuscar) {//No se implementa en el service, cuando se termina el filter siguen apareciendo
    //los mismos elementos en la lista
    this.cargarDirectorios();
    if (textoBuscar === '') {
      return;
    } else {      
      textoBuscar = textoBuscar.toLowerCase();      
      this.directorios = this.directorios.filter(item => {
        return (
          (item.nombre.toLowerCase().includes(textoBuscar))
          || (item.apellidoP.toLowerCase().includes(textoBuscar))
          || (item.apellidoM.toLowerCase().includes(textoBuscar))          
        );
      }
      );
    }
  } */
}
