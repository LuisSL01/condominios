import { Injectable } from '@angular/core';
import { Votacion } from '../models/votaciones.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalVotacionesService {

  votaciones:Votacion[]=[];
  constructor(public storage : Storage,
    private dataLocalService : DataLocalService) {
      this.cargarVotaciones();
   }

   guardarVotacion( votacion : Votacion ){
      this.votaciones.unshift(votacion);
      this.storage.set('votaciones', this.votaciones);
      this.dataLocalService.presentToast('Votación agregado');
   }

   async cargarVotaciones(){
      const vot = await this.storage.get('votaciones');
      if(vot){
        this.votaciones = vot;
      }
   }

}
