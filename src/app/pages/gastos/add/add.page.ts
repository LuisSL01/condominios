import { Component, OnInit } from '@angular/core';
import { Gasto } from '../../../models/gasto.model';
import { DataLocalGastoService } from '../../../services/data-local-gasto.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  gasto: Gasto = new Gasto();

  constructor(private dataLocalGastoService : DataLocalGastoService) {
    console.log('im in constructor of gastos');
    
   }

  ngOnInit() {
  }
  cambioFecha(event){
    console.log('cambio fecha..');
    this.gasto.fechaGasto = new Date(event.detail.value);
  }
  save(){
    console.log('save a new gasto');
    console.log(this.gasto);
    this.dataLocalGastoService.guardarGasto(this.gasto);
  }

}
