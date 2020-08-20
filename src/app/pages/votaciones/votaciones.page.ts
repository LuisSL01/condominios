import { Component, OnInit } from '@angular/core';
import { DataLocalVotacionesService } from '../../services/data-local-votaciones.service';


@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.page.html',
  styleUrls: ['./votaciones.page.scss'],
})
export class VotacionesPage implements OnInit {
  textoBuscar ='';

  constructor(public dataLocalVotacionesService: DataLocalVotacionesService) { }

  ngOnInit() {
  }

  
  buscar( event ){
    console.log('votaciones.buscar()');    
    this.textoBuscar = event.detail.value;
  }

}
