import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Aviso } from '../models/aviso.model';
import { DataLocalService } from './data-local.service';

@Injectable({
  providedIn: 'root'
})
export class DataLocalAvisoService {
  avisos: Aviso[] = [];
  constructor(private storage: Storage,
    private dataLocalService: DataLocalService) {
    this.cargarAvisos();
  }


  guardarAviso(aviso: Aviso) {
    //se inserta la noticia que se recibe en el arr    
    const existe = this.avisos.find( avi => avi.idaviso === aviso.idaviso );
    console.log('El aviso ya existe...');
    console.log(existe);
      
    if(! existe ){
      aviso.idaviso = this.dataLocalService.getNumeroNegativo()*-1;
      this.avisos.unshift(aviso);
      //ahora enviamos el arreglo de las noticias a guardar en el dtorage.
      this.storage.set('avisos', this.avisos);
      this.dataLocalService.presentToast('Aviso agregado');
    }

  }

  borrarAviso(aviso: Aviso) {
    //Nota en lugar de estar filtrando por titulo deberia ser por ID.    
    this.avisos = this.avisos.filter(avso => avso.idaviso !== aviso.idaviso)
    this.storage.set('avisos', this.avisos);
    this.dataLocalService.presentToast('Aviso borrado');
  }

  getAviso(){
    
  }

  async cargarAvisos() {
    /* 
    this.storage.get('avisos')
    .then(
      avisos =>{
        console.log('avisos', avisos);        
      }
    ); 
    */
    /*
    Esto retornara el arreglo de avisos o el undefined. 
    Para que el await funcione es necesario agregar el async al inicio del methodo
     */
    const avisosA = await this.storage.get('avisos');
    if (avisosA) {
      //Cuando viene != null se iguala al arreglo global
      this.avisos = avisosA;
    }
  }
}
