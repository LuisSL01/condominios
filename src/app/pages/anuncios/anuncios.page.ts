import { Component, OnInit } from '@angular/core';
import { DataLocalAnuncioService } from 'src/app/services/data-local-anuncio.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.page.html',
  styleUrls: ['./anuncios.page.scss'],
})
export class AnunciosPage implements OnInit {
  textoBuscar ='';
  constructor(public dataLocalAnuncioService: DataLocalAnuncioService) { }

  ngOnInit() {
  }

  buscar( event ){
    console.log('anuncio.buscar()');    
    this.textoBuscar = event.detail.value;
  }

}
