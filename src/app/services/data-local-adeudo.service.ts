import { Injectable } from '@angular/core';
import { AdeudoPago } from '../models/adeudo-pago.model';
import { Storage } from '@ionic/storage';
import { DataLocalService } from './data-local.service';

@Injectable({
  providedIn: 'root'
})
export class DataLocalAdeudoService {

  adeudos:AdeudoPago[] =[];
  nombreEtiquetaJson = "adeudo";

  constructor(private storage:Storage,
              private dataLocalService:DataLocalService) {                                 
                this.cargarAdeudos();              
              }

  construyeNombreEtiqueta(){
    return this.nombreEtiquetaJson = this.dataLocalService.idempresa+'_adeudo';
  }            

  guardarAdeudo(adeudo: AdeudoPago){
    const existe = this.adeudos.find(add => add.idadeudopago === adeudo.idadeudopago);
    if(! existe){
      adeudo.idadeudopago = this.dataLocalService.getNumeroNegativo() * -1;
      this.adeudos.unshift(adeudo);
      this.storage.set(this.construyeNombreEtiqueta(), this.adeudos);
      this.dataLocalService.presentToast('Adeudo agregado');
    }

  }
  borrarAdeudo(adeudo: AdeudoPago){
    this.adeudos = this.adeudos.filter(add => add.idadeudopago !== adeudo.idadeudopago);
    this.storage.set(this.construyeNombreEtiqueta(), this.adeudos);
    this.dataLocalService.presentToast('Adeudo borrado');

  }

  async cargarAdeudos(){
    console.log('cargarAdeudos:'+this.construyeNombreEtiqueta());
    
    const addeudos = await this.storage.get(this.construyeNombreEtiqueta());
    if(addeudos){
      this.adeudos = addeudos;
    }
  }

}
