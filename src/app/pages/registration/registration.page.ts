import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
/* import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators'; */
import { MustMatch } from '../../shared/must-match.validator';
import { CodigoPostalService } from '../../services/codigo-postal.service';
/* import { ApiResponse } from '../../models/api-response.model';
import { Direccion } from '../../models/direccion.model'; */
import { AgenteService } from '../../services/agente.service';
import { EmpresaService } from '../../services/empresa.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TorreService } from '../../services/torre.service';
import { DepartamentoService } from '../../services/departamento.service';
import { PushService } from '../../services/push.service';
import { CreatePage } from '../empresa/create/create.page';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})


export class RegistrationPage implements OnInit {

  searching: boolean = false;
  searchFailed: boolean = true;
  asentamientoSelected: any;

  empresaSelected: any;
  torreSelected: any;
  departamentoSelected: any;






  /* createAgente = this.fb.group({//Esto para construir los formularios dinamicamente
    nombreCompleto: ['', [Validators.required, Validators.minLength(4)]],
    apellidoPaterno: ['', null],
    apellidoMaterno: ['', null],
    sexo: ['', Validators.required],
    fechaDeNacimiento: [new Date(), Validators.required],
    ocupacion: ['', Validators.required],

    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', Validators.required],
    confirmarPassword: ['', Validators.required],
    email: ['', Validators.email],
    celular: ['0000', null],
    fechaDeIngreso: [new Date(), Validators.required],

  }
    ,
    {
      validator: MustMatch('password', 'confirmarPassword')
    }
  ); */
  createAgente: FormGroup;
  asentamientos: any[] = [];
  empresas: any[] = [];

  torres: any[] = [];
  departamentos: any[] = [];

  usuariosAsociadosEmpresa:number=0;

  //Se inyecta en el constructor para armar los formularios reactivos..
  constructor(private fb: FormBuilder,
    private codigoPostalService: CodigoPostalService,
    private agenteService: AgenteService,
    private empresaService: EmpresaService,
    private router: Router,
    private pushService: PushService,
    private torreService: TorreService,
    private modalCtrl: ModalController,
    private departamentoService: DepartamentoService,
    private toastr: ToastController) {
  }
  ngOnInit() {

    this.construyeForm();
    this.buscarEmpresas();

  }

