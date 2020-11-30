import { Component, OnInit } from '@angular/core';

import { DataLocalConvocatoriaService } from '../../../services/data-local-convocatoria.service';
import { Publicacion } from '../../../models/publicacion.model';

@Component({
  selector: 'app-convocatorias',
  templateUrl: './convocatorias.page.html',
  styleUrls: ['./convocatorias.page.scss'],
})
export class ConvocatoriasPage implements OnInit {
  textoBuscar ='';
  public convocatoriasList:Publicacion[]; 

  constructor(public dataLocalConvocatoriaService : DataLocalConvocatoriaService) { 
    this.dataLocalConvocatoriaService.cargarRegistros();
    this.convocatoriasList = this.dataLocalConvocatoriaService.convocatorias;

  }

  ngOnInit() {
    
    console.log('en el ng on init de convocatorias');
    
  }
  
  buscar(event) {
    /* await this.dataLocalAvisoService.buscar(event.detail.value); */    
    this.textoBuscar = event.detail.value;    
    
    this.convocatoriasList = this.dataLocalConvocatoriaService.convocatorias;
    if (this.textoBuscar === '') {
      return;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();      
      this.convocatoriasList = this.convocatoriasList.filter(item => {
        return (item.titulo.toLowerCase().includes(this.textoBuscar)
         || item.descripcion.toLowerCase().includes(this.textoBuscar)
          );
      }
      ); 
    }


  }

}
