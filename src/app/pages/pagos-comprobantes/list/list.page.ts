import { Component, OnInit, Input } from '@angular/core';
import { DataLocalPagosComprobantesService } from '../../../services/data-local-pagos-comprobantes.service';
import { PagosComprobantes } from '../../../models/pagos-comprobantes.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() pagoComprobante:PagosComprobantes;

  constructor(public dataLocalPagosComprobantesService: DataLocalPagosComprobantesService) { }

  ngOnInit() {
  }

}
