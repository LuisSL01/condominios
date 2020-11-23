import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PagosComprobantes } from '../models/pagos-comprobantes.model';
import { DataLocalService } from './data-local.service';

@Injectable({
  providedIn: 'root'
})
export class DataLocalPagosComprobantesService {

  pagosComprobantes: PagosComprobantes[] = [];
  nombreEtiquetaJson ="pagoscomprobantes";

  constructor(private storage: Storage,
              private dataLocalService: DataLocalService) {
    this.cargarPagosComprobantes();
  }

  construyeNombreEtiqueta(){
    return this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_pagoscomprobantes";

  }

  guardarPagoComprobante(pagoComprobante: PagosComprobantes) {
    const existe = this.pagosComprobantes.find( pag => pag.idpagocomprobante === pagoComprobante.idpagocomprobante );
    if(! existe ){
      pagoComprobante.idpagocomprobante = this.dataLocalService.getNumeroNegativo()*-1;      
      this.pagosComprobantes.unshift(pagoComprobante);
      this.storage.set(this.construyeNombreEtiqueta(), this.pagosComprobantes);
      this.dataLocalService.presentToast('Pago comprobante agregado');
    }
  }

  borrarPagoComprobante(pagoComprobante: PagosComprobantes){
    this.pagosComprobantes = this.pagosComprobantes.filter(pag => pag.idpagocomprobante !== pagoComprobante.idpagocomprobante);
    this.storage.set(this.construyeNombreEtiqueta(), this.pagosComprobantes);
    this.dataLocalService.presentToast('Pago comprobante borrado');
  }

  async cargarPagosComprobantes() {
    const pgsComprobantes = await this.storage.get(this.construyeNombreEtiqueta());
    if (pgsComprobantes) {
      this.pagosComprobantes = pgsComprobantes;
    }
  }


}