  construyeForm() {
    console.log('construye form');

    this.createAgente = this.fb.group({//Esto para construir los formularios dinamicamente
      nombreCompleto: ['', [Validators.required, Validators.minLength(4)]],
      apellidoPaterno: ['', null],
      apellidoMaterno: ['', null],
      sexo: ['Femenino', Validators.required],
      fechaDeNacimiento: [new Date(), Validators.required],
      ocupacion: ['', Validators.required],

      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required],
      confirmarPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', null],
      fechaDeIngreso: [new Date(), Validators.required],

      /* autoRegistro: [true, null],
      direccion: this.fb.group({
        calle: [null, null],
        numeroExterior: ['', null],      
        numeroInterior: ['', null],
        asentamiento: [null, Validators.required]
      }) 
      */

    }
      ,
      {
        validator: MustMatch('password', 'confirmarPassword')
      }
    );
  }

  async abrirCreateEmpresaModal() {
    console.log('abrirCreateEmpresaModal');
    
    const modal = await this.modalCtrl.create({
      component: CreatePage,      
      cssClass: 'cal-modal',
      backdropDismiss: false
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
      console.log('result', result);
      if (result.data) {        
        console.log('result.data', result.data);
        this.empresas.push(result.data);
      }       
    });
  }

  ionViewDidEnter() {
    console.log('uno ionViewDidEnter de visitas  PAGE');

  }


  buscarEmpresas() {
    console.log('buscando empresas...');
    this.empresaService.filterEmpresasByActividadEconomica(11).subscribe(data => {
      if (data.status === 200) {
        console.log('"data.result"', data.result);
        console.log(JSON.stringify(data.message));
        this.empresas = data.result;
        if (this.empresas.length === 0) {
          this.showToast("Error al recuperar fraccionamientos, verifique tenga conexión a internet", "danger");
        }
      } else {
        console.log('Llego otro status');
        console.log(data.message);
      }
    }, err => { console.log(err); });
  }

  cambioNumeroTelefono(event) {
    let phone: string = event.detail.value;
    if (phone.length <= 10) {
      this.createAgente.value.celular = phone;
    } else {
      this.showToast("El número celular no es valido, debe tener 10 digitos", "danger")
    }
  }

  cambioUsuario(event) {
    let user: string = event.detail.value;
    if (user.includes(" ")) {
      user = user.split(" ").join("");
      this.createAgente.value.username = user;
      console.log("this.createAgente.value.username", this.createAgente.value.username);
      this.showToast("No se permiten espacios en blanco en usuario", "danger")
    } else {
      console.log('else');

      this.createAgente.value.username = user;
    }
  }



  guardarDatos() {
    if (this.empresaSelected) {

      let usuario: string = this.createAgente.value.username;
      usuario = usuario.toLowerCase();

      let departamento:string="RESIDENTE";
      let estatusUser = false;
      if(this.usuariosAsociadosEmpresa === 0 ){
        console.log('resulta que no hay ningun usuario en la empresa');
        departamento="ADMINISTRADOR";//Se crea como admin y activo
        estatusUser = true;
      }


      const agenteObj = {
        agente: {
          departamento: departamento
          , direccion: this.createAgente.value.direccion
          , apellidoPaterno: this.createAgente.value.apellidoPaterno
          , apellidoMaterno: this.createAgente.value.apellidoMaterno
          , sexo: this.createAgente.value.sexo
          , ocupacion: this.createAgente.value.ocupacion
          , puesto: 'RESIDENTE'
          , subClasificacion: 'SIN SUBCLASIFICACION'
          , subDepartamento: 'SIN SUBDEPARTAMENTO'
          , telefono: this.createAgente.value.celular            
          , fechaDeNacimiento: new Date(this.createAgente.value.fechaDeNacimiento).getTime()
          , activo: estatusUser
          , empresa: this.empresaSelected.id
          , gerenteActivo: true
          //, departamentoAC: this.departamentoSelected?.id

        },
        usuario: {
          username: usuario
          , nombreCompleto: this.createAgente.value.nombreCompleto
          , email: this.createAgente.value.email
          , password: this.createAgente.value.password
          , autoRegistro: true
          , passwordExpirado: false
          , perfil: { id: 1 }
        }
      };
      console.log('objeto enviado: ', agenteObj);
      console.log(this.usuariosAsociadosEmpresa);
      
      

      const objAgente = {
        dispositivoUuid: this.pushService.userId
      };


      this.agenteService.registerUsuario(agenteObj).subscribe(data => {
        if (data.status === 200) {
          console.log('"data.result"', data.result);
          const formData = new FormData(); //Esto no esta trabajanco chido...
          formData.append("id_agente", data.result.id);
          formData.append("id_empresa", "" + this.empresaSelected.id);
          console.log("objeto enviado: ", formData);
          let idAgente = data.result.id;
          this.agenteService.addAgenteToEmpresa(formData).subscribe(
            (data) => {if (data.status === 200) {
                console.log('"data.result"', data.result);
                this.showToast("usuario asociado a fraccionamiento correctamente");
                if (!this.isEmpty(objAgente.dispositivoUuid)) {
                  console.log('debo ir actualizar el uuid');
                  this.agenteService.updateAgenteCore(idAgente, objAgente);
                }

                if(this.departamentoSelected){
                  const formDataAgenteDepto = new FormData(); //Esto no esta trabajanco chido...
                  formDataAgenteDepto.append("id_agente",idAgente);
                  formDataAgenteDepto.append("id_departamento",this.departamentoSelected.id);
                  this.agenteService.addDepartamentoToAgente(formDataAgenteDepto).subscribe(
                  (data) => {
                    if (data.status === 200) {
                      console.log('Se agrego correctamente al depto');
                    } else {
                      console.log('Error al agregar agente a departamento');                      
                    }
                  },
                  (err) => {
                    this.showToast("Error en el servicio al crear registro", 'danger');
                  },
                  () => { }
                );
                }

                this.createAgente.reset();
                this.router.navigate(["/home"]);
              } else {
                console.log('Llego otro status al asociar agente a empresa');
              }
            },
            (err) => {
              console.log(err);
              console.log('Llego otro status al asociar agente a empresa');
            },
            () => { }
          );
          //Se envia a guardar en el server
          this.showToast('Usuario registrado correctamente');
        } else {
          this.showToast('No se pudo registrar el usuario');
        }
      },
        err => {
          console.log(err);
          if (err.status === 500) {//comunmente pasa por que el campo email es unico
            this.showToast("Error al registrar, el correo ya se encuentra asociado a una cuenta", "danger");
          }
        },
        () => {

        });
      /* console.log(this.createAgente.value); */
    } else {
      this.showToast('necesario selecccionar una residencia');
    }
  }


  isEmpty(str) {
    return (!str || 0 === str.length);
  }

  validarCP() {
    this.asentamientos = [];
    this.searchFailed = true;
    console.log('cambio');
    console.log(this.createAgente.value);
    console.log(this.createAgente.value.direccion.asentamiento);
    this.codigoPostalService.filterCodigosPostales(this.createAgente.value.direccion.asentamiento).subscribe(data => {
      if (data.status === 200) {
        console.log('"data.result"', data.result);
        console.log(data.message);
        this.searchFailed = false;
        this.asentamientos = data.result;
      } else {
        console.log('Llego otro status');
        console.log(data.message);
      }
    },
      err => {
        console.log(err);
      });

    /* let data:any = this.codigoPostalService.filterCodigosPostales(
      this.createAgente.value.direccion.asentamiento); */
  }

  showToast(dataMessage: string, color_str?: string) {
    this.toastr.create({
      message: dataMessage,
      duration: 2000,
      color: color_str ? color_str : null
    }).then((toastData) => {
      toastData.present();
    });
  }

  cambioAsentamiento(event) {
    console.log('cambio asentamiento');
    this.asentamientoSelected = event.detail.value;
    console.log('this.asentamientoSelected: ', this.asentamientoSelected);
  }

  cambioEmpresa(event) {
    
    this.empresaSelected = event.detail.value;
    this.countAgentesOfEmpresa();
    if (this.empresaSelected && this.empresaSelected.configuracionEmpresa) {
      if (this.empresaSelected.configuracionEmpresa.aplicaTorres) {
        this.getDataTorre();
      } else {
        this.getDataDepartamento();
      }
    }

  }

  async getDataTorre() {
    console.log('getDataTorree');
    this.showToast("Buscando torres/privadas del fraccionamiento");
    await this.torreService.getTorresFull(this.empresaSelected.id).subscribe((data) => {
      console.log(data);
      if (data.status === 200) {
        this.torres = data.result;
        if(this.torres.length ===0){
          this.showToast('No tiene torres/privadas registradas el fraccionamiento');
        }else{
          this.showToast( this.torres.length +' torres/privadas encontrados');
        }
      } else {
        this.showToast('error al recuperar registros de torre' + data.status);
      }
    },
      (err) => {
        this.showToast('error al recuperar registros de torre');
      }
    );
  }

  async getDataDepartamento() {
    console.log('getDataDepartamento');
    this.showToast("Buscando inmuebles de la torre/privada ");
    if (this.empresaSelected.configuracionEmpresa.aplicaTorres) {
      if (this.torreSelected) {
        await this.departamentoService.getDepartamentosPorTorre(this.torreSelected.id).subscribe((data) => {
          console.log(data);
          if (data.status === 200){
            this.departamentos = data.result;
            if(this.departamentos.length ===0){
              this.showToast('No tiene inmuebles registrados en la torre/privada');
            }else{
              this.showToast( this.departamentos.length +' inmuebles encontrados');
            }
          } 
          else this.showToast('error al recuperar registros');
        },
          (err) => { this.showToast('error al recuperar registros'); }
        );
      } else {
        this.showToast('Debe seleccionar una torre para listar los departamentos');
      }
    } else {
      await this.departamentoService.getDepartamentosPorEmpresa(this.empresaSelected.id).subscribe((data) => {
        console.log(data);
        if (data.status === 200) this.departamentos = data.result;
        else this.showToast('error al recuperar registros: ' + data.status);
      },
        (err) => { this.showToast('error al recuperar registros'); }
      );
    }

  }
  
  async countAgentesOfEmpresa() {
    console.log('countAgentesOfEmpresa');  
      await this.empresaService.countUsers(this.empresaSelected.id).subscribe((data) => {
        console.log(data);
        if (data.status === 200) {
          this.usuariosAsociadosEmpresa = data.result;
        }
        else this.showToast('error 1 al contar usuarios de empresa: ' + data.status);
      },
        (err) => { this.showToast('error 2 al contar usuarios de empresa'); }
      );    
  }

  cambioTorre(event) {
    this.torreSelected = event.detail.value;
    this.departamentoSelected = null;
    console.log('cambio depto' + JSON.stringify(this.torreSelected));
    this.getDataDepartamento();

  }
  cambioDepto(event) {

    this.departamentoSelected = event.detail.value;
    console.log('cambio depto' + JSON.stringify(this.departamentoSelected));
  }

  compareWithFn = (e1, e2) => {//No funciono la implementacion
    // e2 may be an array, if multiple="true"
    if (Array.isArray(e2)) {
      return e2.indexOf(e1) !== -1;
    }
    // fallback to single element comparison
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  };



  compareWith = this.compareWithFn;
}

