import { Component, OnInit } from '@angular/core';
import { DataLocalAreaComunService } from '../../services/data-local-area-comun.service';

@Component({
  selector: 'app-areas-comunes',
  templateUrl: './areas-comunes.page.html',
  styleUrls: ['./areas-comunes.page.scss'],
})
export class AreasComunesPage implements OnInit {

  textoBuscar='';

  constructor(public dataLocalAreaComunService: DataLocalAreaComunService) { }

  ngOnInit() {
  }

  buscar(event){
    
    console.log('areacomun.buscar()');

    this.textoBuscar = event.detail.value;


  }

}
