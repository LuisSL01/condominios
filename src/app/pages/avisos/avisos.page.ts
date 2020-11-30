import { Component, OnInit, ViewChild } from '@angular/core';
import { DataLocalAvisoService } from 'src/app/services/data-local-aviso.service';

import { IonInfiniteScroll } from '@ionic/angular';
import { Publicacion } from '../../models/publicacion.model';


@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.page.html',
  styleUrls: ['./avisos.page.scss'],
})
export class AvisosPage implements OnInit {
  /*   numero: number = 1;
    fecha: Date = new Date(); */
  textoBuscar = '';

  public avisosList: Publicacion[];

  @ViewChild(IonInfiniteScroll) infiniteScroll : IonInfiniteScroll;
  //Con esto recuperamos el componente de la vista y al estar tipado obtenemos la ayuda de typescript
                                                                    

  constructor(public dataLocalAvisoService: DataLocalAvisoService) {
    this.avisosList = this.dataLocalAvisoService.avisos;
  }

  ngOnInit() {
  }

  buscar(event) {
    /* await this.dataLocalAvisoService.buscar(event.detail.value); */    
    this.textoBuscar = event.detail.value;    
    this.avisosList = this.dataLocalAvisoService.avisos;
    if (this.textoBuscar === '') {
      return;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();      
      this.avisosList = this.avisosList.filter(item => {
        return (item.titulo.toLowerCase().includes(this.textoBuscar)
         || item.descripcion.toLowerCase().includes(this.textoBuscar)
          );
      }
      ); 
    }


  }

  loadData(event){
    /* console.log(event); */

    setTimeout(() => {

  /*     if(this.avisosList.length > 30){
        //Aqui debemos saber cuando ya no hay mas registros que reecuperar de la
        //BD
        this.infiniteScroll.complete();
        this.infiniteScroll.disabled = true;//Para ocultar el componente y ya no carge mas
        return;
      }

      //En este ejemplo se crean 10 nuevos elementos y se insertan en el arreglo
      //Aqui deberiamos estar recuperando los 10 nuevos de la base de datos
      const nuevoArr = Array(10);
      this.avisosList.push(...nuevoArr); */


      this.infiniteScroll.complete();


      /* event.target.complete(); */
    }, 1500);

  }
}
