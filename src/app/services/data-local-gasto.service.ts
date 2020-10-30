import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { DataLocalService } from './data-local.service';
import { Gasto } from '../models/gasto.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalGastoService {
  
  
  gastos:Gasto[]=[];

  constructor(public storage : Storage,
              private dataLocalService : DataLocalService) { 
      this.cargarGastos();
    }

    guardarGasto(gasto: Gasto){
      const existe = this.gastos.find( gas => gas.idgasto === gasto.idgasto);
      if(! existe ){
        gasto.idgasto = this.dataLocalService.getNumeroNegativo()*-1;
        this.gastos.unshift(gasto);
        this.storage.set('gastos',this.gastos);
        this.dataLocalService.presentToast('Gasto agregado');
      }

    }
    borrarGasto(gasto: Gasto){
      this.gastos = this.gastos.filter(gas => gas.idgasto !== gasto.idgasto)
      this.storage.set('gastos',this.gastos);
      this.dataLocalService.presentToast('Gasto borrado');

    }
    async cargarGastos(){
      const gastos = await this.storage.get('gastos') 
      if(gastos){
        this.gastos = gastos;
      }
    }
}
