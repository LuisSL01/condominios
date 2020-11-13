import { Component, OnInit } from '@angular/core';
import { DataLocalVotacionesService } from '../../services/data-local-votaciones.service';
import { Encuesta } from '../../models/votaciones.model';


@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.page.html',
  styleUrls: ['./votaciones.page.scss'],
})
export class VotacionesPage implements OnInit {
  textoBuscar ='';
  public votacionesList : Encuesta[];
  constructor(public dataLocalVotacionesService: DataLocalVotacionesService) {
    this.votacionesList = this.dataLocalVotacionesService.votaciones;
   }

  ngOnInit() {
  }

  
  buscar( event ){
    console.log('votaciones.buscar()');    
    this.textoBuscar = event.detail.value;

    this.votacionesList = this.dataLocalVotacionesService.votaciones;

    if(this.textoBuscar === ''){
      return ;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();  
      this.votacionesList = this.votacionesList.filter(item => {
        return (
          (item.titulo.toLowerCase().includes(this.textoBuscar))
         || (item.mensaje.toLowerCase().includes(this.textoBuscar))
          );
      }    
      );
      console.log('despues de terminar el filter');
    }
  }

}
