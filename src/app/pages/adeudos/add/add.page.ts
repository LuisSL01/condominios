import { Component, OnInit } from '@angular/core';
import { AdeudoPago } from '../../../models/adeudo-pago.model';
import { AdeudoService } from '../../../services/adeudo.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserData } from '../../../providers/user-data';
import { AgenteService } from '../../../services/agente.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  adeudo:AdeudoPago = new AdeudoPago();
  todos:boolean = true;
  ponerDescripcion = false;

  agentes: any[] =  [];

  createAdeudo = this.fb.group({
    //Esto para construir los formularios dinamicamente
    destinatario: ["", [Validators.required]],
    agenteAdeuda: ["",],
    concepto: ["", [Validators.required]],
    descripcion: ["",],
    cantidad: ["", [Validators.required]],
    fechaCubrir: [new Date()]    
  });

  idEmpresa:number;
  idAgente:number;


  constructor(private dataLocalAdeudoService: AdeudoService,
    private router: Router,
    private fb: FormBuilder,
    private userData:UserData,
    private agenteService:AgenteService) { 
      console.log('estoy en el constructor de add page adeudo');
      
    }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
    this.buscarAgentes();
  }

  buscarAgentes(){
    this.agenteService.getAllAgentesByEmpresa(this.userData.getIdEmpresa()).subscribe((data) => {
        if (data.status === 200) {
          console.log('Agentes recuperadas correctamente');
          this.agentes = data.result;
        } else {
          console.log('Llego otro status al recuperar agentes');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }


  save(){
    console.log(this.createAdeudo.value);
    let soloUnAgente:boolean = this.createAdeudo.value.destinatario === 'solo-uno' ?true:false;




    const visitaObj={
      empresa : this.idEmpresa,
      agenteCreador : this.idAgente,
      agenteAdeuda : this.createAdeudo.value.agenteAdeuda,
      concepto: this.createAdeudo.value.concepto,
      descripcion: this.createAdeudo.value.descripcion,
      cantidad: this.createAdeudo.value.cantidad,
      fechaCubrir: this.createAdeudo.value.fechaCubrir  
    };
    
/* 
    this.dataLocalAdeudoService.guardarAdeudo(this.adeudo);
    this.router.navigate(['/pagos/adeudos']); */
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
