import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Directorio } from '../models/directorio.model';
import { DataLocalService } from './data-local.service';
@Injectable({
  providedIn: 'root'
})
export class DataLocalDirectorioService {

  directorios: Directorio[] = [];

  constructor(private storage: Storage,
    private dataLocalService: DataLocalService) {
    this.cargarDirectorios();
  }

  guardarDirectorio(directorio: Directorio) {
    //se inserta la noticia que se recibe en el arr    
    const existe = this.directorios.find(dir => dir.iddirectorio === directorio.iddirectorio);
    console.log('El directorio ya existe...');
    console.log(existe);
    if (!existe) {
      directorio.iddirectorio = this.dataLocalService.getNumeroNegativo() * -1;
      this.directorios.unshift(directorio);
      this.storage.set('directorios', this.directorios);
      this.dataLocalService.presentToast('Directorio agregado');
    }
  }


  borrarDirectorio(directorio: Directorio) {
    //Nota en lugar de estar filtrando por titulo deberia ser por ID.    
    this.directorios = this.directorios.filter(dir => dir.iddirectorio !== directorio.iddirectorio);
    this.storage.set('avisos', this.directorios);
    this.dataLocalService.presentToast('Directorio borrado');
  }

  async cargarDirectorios() {
    const dirs = await this.storage.get('directorios')
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
          /* || 
          ( item.nombrePrivada.toLowerCase().includes(this.textoBuscar)) */
        );
      }
      );
    }
  }
}
