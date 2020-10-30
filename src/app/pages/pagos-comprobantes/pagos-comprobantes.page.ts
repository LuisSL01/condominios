import { Component, OnInit } from '@angular/core';
import { DataLocalPagosComprobantesService } from 'src/app/services/data-local-pagos-comprobantes.service';
import { PagosComprobantes } from '../../models/pagos-comprobantes.model';

@Component({
  selector: 'app-pagos-comprobantes',
  templateUrl: './pagos-comprobantes.page.html',
  styleUrls: ['./pagos-comprobantes.page.scss'],
})
export class PagosComprobantesPage implements OnInit {

  textoBuscar ='';

  public pagoComprobanteList : PagosComprobantes[];

  constructor(public dataLocalPagosComprobantesService: DataLocalPagosComprobantesService) { 
    this.pagoComprobanteList = this.dataLocalPagosComprobantesService.pagosComprobantes;
  }

  ngOnInit() {
  }
  buscar( event ){
    console.log('pagos comprobantes.buscar()');
    this.textoBuscar = event.detail.value;
    this.pagoComprobanteList = this.dataLocalPagosComprobantesService.pagosComprobantes;

    if(this.textoBuscar === ''){
      return ;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();  
      this.pagoComprobanteList = this.pagoComprobanteList.filter(item => {
        return (
          (item.mesPago.toLowerCase().includes(this.textoBuscar))
         || (item.formaPago.toLowerCase().includes(this.textoBuscar))
          );
      }    
      );
      console.log('despues de terminar el filter');
    }
    
  }

}
