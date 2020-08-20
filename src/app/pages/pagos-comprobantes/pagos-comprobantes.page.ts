import { Component, OnInit } from '@angular/core';
import { DataLocalPagosComprobantesService } from 'src/app/services/data-local-pagos-comprobantes.service';

@Component({
  selector: 'app-pagos-comprobantes',
  templateUrl: './pagos-comprobantes.page.html',
  styleUrls: ['./pagos-comprobantes.page.scss'],
})
export class PagosComprobantesPage implements OnInit {

  textoBuscar ='';

  constructor(public dataLocalPagosComprobantesService: DataLocalPagosComprobantesService) { }

  ngOnInit() {
  }
  buscar( event ){
    console.log('pagos comprobantes.buscar()');
    this.textoBuscar = event.detail.value;
  }

}
