import { Component, OnInit } from '@angular/core';
import { PagosComprobantes } from '../../models/pagos-comprobantes.model';
import { DataLocalPagosComprobantesService } from '../../services/data-local-pagos-comprobantes.service';

@Component({
  selector: 'app-validar-comprobantes',
  templateUrl: './validar-comprobantes.page.html',
  styleUrls: ['./validar-comprobantes.page.scss'],
})
export class ValidarComprobantesPage implements OnInit {

  textoBuscar ='';
  public comprobantesValidarList: PagosComprobantes[];

  constructor(public dataLocalPagosComprobantesService : DataLocalPagosComprobantesService ) { 
    this.comprobantesValidarList = this.dataLocalPagosComprobantesService.pagosComprobantes;
  }

  ngOnInit() {
  }

  buscar( event ){
    this.textoBuscar = event.detail.value;
    this.comprobantesValidarList = this.dataLocalPagosComprobantesService.pagosComprobantes;

    if(this.textoBuscar === ''){
      return ;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();  
      this.comprobantesValidarList = this.comprobantesValidarList.filter(item => {
        return (
          (item.mesPago.toLowerCase().includes(this.textoBuscar))
         || (item.formaPago.toLowerCase().includes(this.textoBuscar))
          );
      }    
      );
    }
    
  }


}
