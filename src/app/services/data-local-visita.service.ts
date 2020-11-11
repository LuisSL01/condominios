import { Injectable } from '@angular/core';
import { Visita } from '../models/visita.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalVisitaService {

  visitas:Visita[]=[];
  nombreEtiquetaJson = "visitas";

  constructor(private dataLocalService:DataLocalService,
              private storage:Storage ) {
                this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_" + this.nombreEtiquetaJson;              
                this.cargarVisitas();

               }
  guardarVisita(visita: Visita){
    const existe = this.visitas.find( vis => vis.idvisita === visita.idvisita );
    if(! existe ){
      visita.idvisita = this.dataLocalService.getNumeroNegativo() * -1;
      this.visitas.unshift(visita);
      this.storage.set(this.nombreEtiquetaJson, this.visitas);
      this.dataLocalService.presentToast('Visita agregada');
    }  
  }

  borrarVisita(visita: Visita){
    this.visitas = this.visitas.filter(vis => vis.idvisita !== visita.idvisita)
    this.storage.set(this.nombreEtiquetaJson, this.visitas);
    this.dataLocalService.presentToast('Visita borrada');
  }

  async cargarVisitas(){
    const visitas = await this.storage.get(this.nombreEtiquetaJson);
    if(visitas){
      this.visitas = visitas;
    }
  }             
}
