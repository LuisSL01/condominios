import { Component, OnInit } from '@angular/core';
import { DataLocalAnuncioService } from 'src/app/services/data-local-anuncio.service';
import { Anuncio } from '../../models/anuncio.model';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.page.html',
  styleUrls: ['./anuncios.page.scss'],
})
export class AnunciosPage implements OnInit {
  textoBuscar ='';
  public anunciosList : Anuncio[];


  constructor(public dataLocalAnuncioService: DataLocalAnuncioService) { 
    this.anunciosList = this.dataLocalAnuncioService.anuncios;    
  }

  ngOnInit() {
  }

  buscar( event ){
    console.log('anuncio.buscar()');    
    this.textoBuscar = event.detail.value;
    this.anunciosList = this.dataLocalAnuncioService.anuncios;    
    if(this.textoBuscar === ''){
      return ;
    }else{
      console.log('this.textoBuscar: '+ this.textoBuscar);
      
      this.textoBuscar = this.textoBuscar.toLowerCase();

      console.log('antes de entrar al filter');
      
      this.anunciosList = this.anunciosList.filter(item => {
        return (
          (item.titulo.toLowerCase().includes(this.textoBuscar))
         || (item.descripcion.toLowerCase().includes(this.textoBuscar))
         || (item.precio.toLowerCase().includes(this.textoBuscar))
          );
      }
      );
      console.log('despues de terminar el filter');
    }
  }

}
