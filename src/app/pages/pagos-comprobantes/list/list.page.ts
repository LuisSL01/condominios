import { Component, OnInit } from '@angular/core';
import { DataLocalPagosComprobantesService } from '../../../services/data-local-pagos-comprobantes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(public dataLocalPagosComprobantesService: DataLocalPagosComprobantesService) { }

  ngOnInit() {
  }

}
