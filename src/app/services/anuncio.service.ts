import { Injectable } from '@angular/core';
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

  constructor(private storage: Storage,
    private dataLocalService: DataLocalService,
    private userData:UserData,
    private http: HttpClient) {
    /* this.cargarAnunciosLocales(); */
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
    console.log(this.baseUrl +environment.coreApiBaseAnuncioOperation + environment.coreApiGetAnunciosListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+"");
    return this.http.get<ApiResponse>(this.baseUrl +environment.coreApiBaseAnuncioOperation + environment.coreApiGetAnunciosListOperation + '/' + idEmpresa + '?page=' + page + '&size=' + size + (filters ? ('&filters=' + filters):'')).pipe(share());
  }

 getDataAnuncios(idEmpresa:number, page: number, size: number, filters:string, event?) {   
    this.getAnuncios(idEmpresa, page, size, filters)
      .subscribe(
        (data) => {
          if (data.status === 200) {
            /* this.anuncios = data.result.content;        */     
            this.anuncios.push(...data.result.content);
            console.log(this.anuncios);
            this.storage.set(idEmpresa + "_anuncios", this.anuncios);    
            
            if(event){
              event.target.complete();
            }

          } else {
            console.log(data.status);
            this.recuperaAnunciosStorage(idEmpresa);            
          }
        },
        (err) => {
          console.log(err);
          this.recuperaAnunciosStorage(idEmpresa);
          
        }
      );
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

  buscaAnunciosLocales(){
    this.cargarAnunciosLocales();
/*     if(this.anunciosLocales.length > 0){      
      this.anuncios.push(...this.anunciosLocales);
    } */
  }

  
  guardarAnuncio(anuncioData: FormData): Observable<ApiResponse> {
    console.log('guardarAnuncio:'+this.baseUrl + this.publicacionContext);
    console.log('anuncioData',anuncioData);
    return this.http.post<ApiResponse>(this.baseUrl + this.publicacionContext, anuncioData).pipe(share());
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
    console.log('borrando pub..');    
    return this.http.delete<ApiResponse>(this.baseUrl + environment.coreApiBaseAnuncioOperation + "/" + idPublicacion).pipe(share());
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
