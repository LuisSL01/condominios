import { Component, OnInit } from '@angular/core';
import { DataLocalAvisoService } from 'src/app/services/data-local-aviso.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.page.html',
  styleUrls: ['./avisos.page.scss'],
})
export class AvisosPage implements OnInit {
/*   numero: number = 1;
  fecha: Date = new Date(); */
  textoBuscar = '';
  constructor(public dataLocalAvisoService:DataLocalAvisoService) { }

  ngOnInit() {
  }

  buscar( event ){
    console.log('aviso.buscar()');    
    this.textoBuscar = event.detail.value;
  }



/*   cambioFecha(event){    
    console.log(this.numero, 'cambioFecha', event);      
    this.numero++;
    this.fecha = new Date(event.detail.value);
    console.log('cambio fecha',new Date(event.detail.value));
  } */
}
