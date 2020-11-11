import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { DataLocalService } from './data-local.service';
import { Gasto } from '../models/gasto.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalGastoService {
  
  
  gastos:Gasto[]=[];
  nombreEtiquetaJson = "gastos";
  constructor(public storage : Storage,
              private dataLocalService : DataLocalService) { 
                this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_" + this.nombreEtiquetaJson;
      this.cargarGastos();
    }

    guardarGasto(gasto: Gasto){
      const existe = this.gastos.find( gas => gas.idgasto === gasto.idgasto);
      if(! existe ){
        gasto.idgasto = this.dataLocalService.getNumeroNegativo()*-1;
        this.gastos.unshift(gasto);
        this.storage.set(this.nombreEtiquetaJson,this.gastos);
        this.dataLocalService.presentToast('Gasto agregado');
      }

    }
    borrarGasto(gasto: Gasto){
      this.gastos = this.gastos.filter(gas => gas.idgasto !== gasto.idgasto)
      this.storage.set(this.nombreEtiquetaJson,this.gastos);
      this.dataLocalService.presentToast('Gasto borrado');

    }
    async cargarGastos(){
      const gastos = await this.storage.get(this.nombreEtiquetaJson) 
      if(gastos){
        this.gastos = gastos;
      }
    }
}
