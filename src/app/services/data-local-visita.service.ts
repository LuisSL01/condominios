import { Injectable } from '@angular/core';
import { Visita } from '../models/visita.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalVisitaService {

  visitas: Visita[] = [];
  nombreEtiquetaJson = "visitas";

  constructor(private dataLocalService: DataLocalService,
    private storage: Storage) {
    
    this.cargarVisitas();

  }

  construyeNombreEtiqueta() {
    return this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_visitas";
  }

  guardarVisita(visita: Visita) {
    const existe = this.visitas.find(vis => vis.idvisita === visita.idvisita);
    if (!existe) {
      visita.idvisita = this.dataLocalService.getNumeroNegativo() * -1;
      this.visitas.unshift(visita);
      this.storage.set(this.construyeNombreEtiqueta(), this.visitas);
      this.dataLocalService.presentToast('Visita agregada');
    }
  }

  borrarVisita(visita: Visita) {
    this.visitas = this.visitas.filter(vis => vis.idvisita !== visita.idvisita)
    this.storage.set(this.construyeNombreEtiqueta(), this.visitas);
    this.dataLocalService.presentToast('Visita borrada');
  }

/*Asi tendría que ser par que al hora de borrar una visita se acturlice la vista 
  //borrarVisita(visita: Visita) {
    // se obtiene el índice del objeto filtrando por su id
    //let index = this.visitas.findIndex(vis => vis.idvisita == visita.idvisita);
    // se elimina ese elemento del arreglo orignal y la vista
    // se actualiza
   // this.visitas.slice(index,1);
   // this.storage.set(this.construyeNombreEtiqueta(), this.visitas);
   // this.dataLocalService.presentToast('Visita borrada');
   }*/

  async cargarVisitas() {
    const visitas = await this.storage.get(this.construyeNombreEtiqueta());
    if (visitas) {
      this.visitas = visitas;
    }
  }
}
