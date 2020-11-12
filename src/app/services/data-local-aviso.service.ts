import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Aviso } from '../models/aviso.model';
import { DataLocalService } from './data-local.service';

@Injectable({
  providedIn: 'root'
})
export class DataLocalAvisoService {
  avisos: Aviso[] = [];
  avisosFilter: Aviso[] = [];

  nombreEtiquetaJson = "avisos";


  constructor(private storage: Storage,
    private dataLocalService: DataLocalService) {
    this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_" + this.nombreEtiquetaJson;

    console.log('this.nombreEtiquetaJson: '+this.nombreEtiquetaJson);
    
    this.cargarAvisos();
  }


  guardarAviso(aviso: Aviso) {
    //se inserta la noticia que se recibe en el arr    
    const existe = this.avisos.find(avi => avi.idaviso === aviso.idaviso);
    if (!existe) {
      aviso.idaviso = this.dataLocalService.getNumeroNegativo() * -1;
      this.avisos.unshift(aviso);
      //ahora enviamos el arreglo de las noticias a guardar en el dtorage.
      this.storage.set(this.nombreEtiquetaJson, this.avisos);
      this.dataLocalService.presentToast('Aviso agregado');
    }

  }

  guardarRespuestaAviso(avisoOriginal: Aviso, respuestaAviso: Aviso) {
    console.log('guardarRespuestaAviso');
    avisoOriginal.avisosRespuestaList.unshift(respuestaAviso);
    this.storage.set(this.nombreEtiquetaJson, this.avisos);
    this.dataLocalService.presentToast('respuesta agregada');
    /* 
        const existe = this.avisos.find( avi => avi.idaviso === avisoOriginal.idaviso );
        console.log(existe);
        if( existe ){
          avisoOriginal.avisosRespuestaList.unshift(respuestaAviso);
          console.log(avisoOriginal);
          this.avisos = this.avisos.filter(avso => avso.idaviso !== avisoOriginal.idaviso);
          this.avisos.unshift(avisoOriginal);
          this.storage.set('avisos', this.avisos);
          console.log('terminando de setear el arreglo de avisos');      
          this.dataLocalService.presentToast('respuesta agregada');
        } */
  }


  borrarAviso(aviso: Aviso) {
    this.avisos = this.avisos.filter(avso => avso.idaviso !== aviso.idaviso)
    this.storage.set(this.nombreEtiquetaJson, this.avisos);
    this.dataLocalService.presentToast('Aviso borrado');
  }

  getAviso() {

  }

  async cargarAvisos() {
    console.log('cargando mis avisos');

    const avisosA = await this.storage.get(this.nombreEtiquetaJson);
    if (avisosA) {
      //Cuando viene != null se iguala al arreglo global
      this.avisos = avisosA;
    }
  }

  async buscar(texto: string) {
    this.cargarAvisos();
    this.avisosFilter = this.avisos;
    console.log('aviso.buscar().service: ' + texto);
    console.log('this.avisos antes de buscar', this.avisos);

    if (texto === '') {
    } else {
      texto = texto.toLowerCase();
      this.avisosFilter = this.avisosFilter.filter(item => {
        return (item.titulo.toLowerCase().includes(texto)
          || item.mensaje.toLowerCase().includes(texto)
        );
      }
      );
    }
    this.avisos = this.avisosFilter;
    console.log('this.avisos despues de buscar', this.avisos);
  }
}
