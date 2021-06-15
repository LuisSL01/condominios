import { Component, OnInit } from '@angular/core';
import { AdeudoPago } from '../../../models/adeudo-pago.model';
import { AdeudoService } from '../../../services/adeudo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserData } from '../../../providers/user-data';
import { AgenteService } from '../../../services/agente.service';
import { TorreService } from '../../../services/torre.service';
import { DepartamentoService } from '../../../services/departamento.service';
import { AlertController } from '@ionic/angular';

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

  

  departamentos: any[] = [];

  conceptoAdeudos: any[] = [];

  torres: any[] = [];
  torreSelected:any;

  edit:boolean = false;

  createAdeudo = this.fb.group({
    //Esto para construir los formularios dinamicamente
    destinatario: ["",],
    agenteAdeuda: ["",],
    departamento: ["",],
    conceptoAdeudo: ["",],
    fechaCubrir: [new Date()],
    data: this.fb.group({      
      descripcion: ["",],
      importe: ["", [Validators.required]],      
      importeInteres: ["",],      
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
    public userData:UserData,
    private torreService:TorreService,
    private departamentoService:DepartamentoService,
    public alertController: AlertController,
    private agenteService:AgenteService) { 
    }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
    this.adeudo = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));    
    if(this.adeudo != null) this.prepareEdit();
    else this.adeudo = new AdeudoPago();
    /* this.buscarAgentes(); */
    this.getDataTorre();
    this.getDataConceptoAdeudo();
  }

  async getDataTorre() {
    console.log('getDataTorree');
    this.userData.showToast('Buscando torres/privadas');
    await this.torreService.getTorresFull(this.idEmpresa).subscribe((data) => {
      console.log(data);
      if (data.status === 200) {
        this.torres = data.result;
        if(this.torres.length ===0){
          this.userData.showToast('No tiene torres/privadas registradas');
        }else{
          this.userData.showToast( this.torres.length +' torres/privadas encontrados');
        }
      } else {
        this.userData.showToast('error al recuperar registros de torre' + data.status);
      }
    },
      (err) => {
        this.userData.showToast('error en el servicio al recuperar registros de torre');
      }
    );
  }

  async getDataConceptoAdeudo() {          
    await this.adeudoService.getConceptoAdeudoAllPorEmpresa(this.idEmpresa).subscribe((data) => {          
      if (data.status === 200) {
        this.conceptoAdeudos = data.result;            
        if(this.conceptoAdeudos.length ===0){
          this.userData.showToast('No tiene conceptos de adeudo registrados');
        }
      }else this.userData.showToast('Error al conceptos de adeudo', 'warning');
    },
      (err) => { this.userData.showToast('Error en el servicio, catalogo de conceptos de adeudo','danger'); }
    );  
}

  addConceptoAdeudo() {
    this.presentAlertCreateConceptoAdeudo();
  }

  editConceptoAdeudo() {
    if(this.createAdeudo.value.conceptoAdeudo){
      let idRegistro = this.createAdeudo.value.conceptoAdeudo;
      console.log('buscar el registro de '+idRegistro);
      let registro = this.conceptoAdeudos.find(el =>el.id == idRegistro );
      if(registro){
        console.log('registro encontrado: '+JSON.stringify(registro));
        this.presentAlertEditConceptoAdeudo(registro);
      }else{
        this.userData.showToast('Debe elegir un registro a editar','warning');
      }
    }else{
      this.userData.showToast('Debe elegir un registro a editar','warning');
    }
  }

  async presentAlertCreateConceptoAdeudo() {
    const alert = await this.alertController.create({
      cssClass: 'alertHeader',
      header: 'Confirmar!',
      message: 'Crear nuevo concepto de adeudo',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre'
        },        
        {
          name: 'porcentaje',
          type: 'number',
          placeholder: 'porcentaje-interés(0-100)',
          min: 0,
          max: 100
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Guardar',
          handler: (alertData) => {
            console.log('Confirm Okay');
            if(alertData && alertData.name){
              const porcentaje = alertData.porcentaje;
              if(!(porcentaje >= 0 && porcentaje<=100)){
                this.userData.showToast('El porcentaje debe estar entre 0 y 100','warning');
                return;
              }

              let objdataConcepto ={}
              if(porcentaje > 0){
                objdataConcepto ={
                  aplicaInteres : true,
                  porcentajeInteres : (porcentaje/100)
                }
              }else{
                objdataConcepto ={
                  aplicaInteres : false,
                  porcentajeInteres : 0
                }
              }
              let nombreConcepto:string =alertData.name;

              const conceptoAdeudoObj = {
                empresa: this.idEmpresa,
                nombre : nombreConcepto.toUpperCase(),
                data: objdataConcepto
              };
              console.log('Objeto enviado..' + JSON.stringify(conceptoAdeudoObj));
              this.adeudoService.saveConceptoAdeudo(conceptoAdeudoObj).subscribe((data) => {
                console.log(data);
                if (data.status === 200) {
                  this.userData.showToast('registrado correctamente', 'success');
                  this.conceptoAdeudos.unshift(data.result);
                } else { 
                  this.userData.showToast('Error al registrar', 'warning'); }
              },
                (err) => {                  
                  this.userData.showToast('Error en el servicio al registrar', 'danger');
                }, () => { }
              );
            }else{
              this.userData.showToast('Error, el nombre es necesario', 'warning');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertEditConceptoAdeudo(obj:any) {
    const alert = await this.alertController.create({
      cssClass: 'alertHeader',
      header: 'Confirmar!',
      message: 'Editando registro '+obj.nombre,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
          value:obj.nombre
        },        
        {
          name: 'porcentaje',
          type: 'number',
          placeholder: 'porcentaje-interés(0-100)',
          min: 0,
          max: 100,
          value:(obj.data.porcentajeInteres * 100)
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Guardar',
          handler: (alertData) => {
            console.log('Confirm Okay');
            if(alertData && alertData.name){
              const porcentaje = alertData.porcentaje;
              if(!(porcentaje >= 0 && porcentaje<=100)){
                this.userData.showToast('El porcentaje debe estar entre 0 y 100','warning');
                return;
              }

              let objdataConcepto ={}
              if(porcentaje > 0){
                objdataConcepto ={
                  aplicaInteres : true,
                  porcentajeInteres : (porcentaje/100)
                }
              }else{
                objdataConcepto ={
                  aplicaInteres : false,
                  porcentajeInteres : 0
                }
              }
              let nombreConcepto:string =alertData.name;

              const conceptoAdeudoObj = {                
                nombre : nombreConcepto.toUpperCase(),
                data: objdataConcepto
              };
              console.log('Objeto enviado..' + JSON.stringify(conceptoAdeudoObj));
              this.adeudoService.updateConceptoAdeudo(obj.id, conceptoAdeudoObj).subscribe((data) => {
                if (data.status === 200) {
                  var index = this.conceptoAdeudos.indexOf(obj);
                  if (index > -1) {
                    console.log('removiendo el elemento editado');                    
                    this.conceptoAdeudos.splice(index, 1);//Quitamos el que existia y agregamos el editado
                  }            
                  this.userData.showToast('editado correctamente', 'success');
                  this.conceptoAdeudos.unshift(data.result);
                } else { 
                  this.userData.showToast('Error al registrar', 'warning'); }
              },
                (err) => {                  
                  this.userData.showToast('Error en el servicio al registrar', 'danger');
                }, () => { }
              );
            }else{
              this.userData.showToast('Error, el nombre es necesario', 'warning');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  cambioTorre(event){
    this.torreSelected = event.detail.value;
    console.log('cambio cambioTorre'+ JSON.stringify(this.torreSelected));
    this.createAdeudo.value.departamento = null;    
    this.getDataDepartamento();    
  }

  async getDataDepartamento() {    
    this.userData.showToast('Buscando inmuebles');    
      if (this.torreSelected) {
        await this.departamentoService.getDepartamentosPorTorre(this.torreSelected.id).subscribe((data) => {          
          if (data.status === 200) {
            this.departamentos = data.result;            
            if(this.departamentos.length ===0){
              this.userData.showToast('No tiene inmuebles registrados');
            }else{
              this.userData.showToast(this.departamentos.length+' inmuebles encontrados');
            }
          }
          else this.userData.showToast('error al recuperar registros');
        },
          (err) => { this.userData.showToast('error al recuperar registros'); }
        );
      } else {
        this.userData.showToast('Debe seleccionar una torre para listar los departamentos');
      }   
  }

  




  prepareEdit(){
    console.log('prepareEdit');
    this.edit = true;
    console.log('this.adeudo.data.fechaCubrir ->',this.adeudo.data.fechaCubrir);
    console.log('this.adeudo.fechaCubrir ->',this.adeudo.fechaCubrir);
    
    this.createAdeudo = this.fb.group({
      conceptoAdeudo: [this.adeudo.conceptoAdeudo],
      fechaCubrir: [this.adeudo.fechaCubrir],
      data: this.fb.group({        
        //concepto: [this.adeudo.data.concepto],
        //descripcion: [this.adeudo.data.descripcion],
        importe: [this.adeudo.data.importe],        
        importeInteres: [this.adeudo.data.importeInteres],        
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
  /*   //Funcion para setear el dia al dia primero, se cancela
  if(this.createAdeudo.value.data){
      let fechaSel
      try {
        let anio_mes = this.createAdeudo.value.data.fechaCubrir.split("-");      
        fechaSel = new Date(
            anio_mes[0],//anio
            (anio_mes[1]-1),//numero de meses van de ->0-11
            1 //dia
        );  
        this.createAdeudo.value.data.fechaCubrir = fechaSel;
      } catch (error) {        
      }      
    } */
    
    if(this.edit) this.editar();
    else this.nuevo();

/* 
    this.dataLocalAdeudoService.guardarAdeudo(this.adeudo);
    this.router.navigate(['/pagos/adeudos']); */
  }

  nuevo(){
    
    console.log(this.createAdeudo.value);
    
    let dess:string = this.createAdeudo.value.destinatario;

    if(dess == "solo-uno"){
      console.log(dess);
      //Debo crear el adeudo a solo un agente                
          const adeudoObj = {
            empresa : this.idEmpresa,
            agenteCreador : this.idAgente,
            agenteAdeuda : this.createAdeudo.value.agenteAdeuda,
            departamento : this.createAdeudo.value.departamento,
            conceptoAdeudo: this.createAdeudo.value.conceptoAdeudo,
            fechaCubrir: this.createAdeudo.value.fechaCubrir,
            status:22,//al crearse se crean como pendiente
            data: this.createAdeudo.value.data
          };
          console.log('Objeto enviado..'+ JSON.stringify(adeudoObj));          
          this.adeudoService.save(adeudoObj).subscribe((data) => {
              console.log(data);
              if (data.status === 200) {
                this.createAdeudo.reset();
                this.router.navigate(['/adeudos', { item: true}]);
              } else {this.userData.showToast('Error al registrar el adeudo');}
            },
            (err) => {
              console.log(err);this.userData.showToast("Error: "+ err);
              this.userData.showToast('Error en el servicio al registrar adeudo');
            },() => {}
          );
          
    }else if(dess == "torre_privada"){
      console.log(dess);
      //Debo crear el adeudo a todos los agentes de las empresa seleccionada      
      const adeudoObj = {
        empresa : this.idEmpresa,
        agenteCreador : this.idAgente,
        conceptoAdeudo: this.createAdeudo.value.conceptoAdeudo,
        fechaCubrir: this.createAdeudo.value.fechaCubrir,
        data: this.createAdeudo.value.data       
      };
      if(this.torreSelected){
        console.log('Objeto enviado..'+ JSON.stringify(adeudoObj));
        this.adeudoService.saveByTorre(this.torreSelected.id, adeudoObj).subscribe((data) => {
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
      }else{
        this.userData.showToast('Debe seleccionar una torre /privada');
      }
    }else if(dess == "todos"){
      console.log(dess);      
      //Debo crear el adeudo a todos los agentes de las empresa seleccionada
      const adeudoObj = {
        empresa : this.idEmpresa,
        agenteCreador : this.idAgente,
        fechaCubrir: this.createAdeudo.value.fechaCubrir,
        data: this.createAdeudo.value.data      
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

    let formData = this.adeudoChangesForm.value;
    if (formData.fechaCubrir) {
      this.adeudoChangesForm.value.fechaCubrir = new Date(formData.fechaCubrir).getTime();  //en caso de que la fecha se haya editado se obtiene el datatime    
    }

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
    
    /* Object.keys(this.createAdeudo['controls'].data['controls']).forEach(key => {
      if (this.createAdeudo.get('data').get(key).dirty) {
        this.adeudoChangesForm.addControl(key, this.createAdeudo.get('data').get(key));
      }
    }); */

    Object.keys(this.createAdeudo['controls']).forEach(key => {      
      if (this.createAdeudo.get(key).dirty) {
        this.adeudoChangesForm.addControl(key, this.createAdeudo.get(key));
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
