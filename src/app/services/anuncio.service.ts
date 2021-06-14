import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Anuncio } from '../models/anuncio.model';
import { DataLocalService } from './data-local.service';
import { Publicacion } from '../models/publicacion.model';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { UserData } from '../providers/user-data';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  anuncios: Publicacion[] = [];
  anunciosLocales:Publicacion[]=[];

  nombreEtiquetaJson = "";
  baseUrl: string = environment.coreServiceBaseUrl;
  publicacionContext: string = environment.coreApiBasePublicacionOperation;

  anuncioListener = new EventEmitter<Publicacion>();

  constructor(private storage: Storage,
    private dataLocalService: DataLocalService,
    private userData:UserData,
    private http: HttpClient) {
    /* this.cargarAnunciosLocales(); */
  }

  removeElement(ann:Publicacion){
    this.anuncioListener.emit(ann);
  }

  construyeNombreEtiqueta(){
    return this.nombreEtiquetaJson = this.userData.getIdEmpresa() + "_anuncios_local";
  }

  guardarAnuncioLocal(anuncio: Publicacion) {
      anuncio.id = this.dataLocalService.getNumeroNegativo() * -1;
      this.anunciosLocales.unshift(anuncio);
      this.storage.set(this.construyeNombreEtiqueta(), this.anunciosLocales);
      this.dataLocalService.presentToast('Anuncio agregado localmente');      
  }

  getAnuncios(idEmpresa: number, page: number, size: number, filters: string){
    /* console.log(this.baseUrl +environment.coreApiBasePublicacionOperation + environment.coreApiGetAnunciosListOperation + '/' + idEmpresa + '/ANUNCIO?page=' + page + '&size=' + size + (filters ? ('&filters=' + filters):'')); */
    return this.http.get<ApiResponse>(this.baseUrl +environment.coreApiBasePublicacionOperation + environment.coreApiGetAnunciosListOperation + '/' + idEmpresa + '/ANUNCIO?page=' + page + '&size=' + size + (filters ? ('&filters=' + filters):'')).pipe(share());
  }


 async recuperaAnunciosStorage(idEmpresa : number){
   console.log('recupera anuncios storage: ', idEmpresa + "_anuncios");
    const ann = await this.storage.get(idEmpresa + "_anuncios")
    console.log('ann: '+ann);    
    if (ann) {
      this.anuncios = ann;
    }else{
      this.anuncios =[];
    }
  }

  guardarAnuncio(anuncioData: FormData): Observable<ApiResponse> {
    console.log('guardarAnuncio:'+this.baseUrl + this.publicacionContext);
    console.log('anuncioData',anuncioData);
    return this.http.post<ApiResponse>(this.baseUrl + this.publicacionContext, anuncioData).pipe(share());
  }


  update(idPublicacion: number, publicacion: any) : Observable<ApiResponse> {
    console.log('update anuncio', this.baseUrl + this.publicacionContext + environment.coreApiBaseEditOperation+  "/" + idPublicacion);    
    return this.http.patch<ApiResponse>(this.baseUrl + this.publicacionContext + environment.coreApiBaseEditOperation+  "/" + idPublicacion, publicacion).pipe(share());
  }
    
  guardarAnuncios(listAnuncios: FormData): Observable<ApiResponse> {
    console.log('guardarAnuncios->sincronizando:'+this.baseUrl + environment.coreApiBasePublicacionesOperation);    
    return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBasePublicacionesOperation, listAnuncios).pipe(share());
  }

/*   registerImage(image: any): Observable<ApiResponse> {
    console.log('registerAnuncioWithImages:'+this.baseUrl + "/publicacionI64");
    console.log('anuncioData',image);    
    return this.http.post<ApiResponse>(this.baseUrl + "/publicacionI64", image).pipe(share());
  } */

  borrarAnuncioLocal(anuncio: Publicacion) {//Aplicara para borrar anuncios locales
    this.anunciosLocales = this.anunciosLocales.filter(ann => ann.id !== anuncio.id);
    this.storage.set(this.construyeNombreEtiqueta(), this.anunciosLocales);
    this.dataLocalService.presentToast('Anuncio borrado');
  }

  borrarAnuncio(idPublicacion: number) : Observable<ApiResponse> {
    console.log('borrando pub: ',this.baseUrl + environment.coreApiBasePublicacionOperation +environment.coreApiBaseDeleteOperation + "/" + idPublicacion );    
    return this.http.delete<ApiResponse>(this.baseUrl + environment.coreApiBasePublicacionOperation +environment.coreApiBaseDeleteOperation + "/" + idPublicacion).pipe(share());
  }

  reportarAnuncio(idAnuncio:number, reporte: any): Observable<ApiResponse> {
    console.log('saveRespuesta:'+this.baseUrl + this.publicacionContext + environment.coreApiBasePublicacionReporteOperation+"/"+idAnuncio);
    console.log('respuesta',reporte);
    return this.http.post<ApiResponse>(this.baseUrl + this.publicacionContext + environment.coreApiBasePublicacionReporteOperation+'/'+idAnuncio, reporte).pipe(share());
  } 
  
  updateStatus(data:FormData): Observable<ApiResponse> {
    console.log('updateStatus: ', this.baseUrl + this.publicacionContext+':'+ environment.coreApiUpdateStatusPublicacionOperation );    
    return this.http.patch<ApiResponse>(this.baseUrl + this.publicacionContext+':'+ environment.coreApiUpdateStatusPublicacionOperation ,data).pipe(share());    
  }

  async cargarAnunciosLocales() {
    const anncios = await this.storage.get(this.construyeNombreEtiqueta())
    console.log('this.construyeNombreEtiqueta():'+this.construyeNombreEtiqueta());
    console.log('anncios: ',anncios);
    
    if (anncios) {
      this.anunciosLocales = anncios;
    }else{
      this.anunciosLocales = [];
    }
  }
}
