import { Component, OnInit } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto.model';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  textoBuscar ='';
  public gastoList: Gasto[];
  constructor(public dataLocalGastoService:GastoService) {
    this.gastoList = this.dataLocalGastoService.gastos;
   }

  ngOnInit() {
  }

  buscar( event ){
    console.log('gasto.buscar()');    
    this.textoBuscar = event.detail.value;
    this.gastoList = this.dataLocalGastoService.gastos;

    if(this.textoBuscar === ''){
      return ;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();  
      this.gastoList = this.gastoList.filter(item => {
        return (
          (item.tipoGasto.toLowerCase().includes(this.textoBuscar))
         || ((item.cantidad+"").toLowerCase().includes(this.textoBuscar))
         || (item.descripcion.toLowerCase().includes(this.textoBuscar))
         || (item.formaPago.toLowerCase().includes(this.textoBuscar))
          );
      }    
      );
      console.log('despues de terminar el filter');
    }


  }

}
