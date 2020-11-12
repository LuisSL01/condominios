import { Component, OnInit } from '@angular/core';
import { AdeudoPago } from '../../../models/adeudo-pago.model';
import { DataLocalAdeudoService } from '../../../services/data-local-adeudo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  adeudo:AdeudoPago = new AdeudoPago();
  todos:boolean = true;
  ponerDescripcion = false;
  constructor(private dataLocalAdeudoService: DataLocalAdeudoService,
    private router: Router) { 
      console.log('estoy en el constructor de add page adeudo');
      
    }

  ngOnInit() {
  }

  save(){
    this.dataLocalAdeudoService.guardarAdeudo(this.adeudo);
    this.router.navigate(['/adeudos']);
  }

  cambioFechaVence(event) {
    console.log('cambio fecha vence: ', event);
    /* this.anuncio.fechaVence = this.momentjs()(event.detail.value);  */
    this.adeudo.fechaCubrir = new Date(event.detail.value);
  }

  cambioDestinatario(value){
    console.log('cambioDestinatario: '+value);    
    if(value === '1'){
      this.todos = true;
    }else{
      this.todos = false;
    }
  }
  cambioConcepto(value:string){
    if(value === 'Otro'){
      this.ponerDescripcion = true;
    }else{
      this.ponerDescripcion = false;
    }  
  }

}
