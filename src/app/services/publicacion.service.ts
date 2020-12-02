import { Injectable } from '@angular/core';
import { Publicacion } from '../models/publicacion.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  publicaciones: Publicacion[] = [];
  constructor(private dataLocalService: DataLocalService,
              private storage: Storage) {
                console.log('en el constructor de publicaciones...');
                
    this.cargarPublicaciones();

   }   
   async cargarPublicaciones(){
    this.publicaciones =[];
     console.log('cargando publicaciones de: '+ this.dataLocalService.idempresa);

    const avv = await this.storage.get(this.dataLocalService.idempresa+"_avisos");
    if (avv) {
      this.publicaciones.push(...avv);
    }
    const ann = await this.storage.get(this.dataLocalService.idempresa+"_anuncios");
    if (ann) {
      this.publicaciones.push(...ann);
    }
   /*  const con = await this.storage.get(this.dataLocalService.idempresa+"_convocatorias");
    if (con) {      
      this.publicaciones.push(...con);
    } 
    const res = await this.storage.get(this.dataLocalService.idempresa+"_resoluciones");
    if (res) {      
      this.publicaciones.push(...res);
    }  */
    console.log('publicaciones: '+ this.publicaciones);
    
   }

   
}
