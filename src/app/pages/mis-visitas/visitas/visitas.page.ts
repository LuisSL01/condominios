import { Component, OnInit } from '@angular/core';
import { DataLocalVisitaService } from '../../../services/data-local-visita.service';
import { Visita } from '../../../models/visita.model';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.page.html',
  styleUrls: ['./visitas.page.scss'],
})
export class VisitasPage implements OnInit {
  textoBuscar='';
  public visitasList:Visita[];

  constructor(public dataLocalVisitaService: DataLocalVisitaService) { 
    this.visitasList = this.dataLocalVisitaService.visitas;
  }

  ngOnInit() {
  }
  buscar(event){
    this.textoBuscar = event.detail.value;
    this.visitasList = this.dataLocalVisitaService.visitas;

    if(this.textoBuscar === ''){
      return ;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();  
      this.visitasList = this.visitasList.filter(item => {
        return (
          (item.nombre.toLowerCase().includes(this.textoBuscar))
         || (item.duracion.toLowerCase().includes(this.textoBuscar))
          );
      }    
      );
    }
  }

}
