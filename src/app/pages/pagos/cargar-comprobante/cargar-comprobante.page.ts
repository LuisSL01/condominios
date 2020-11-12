import { Component, OnInit } from '@angular/core';
import { PagosComprobantes } from '../../../models/pagos-comprobantes.model';
import { DataLocalPagosComprobantesService } from '../../../services/data-local-pagos-comprobantes.service';

@Component({
  selector: 'app-cargar-comprobante',
  templateUrl: './cargar-comprobante.page.html',
  styleUrls: ['./cargar-comprobante.page.scss'],
})
export class CargarComprobantePage implements OnInit {
  textoBuscar ='';

  public pagoComprobanteList : PagosComprobantes[];
  constructor(public dataLocalPagosComprobantesService:DataLocalPagosComprobantesService) { 
    console.log('estoy en el constructor de cargar comprobante');    
    this.pagoComprobanteList = this.dataLocalPagosComprobantesService.pagosComprobantes;

    console.log('this.pagoComprobanteList: '+this.pagoComprobanteList);
    
    
  }

  ngOnInit() {
  }

  buscar( event ){
    console.log('cargar comprobante pafo.buscar()');
    this.textoBuscar = event.detail.value;
    this.pagoComprobanteList = this.dataLocalPagosComprobantesService.pagosComprobantes;

    console.log('texto a buscar: '+ this.textoBuscar);
    console.log('this.pagoComprobanteList: '+this.pagoComprobanteList);
    
    
    if(this.textoBuscar === ''){
      console.log('entre en el if');
      
      return ;
    }else{
      console.log('entre en el else');
      
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
    
    console.log('terminando de buscar: '+ this.pagoComprobanteList);
    
  }

}
