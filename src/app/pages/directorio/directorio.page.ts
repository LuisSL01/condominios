import { Component, OnInit } from '@angular/core';
import { DataLocalDirectorioService } from 'src/app/services/data-local-directorio.service';
import { Directorio } from '../../models/directorio.model';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.page.html',
  styleUrls: ['./directorio.page.scss'],
})

export class DirectorioPage implements OnInit {

  textoBuscar ='';

  public directorioList: Directorio[]; 
  constructor(public dataLocalDirectorioService:DataLocalDirectorioService) { 
    this.directorioList = this.dataLocalDirectorioService.directorios;
    console.log('en el constrictor de directoio page');
    
  }

  ngOnInit() {
  }

  buscar( event ){
    console.log('directorio.buscar()');    
    this.textoBuscar = event.detail.value;
    console.log(this.textoBuscar);

    /* this.dataLocalDirectorioService.buscar(this.textoBuscar); */



    this.directorioList = this.dataLocalDirectorioService.directorios;

    if(this.textoBuscar === ''){
      return ;
    }else{
      console.log('this.tectoBuscar: '+ this.textoBuscar);
      
      this.textoBuscar = this.textoBuscar.toLowerCase();

      console.log('antes de entrar al filter');
      
      this.directorioList = this.directorioList.filter(item => {
        return (
          (item.nombre.toLowerCase().includes(this.textoBuscar))
         || (item.apellidoP.toLowerCase().includes(this.textoBuscar))
         || (item.apellidoM.toLowerCase().includes(this.textoBuscar))
          );
      }
      
      
      );
      console.log('despues de terminar el filter');
    }
    
  }

}
