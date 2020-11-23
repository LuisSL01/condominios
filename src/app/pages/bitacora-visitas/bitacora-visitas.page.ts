import { Component, OnInit } from '@angular/core';
import { BitacoraVisita } from '../../models/bitacora-visitas.model';
import { DataLocalBitacoraVisitaService } from '../../services/data-local-bitacora-visita.service';

@Component({
  selector: 'app-bitacora-visitas',
  templateUrl: './bitacora-visitas.page.html',
  styleUrls: ['./bitacora-visitas.page.scss'],
})
export class BitacoraVisitasPage implements OnInit {

  textoBuscar = "";

  public bitacoraRegistrosList:BitacoraVisita[];

  constructor(public dataLocalBitacoraVisitaService : DataLocalBitacoraVisitaService) {
    console.log('en el constructor de bitacora visitas 1');
    
    this.bitacoraRegistrosList = this.dataLocalBitacoraVisitaService.bitacoraVisitas;
   }

  ngOnInit() {
  }

  buscar( event ){
    console.log('bitacoraAvisos.buscar()');
    this.textoBuscar = event.detail.value;
    this.bitacoraRegistrosList = this.dataLocalBitacoraVisitaService.bitacoraVisitas;

    if(this.textoBuscar === ''){
      return ;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();
      this.bitacoraRegistrosList = this.bitacoraRegistrosList.filter(item => {
        return (
          (item.nombreCompleto.toLowerCase().includes(this.textoBuscar))
          || (item.observaciones.toLowerCase().includes(this.textoBuscar))
          );
      }    
      );      
    }    
  }
}
