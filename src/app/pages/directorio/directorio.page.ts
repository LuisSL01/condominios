import { Component, OnInit } from '@angular/core';
import { DataLocalDirectorioService } from 'src/app/services/data-local-directorio.service';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.page.html',
  styleUrls: ['./directorio.page.scss'],
})

export class DirectorioPage implements OnInit {

  textoBuscar ='';

  constructor(public dataLocalDirectorioService:DataLocalDirectorioService) { }

  ngOnInit() {
  }

  buscar( event ){
    console.log('directorio.buscar()');    
    this.textoBuscar = event.detail.value;
  }

}
