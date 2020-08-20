import { Component, OnInit } from '@angular/core';
import { DataLocalGastoService } from '../../services/data-local-gasto.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  textoBuscar ='';

  constructor(public dataLocalGastoService:DataLocalGastoService) { }

  ngOnInit() {
  }

  buscar( event ){
    console.log('gasto.buscar()');    
    this.textoBuscar = event.detail.value;
  }

}
