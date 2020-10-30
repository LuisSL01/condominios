import { Component, OnInit } from '@angular/core';
import { DataLocalAvisoService } from 'src/app/services/data-local-aviso.service';
import { Aviso } from 'src/app/models/aviso.model';


@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.page.html',
  styleUrls: ['./avisos.page.scss'],
})
export class AvisosPage implements OnInit {
  /*   numero: number = 1;
    fecha: Date = new Date(); */
  textoBuscar = '';

  public avisosList: Aviso[];

  constructor(public dataLocalAvisoService: DataLocalAvisoService) { 
    this.avisosList = this.dataLocalAvisoService.avisos;
  }

  ngOnInit() {
  }

  buscar(event) {
    console.log('aviso.buscar()');
    this.textoBuscar = event.detail.value;
    
    this.avisosList = this.dataLocalAvisoService.avisos;
    if (this.textoBuscar === '') {
      return;
    }else{

      console.log('this.textoBuscar', this.textoBuscar);
      this.textoBuscar = this.textoBuscar.toLowerCase();
      console.log('antes de entrar al filter');
      
      this.avisosList = this.avisosList.filter(item => {
        /* console.log(item.titulo.toLowerCase());
        console.log(this.textoBuscar);
        console.log(item.titulo.toLowerCase().includes(this.textoBuscar)); */
        return (item.titulo.toLowerCase().includes(this.textoBuscar)
         || item.mensaje.toLowerCase().includes(this.textoBuscar)
          );
      }

      );

      console.log('despues de terminar el filter');
      
    }


  }
}
