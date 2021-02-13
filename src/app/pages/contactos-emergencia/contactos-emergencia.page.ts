import { Component, OnInit } from '@angular/core';
import { ContactosEmergenciaService } from '../../services/contactos-emergencia.service';
import { ContactosEmergencia } from '../../models/contactos-emergencia.model';

@Component({
  selector: 'app-contactos-emergencia',
  templateUrl: './contactos-emergencia.page.html',
  styleUrls: ['./contactos-emergencia.page.scss'],
})
export class ContactosEmergenciaPage implements OnInit {

  textoBuscar ='';
  public contactosList: ContactosEmergencia[];

  constructor( public dataLocalContactosEmergenciaService : ContactosEmergenciaService ) {
    this.contactosList = this.dataLocalContactosEmergenciaService.contactos;
   }

  ngOnInit() {
  }

  buscar( event ){
    console.log('contactoEmergencia.buscar()');    
    this.textoBuscar = event.detail.value;

    this.contactosList = this.dataLocalContactosEmergenciaService.contactos;

    if(this.textoBuscar === ''){
      return ;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();  
      this.contactosList = this.contactosList.filter(item => {
        return (
          (item.titulo.toLowerCase().includes(this.textoBuscar))
         || (item.nombreCompleto.toLowerCase().includes(this.textoBuscar))
          );
      }    
      );
      console.log('despues de terminar el filter');
    }
  }

}
