import { Injectable } from '@angular/core';
import { BitacoraVisita } from '../models/bitacora-visitas.model';
import { Storage } from '@ionic/storage';
import { DataLocalService } from './data-local.service';

@Injectable({
  providedIn: 'root'
})
export class DataLocalBitacoraVisitaService {

  bitacoraVisitas: BitacoraVisita[]=[];
  nombreEtiquetaJson ="bitacoraVisitas";

  constructor(private storage:Storage ,
              private dataLocalService:DataLocalService) {
                console.log('en el constructor de bitacora visita service');                
                this.cargarBitacoraVisitas();

                

   }

   public construyeNombreEtiqueta(){
      console.log('construyeNombreEtiqueta');       
      return this.nombreEtiquetaJson = this.dataLocalService.idempresa+"_bitacoraVisitas";
   }

   guardar(bitacoraVisita:BitacoraVisita){
    const existe = this.bitacoraVisitas.find(bit => bit.idbitacoraVisita === bitacoraVisita.idbitacoraVisita);
    if(! existe){
      bitacoraVisita.idbitacoraVisita = this.dataLocalService.getNumeroNegativo() * -1;
      this.bitacoraVisitas.unshift(bitacoraVisita);
      this.storage.set(this.construyeNombreEtiqueta(), this.bitacoraVisitas);      
      this.dataLocalService.presentToast('Registro de visita agregada');
    }
   }

   borrar(bitacoraVisita:BitacoraVisita){
    this.bitacoraVisitas = this.bitacoraVisitas.filter(bit => bit.idbitacoraVisita !== bitacoraVisita.idbitacoraVisita);
    this.storage.set(this.construyeNombreEtiqueta(), this.bitacoraVisitas);      
    this.dataLocalService.presentToast('Registro de visita borrada');
   }

   async cargarBitacoraVisitas(){
    console.log('cargarBitacoraVisitas:'+this.construyeNombreEtiqueta());    
    const bit = await this.storage.get(this.construyeNombreEtiqueta());
    if(bit){
      this.bitacoraVisitas = bit;
    }
  }
}
