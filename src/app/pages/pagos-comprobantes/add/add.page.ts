import { Component, OnInit } from '@angular/core';
import { PagosComprobantes } from '../../../models/pagos-comprobantes.model';
import { DataLocalPagosComprobantesService } from '../../../services/data-local-pagos-comprobantes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  pago: PagosComprobantes = new PagosComprobantes();
  constructor(private dataLocalPagosComprobantesService: DataLocalPagosComprobantesService) { }

  ngOnInit() {
  }

  save(){
    console.log('save new Pago ');
    console.log(this.pago);
    this.dataLocalPagosComprobantesService.guardarPagoComprobante(this.pago);    
  }

}
