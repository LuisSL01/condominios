import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PagosComprobantes } from '../models/pagos-comprobantes.model';
import { DataLocalService } from './data-local.service';

@Injectable({
  providedIn: 'root'
})
export class DataLocalPagosComprobantesService {

  pagosComprobantes: PagosComprobantes[] = [];

  constructor(private storage: Storage,
              private dataLocalService: DataLocalService) {
    this.cargarPagosComprobantes();
  }
  guardarPagoComprobante(pagoComprobante: PagosComprobantes) {
    this.pagosComprobantes.unshift(pagoComprobante);
    this.storage.set('pagoscomprobantes', this.pagosComprobantes);
    this.dataLocalService.presentToast('Pago comprobante agregado');
  }

  async cargarPagosComprobantes() {
    const pgsComprobantes = await this.storage.get('pagoscomprobantes');
    if (pgsComprobantes) {
      this.pagosComprobantes = pgsComprobantes;
    }
  }


}
