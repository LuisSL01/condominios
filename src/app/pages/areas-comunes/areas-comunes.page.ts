import { Component, OnInit } from '@angular/core';
import { DataLocalAreaComunService } from '../../services/data-local-area-comun.service';
import { AreaComun } from '../../models/area-comun.model';

@Component({
  selector: 'app-areas-comunes',
  templateUrl: './areas-comunes.page.html',
  styleUrls: ['./areas-comunes.page.scss'],
})
export class AreasComunesPage implements OnInit {

  textoBuscar='';
  public areasList:AreaComun[];

  constructor(public dataLocalAreaComunService: DataLocalAreaComunService) {
    this.areasList = this.dataLocalAreaComunService.areasComunes;
   }

  ngOnInit() {
  }

  buscar(event){
    
    console.log('areacomun.buscar()');

    this.textoBuscar = event.detail.value;
    this.areasList = this.dataLocalAreaComunService.areasComunes;

    if(this.textoBuscar === ''){
      return ;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();  
      this.areasList = this.areasList.filter(item => {
        return (
          (item.nombre.toLowerCase().includes(this.textoBuscar))
          || (item.descripcion.toLowerCase().includes(this.textoBuscar))
          );
      }    
      );
      console.log('despues de terminar el filter');
    }


  }

}
