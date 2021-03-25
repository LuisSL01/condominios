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
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TorreService } from '../../services/torre.service';
import { DepartamentoService } from '../../services/departamento.service';



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
  torreSelected:any;
  departamentoSelected:any;



  createAgente = this.fb.group({//Esto para construir los formularios dinamicamente
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
    celular: ['', null],
    fechaDeIngreso: [new Date(), Validators.required],
    
    /* autoRegistro: [true, null],
    direccion: this.fb.group({
      calle: [null, null],
      numeroExterior: ['', null],      
      numeroInterior: ['', null],
      asentamiento: [null, Validators.required]
    }) */

  }
    ,
    {
      validator: MustMatch('password', 'confirmarPassword')
    }
  );
  asentamientos: any[] = [];
  empresas: any[] =  [];

  torres: any[] = [];
  departamentos: any[] = [];
  
  //Se inyecta en el constructor para armar los formularios reactivos..
  constructor(private fb: FormBuilder,
    private codigoPostalService: CodigoPostalService,
    private agenteService: AgenteService,
    private empresaService: EmpresaService,
    private router: Router,
    private torreService: TorreService,
    private departamentoService: DepartamentoService,
    private toastr: ToastController) {
    


  }
  ngOnInit() {

    this.buscarEmpresas();

  }
  buscarEmpresas() {
    console.log('buscando empresas...');    
/*     this.empresas = [

    {
      "id": 32,
      "nombre": "RINCON ESMERALDA",
      "alias": "RINCON ESME"     
  },
  {
      "id": 33,
      "nombre": "EXPLANADA SUR",
      "alias": "EXP SUR"
  }
  ]; */



    this.empresaService.filterEmpresasByActividadEconomica(11).subscribe(data => {
      if (data.status === 200) {
        console.log('"data.result"', data.result);
        console.log(JSON.stringify(data.message));
        this.empresas = data.result;
      } else {
        console.log('Llego otro status');
        console.log(data.message);
      }
    },
      err => {
        console.log(err);
      });

  }

  cambioNumeroTelefono(event){
    let phone:string = event.detail.value;        
    if(phone.length <= 10){
      this.createAgente.value.celular = phone;
    }else{
      this.showToast("El número celular no es valido, debe tener 10 digitos","danger")
    }
  }

  cambioUsuario(event){
    let user:string = event.detail.value;        
    if(user.includes(" ")){
      user = user.split(" ").join("");
      this.createAgente.value.username = user;
      console.log("this.createAgente.value.username", this.createAgente.value.username);      
      this.showToast("No se permiten espacios en blanco en usuario","danger")
    }else{
      console.log('else');
      
      this.createAgente.value.username = user;
    }
  }

  guardarDatos() {
    if(this.empresaSelected){      

          /* this.createAgente.value.direccion.asentamiento = this.asentamientoSelected;
          this.createAgente.value.direccion.numeroExterior = this.createAgente.value.direccion.numeroExterior.toUpperCase();
 */
          const agenteObj = {
            agente: {              
                departamento: 'RESIDENTE'                
              , direccion: this.createAgente.value.direccion
              , apellidoPaterno: this.createAgente.value.apellidoPaterno
					    , apellidoMaterno: this.createAgente.value.apellidoMaterno
					    , sexo: this.createAgente.value.sexo
              , ocupacion: this.createAgente.value.ocupacion              
              , puesto: 'RESIDENTE'
              , subClasificacion: 'SIN SUBCLASIFICACION'
              , subDepartamento: 'SIN SUBDEPARTAMENTO'
              , telefono: this.createAgente.value.celular
              /* , fechaDeNacimiento: this.createAgente.value.fechaDeNacimiento + " 00:00:01.100 " */
              , activo:false
              , empresa: this.empresaSelected.id
              , gerenteActivo: true
              , departamentoAC: this.departamentoSelected.id

            },
            usuario: {
              username: this.createAgente.value.username
              , nombreCompleto: this.createAgente.value.nombreCompleto
              , email: this.createAgente.value.email
              , password: this.createAgente.value.password
              , autoRegistro: true
              , passwordExpirado: false
               , perfil: {id : 1} 
            }
          };      
          console.log('objetivo enviavo: ', agenteObj);

          
          

          this.agenteService.registerUsuario(agenteObj).subscribe(data => {
            if (data.status === 200) {
              console.log('"data.result"', data.result);
              const formData = new FormData(); //Esto no esta trabajanco chido...
              formData.append("id_agente", data.result.id);
              formData.append("id_empresa", ""+this.empresaSelected.id);
              console.log("objeto enviado: ", formData);
              this.agenteService.addAgenteToEmpresa(formData).subscribe(
                (data) => {
                  if (data.status === 200) {
                    console.log('"data.result"', data.result);                    
                    this.showToast("agente asociado a empresa correctamente");  
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
                () => {}

              );
              //Se envia a guardar en el server
              this.showToast('Usuario registrado correctamente');
            } else {              
              this.showToast('No se pudo registrar el usuario');
            }
          },
            err => {
              console.log(err);      
            },
            () => {
      
            });
          /* console.log(this.createAgente.value); */
    }else{
      this.showToast('necesario selecccionar una residencia');
    }
  }

  validarCP() {

   /*  this.asentamientos = [{
      "colonia": "Molino Arriba",
      "codigoPostal": "50874",
      "ciudad": "sin ciudad",
      "estado": "México",
      "id": 64552,
      "municipio": "Temoaya"
    }, {
      "colonia": "Campamento km 48",
      "codigoPostal": "50874",
      "ciudad": "sin ciudad",
      "estado": "México",
      "id": 64553,
      "municipio": "Temoaya"
    }, {
      "colonia": "Magdalena",
      "codigoPostal": "50874",
      "ciudad": "sin ciudad",
      "estado": "México",
      "id": 64554,
      "municipio": "Temoaya"
    }];
    this.searchFailed = false; */
    
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
  
  showToast(dataMessage: string, color_str?:string) {
    this.toastr.create({
      message: dataMessage,
      duration: 2000,
      color:color_str?color_str:null
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
    console.log('cambio empresa');
    console.log('event', event);
    this.empresaSelected = event.detail.value;
    if(this.empresaSelected && this.empresaSelected.configuracionEmpresa){
      if(this.empresaSelected.configuracionEmpresa.aplicaTorres){
        this.getDataTorre();
      }else{
        this.getDataDepartamento();
      }
    }
    
  }

  async getDataTorre() {
    console.log('getDataTorree');
    await this.torreService.getTorresFull(this.empresaSelected.id).subscribe((data) => {
      console.log(data);
      if (data.status === 200) {
        this.torres = data.result;
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
    if (this.empresaSelected.configuracionEmpresa.aplicaTorres) {
      if (this.torreSelected) {
        await this.departamentoService.getDepartamentosPorTorre(this.torreSelected.id).subscribe((data) => {
          console.log(data);
          if (data.status === 200) this.departamentos = data.result;
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
        else this.showToast('error al recuperar registros: '+ data.status);
      },
        (err) => { this.showToast('error al recuperar registros'); }
      );
    }

  }

  cambioTorre(event){
    this.torreSelected = event.detail.value;
    console.log('cambio depto'+ JSON.stringify(this.torreSelected));
    this.getDataDepartamento();
    
  }
  cambioDepto(event){
    
    this.departamentoSelected = event.detail.value;
    console.log('cambio depto'+ JSON.stringify(this.departamentoSelected));
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

