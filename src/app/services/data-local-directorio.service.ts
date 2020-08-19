import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Directorio } from '../models/directorio.model';
import { DataLocalService } from './data-local.service';
@Injectable({
  providedIn: 'root'
})
export class DataLocalDirectorioService {

  directorios:Directorio[]=[];
  
  constructor(private storage : Storage,
              private dataLocalService : DataLocalService) { 
    this.cargarDirectorios();
  }
  
  guardarDirectorio(directorio: Directorio){
    this.directorios.unshift(directorio);
    this.storage.set('directorios',this.directorios);
    this.dataLocalService.presentToast('Directorio agregado');
  }

  async cargarDirectorios(){
    const dirs = await this.storage.get('directorios') 
    if(dirs){
      this.directorios = dirs;
    }
  }
}
