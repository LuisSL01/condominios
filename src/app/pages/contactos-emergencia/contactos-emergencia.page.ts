import { Component, OnInit } from '@angular/core';
import { DataLocalContactosEmergenciaService } from '../../services/data-local-contactos-emergencia.service';

@Component({
  selector: 'app-contactos-emergencia',
  templateUrl: './contactos-emergencia.page.html',
  styleUrls: ['./contactos-emergencia.page.scss'],
})
export class ContactosEmergenciaPage implements OnInit {
  textoBuscar ='';
  constructor( public dataLocalContactosEmergenciaService : DataLocalContactosEmergenciaService ) { }

  ngOnInit() {
  }

  buscar( event ){
    console.log('contactoEmergencia.buscar()');    
    this.textoBuscar = event.detail.value;
  }

}
