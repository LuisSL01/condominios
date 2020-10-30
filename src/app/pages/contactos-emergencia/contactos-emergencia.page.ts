import { Component, OnInit } from '@angular/core';
import { DataLocalContactosEmergenciaService } from '../../services/data-local-contactos-emergencia.service';
import { ContactosEmergencia } from '../../models/contactos-emergencia.model';

@Component({
  selector: 'app-contactos-emergencia',
  templateUrl: './contactos-emergencia.page.html',
  styleUrls: ['./contactos-emergencia.page.scss'],
})
export class ContactosEmergenciaPage implements OnInit {

  textoBuscar ='';
  public contactosList: ContactosEmergencia[];

  constructor( public dataLocalContactosEmergenciaService : DataLocalContactosEmergenciaService ) {
    this.contactosList = this.dataLocalContactosEmergenciaService.contactosEmergencia;
   }

  ngOnInit() {
  }

  buscar( event ){
    console.log('contactoEmergencia.buscar()');    
    this.textoBuscar = event.detail.value;

    this.contactosList = this.dataLocalContactosEmergenciaService.contactosEmergencia;

    if(this.textoBuscar === ''){
      return ;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();  
      this.contactosList = this.contactosList.filter(item => {
        return (
          (item.titulo.toLowerCase().includes(this.textoBuscar))
         || (item.nombre.toLowerCase().includes(this.textoBuscar))
          );
      }    
      );
      console.log('despues de terminar el filter');
    }
  }

}
