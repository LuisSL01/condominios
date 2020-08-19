import { Injectable } from '@angular/core';
import { AreaComun } from '../models/area-comun.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalAreaComunService {

  areasComunes:AreaComun[]=[];

  constructor(private dataLocalService : DataLocalService,
              private storage:Storage) {
              this.cargarAreasComunes();

   }
   guardarAreaComun(areaComun : AreaComun){
     this.areasComunes.unshift(areaComun);
     this.storage.set('areascomunes',this.areasComunes);
     this.dataLocalService.presentToast('Areá agregada');     
   }

   async cargarAreasComunes(){
     const areas = await this.storage.get('areascomunes');
     if(areas){
       this.areasComunes = areas;
     }
   }
}
