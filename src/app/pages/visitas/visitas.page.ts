import { Component, OnInit } from '@angular/core';
import { DataLocalVisitaService } from '../../services/data-local-visita.service';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.page.html',
  styleUrls: ['./visitas.page.scss'],
})
export class VisitasPage implements OnInit {
  textoBuscar='';
  
  constructor(public dataLocalVisitaService: DataLocalVisitaService) { }

  ngOnInit() {
  }
  buscar(event){
    console.log('visitas.buscar()');    
    this.textoBuscar = event.detail.value;
  }

}
