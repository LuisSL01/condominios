import { Component, OnInit } from '@angular/core';
import { AdeudoPago } from '../../models/adeudo-pago.model';
import { AdeudoService } from '../../services/adeudo.service';

@Component({
  selector: 'app-adeudos',
  templateUrl: './adeudos.page.html',
  styleUrls: ['./adeudos.page.scss'],
})
export class AdeudosPage implements OnInit {

  textoBuscar ="";
  public adeudos: AdeudoPago[];

  constructor(public dataLocalAdeudoService: AdeudoService) { 
    this.adeudos = dataLocalAdeudoService.adeudos;
  }

  ngOnInit() {
  }
  buscar( event ){
    console.log('adeudos.buscar()');
    this.textoBuscar = event.detail.value;
    this.adeudos = this.dataLocalAdeudoService.adeudos;

    if(this.textoBuscar === ''){
      return ;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();  
      this.adeudos = this.adeudos.filter(item => {
        return (
          (item.concepto.toLowerCase().includes(this.textoBuscar))         
          );
      }    
      );
      console.log('despues de terminar el filter');
    }
    
  }


}
