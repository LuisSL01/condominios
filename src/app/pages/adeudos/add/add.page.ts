import { Component, OnInit } from '@angular/core';
import { AdeudoPago } from '../../../models/adeudo-pago.model';
import { AdeudoService } from '../../../services/adeudo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
  edit:boolean = false;

  createAdeudo = this.fb.group({
    //Esto para construir los formularios dinamicamente
    destinatario: ["", [Validators.required]],
    agenteAdeuda: ["",],
    data: this.fb.group({
      concepto: ["", [Validators.required]],
      descripcion: ["",],
      cantidad: ["", [Validators.required]],
      fechaCubrir: [new Date()],
      registroOriginal:[true],//Para diferenciar los creados manualmente y los automaticos desde el servidor
      recurrente:[false],
      periodo:[""],
    })
  });

  idEmpresa:number;
  idAgente:number;
  adeudoChangesForm: FormGroup;


  constructor(private adeudoService: AdeudoService,
    private router: Router,
    private fb: FormBuilder,
    public activatedRoute: ActivatedRoute,
    private userData:UserData,
    private agenteService:AgenteService) { 
    }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
    this.adeudo = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));    
    if(this.adeudo != null) this.prepareEdit();
    else this.adeudo = new AdeudoPago();

    this.buscarAgentes();
  }
  prepareEdit(){
    console.log('prepareEdit');
    this.edit = true;
    this.createAdeudo = this.fb.group({
      data: this.fb.group({        
        concepto: [this.adeudo.data.concepto],
        descripcion: [this.adeudo.data.descripcion],
        cantidad: [this.adeudo.data.cantidad],
        fechaCubrir: [this.adeudo.data.fechaCubrir],
        recurrente:[this.adeudo.data.recurrente],
        periodo:[this.adeudo.data.periodo],
        registroOriginal:[this.adeudo.data.registroOriginal],
      })
    });
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

    if(this.edit) this.editar();
    else this.nuevo();

/* 
    this.dataLocalAdeudoService.guardarAdeudo(this.adeudo);
    this.router.navigate(['/pagos/adeudos']); */
  }

  nuevo(){
    
    console.log(this.createAdeudo.value);
    let soloUnAgente:boolean = this.createAdeudo.value.destinatario === 'solo-uno' ? true:false;
    if(soloUnAgente){
      //Debo crear el adeudo a solo un agente      
          const adeudoObj = {
            empresa : this.idEmpresa,
            agenteCreador : this.idAgente,
            agenteAdeuda : this.createAdeudo.value.agenteAdeuda,
            data: this.createAdeudo.value.data
          };
          console.log('Objeto enviado..'+ JSON.stringify(adeudoObj));
          this.adeudoService.save(adeudoObj).subscribe((data) => {
              console.log(data);
              if (data.status === 200) { 
                this.createAdeudo.reset();                
                this.router.navigate(['/adeudos', { item: true}]);
              } else {this.userData.showToast('Error al registrar el adeudo, llego otro status');}
            },
            (err) => {console.log(err);this.userData.showToast("Error: "+ err);
            },() => {}
          );
    }else{
      //Debo crear el adeudo a todos los agentes de las empresa seleccionada
      const adeudoObj = {
        empresa : this.idEmpresa,
        agenteCreador : this.idAgente,
        data: this.createAdeudo.value.data
       /*  concepto: this.createAdeudo.value.concepto,
        descripcion: this.createAdeudo.value.descripcion,
        cantidad: this.createAdeudo.value.cantidad,
        fechaCubrir: this.createAdeudo.value.fechaCubrir  */ 
      };
      console.log('Objeto enviado..'+ JSON.stringify(adeudoObj));
      this.adeudoService.saveByEmpresa(this.idEmpresa, adeudoObj).subscribe((data) => {
          console.log(data);
          if (data.status === 200) {
            this.userData.showToast('registrado correctamente');       
            this.createAdeudo.reset();     
            this.router.navigate(['/adeudos', { item: true}]);
          } else {this.userData.showToast('Error al registrar el adeudo, llego otro status');}
        },
        (err) => {console.log(err);this.userData.showToast("Error: "+ err);
        },() => {}
      );
    }
  }
  editar(){
//falta editar el nuevo.... y filtrar registros
    console.log('editar()...');    
    this.adeudoChangesForm = this.fb.group({});
    this.getDirtyFields();
    console.log('adeudoChangesForm', JSON.stringify(this.adeudoChangesForm.value));
    this.adeudoService.update(this.adeudo.id, this.adeudoChangesForm.value).subscribe(data => {
      if (data.status === 200) {
        this.createAdeudo.reset();
        this.userData.showToast('editado correctamente');        
        this.router.navigate(['/adeudos', { item: true}]);
      } else {
        this.userData.showToast('Error al editar registro, llego otro status');
      }
    }, err => {
      console.log(err);this.userData.showToast("Error: "+ err);
    },
      () => {
      });
  }

  getDirtyFields() {
    
    Object.keys(this.createAdeudo['controls'].data['controls']).forEach(key => {
      if (this.createAdeudo.get('data').get(key).dirty) {
        this.adeudoChangesForm.addControl(key, this.createAdeudo.get('data').get(key));
      }
    });
  }



  cambioFechaVence(event) {
    console.log('cambio fecha vence: ', event);
    /* this.anuncio.fechaVence = this.momentjs()(event.detail.value);  */    
    /* this.adeudo.fechaCubrir = new Date(event.detail.value); */
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
