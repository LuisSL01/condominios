import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import {Publicacion} from '../models/publicacion.model';
import { DataLocalService } from './data-local.service';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from "rxjs/index";
import { share } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataLocalAvisoService {
  avisos: Publicacion[] = [];
  avisosFilter: Publicacion[] = [];

  nombreEtiquetaJson = "avisos";

  baseUrl: string = environment.coreServiceBaseUrl;

  constructor(private http: HttpClient,
              private storage: Storage,
              private dataLocalService: DataLocalService) {    
    console.log('this.nombreEtiquetaJson: '+this.nombreEtiquetaJson);    
    this.cargarAvisos();
  }



  addAviso(formData: any){
    console.log('post->',this.baseUrl + environment.coreApiBaseAvisosAdministracionOperation);    
    return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBaseAvisosAdministracionOperation, formData).pipe(share());
  }


  addMarca(idEmpresa: number, formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBaseMarcaCatalog+ "/"+idEmpresa, formData).pipe(share());
  }
  

  
  construyeNombreEtiqueta(){
    return this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_avisos";
  }


  guardarAviso(aviso: Publicacion) {
    //se inserta la noticia que se recibe en el arr    
    const existe = this.avisos.find(avi => avi.id === aviso.id);
    if (!existe) {
      aviso.id = this.dataLocalService.getNumeroNegativo() * -1;
      this.avisos.unshift(aviso);
      //ahora enviamos el arreglo de las noticias a guardar en el dtorage.
      this.storage.set(this.construyeNombreEtiqueta(), this.avisos);
      this.dataLocalService.presentToast('Aviso agregado');
    }

  }

  guardarRespuestaAviso(avisoOriginal: Publicacion, respuestaAviso: Publicacion) {
    console.log('guardarRespuestaAviso');
    avisoOriginal.respuestas.unshift(respuestaAviso);
    this.storage.set(this.construyeNombreEtiqueta(), this.avisos);
    this.dataLocalService.presentToast('respuesta agregada');   
  }

  borrarAviso(aviso: Publicacion) {
    this.avisos = this.avisos.filter(avso => avso.id !== aviso.id);
    this.storage.set(this.construyeNombreEtiqueta(), this.avisos);
    this.dataLocalService.presentToast('Aviso borrado');
  }


  async cargarAvisos() {
    console.log('cargando mis avisos');
    const avisosA = await this.storage.get(this.construyeNombreEtiqueta());
    if (avisosA) {
      //Cuando viene != null se iguala al arreglo global
      this.avisos = avisosA;
    }
  }

  async buscar(texto: string) {//No funciono el meter aqui el filtro, ver cual sera la mejor manera
    this.cargarAvisos();
    this.avisosFilter = this.avisos;
    console.log('aviso.buscar().service: ' + texto);
    console.log('this.avisos antes de buscar', this.avisos);

    if (texto === '') {
    } else {
      texto = texto.toLowerCase();
      this.avisosFilter = this.avisosFilter.filter(item => {
        return (item.titulo.toLowerCase().includes(texto)
          || item.descripcion.toLowerCase().includes(texto)
        );
      }
      );
    }
    this.avisos = this.avisosFilter;
    console.log('this.avisos despues de buscar', this.avisos);
  }
}
