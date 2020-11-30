import { Component, OnInit } from '@angular/core';

import { DataLocalResolucionService } from '../../../services/data-local-resolucion.service';
import { Publicacion } from '../../../models/publicacion.model';

@Component({
  selector: 'app-resoluciones',
  templateUrl: './resoluciones.page.html',
  styleUrls: ['./resoluciones.page.scss'],
})
export class ResolucionesPage implements OnInit {
  textoBuscar ='';
  public resolucionesList:Publicacion[]; 

  constructor(public dataLocalResolucionService: DataLocalResolucionService) {
    console.log('en el constructor re resoliciones page');
    
    this.dataLocalResolucionService.cargarRegistros();
    this.resolucionesList = this.dataLocalResolucionService.resoluciones;

   }

  ngOnInit() {
  }

  
  buscar(event) {
    this.textoBuscar = event.detail.value;    
    
    this.resolucionesList = this.dataLocalResolucionService.resoluciones;
    if (this.textoBuscar === '') {
      return;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();      
      this.resolucionesList = this.resolucionesList.filter(item => {
        return (item.titulo.toLowerCase().includes(this.textoBuscar)
         || item.descripcion.toLowerCase().includes(this.textoBuscar)
          );
      }
      ); 
    }


  }

}
