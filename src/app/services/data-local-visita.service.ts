import { Injectable } from '@angular/core';
import { Visita } from '../models/visita.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalVisitaService {

  visitas:Visita[]=[];

  constructor(private dataLocalService:DataLocalService,
              private storage:Storage ) {
                
                this.cargarVisitas();

               }
  guardarVisita(visita: Visita){
    this.visitas.unshift(visita);
    this.storage.set('visitas', this.visitas);
    this.dataLocalService.presentToast('Visita agregada');
  
  }

  async cargarVisitas(){
    const visitas = await this.storage.get('visitas');
    if(visitas){
      this.visitas = visitas;
    }
  }             
}
