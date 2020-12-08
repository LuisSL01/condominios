import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { MustMatch } from '../../shared/must-match.validator';
import { CodigoPostalService } from '../../services/codigo-postal.service';
import { ApiResponse } from '../../models/api-response.model';
import { Direccion } from '../../models/direccion.model';
import { AgenteService } from '../../services/agente.service';
import { EmpresaService } from '../../services/empresa.service';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})


export class RegistrationPage implements OnInit {

  searching: boolean = false;
  searchFailed: boolean = true;
  asentamientoSelected: any;

  empresaSelected: number;



  createAgente = this.fb.group({//Esto para construir los formularios dinamicamente
    nombreCompleto: ['', [Validators.required, Validators.minLength(4)]],
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', Validators.required],
    confirmarPassword: ['', Validators.required],
    email: ['', Validators.email],
    celular: ['', null],
    fechaDeIngreso: [new Date(), Validators.required],
    autoRegistro: [true, null],
    direccion: this.fb.group({
      calle: [null, null],
      numeroExterior: ['', Validators.required],
      numeroInterior: ['', null],
      asentamiento: [null, null]
    })
  }
    ,
    {
      validator: MustMatch('password', 'confirmarPassword')
    }
  );
  asentamientos: any[] = [];
  empresas: any[] =  [];
  
  //Se inyecta en el constructor para armar los formularios reactivos..
  constructor(private fb: FormBuilder,
    private codigoPostalService: CodigoPostalService,
    private agenteService: AgenteService,
    private empresaService: EmpresaService,
    private toastr: ToastController) {
    this.buscarEmpresas();


  }
  ngOnInit() {
  }
  buscarEmpresas() {
    console.log('buscando empresas...');    
    this.empresas = [
      {
        "id": 7,
        "nombre": "RINCON ESMERALDA",
        "alias": "ESME",
        "rfc": "ASDA232323ASS",
        "urlPaginaWeb": "http://pruebaintegral.com",
        "email": "prueba@integral.com",
        "telefono": "5454322222",
        "integrantes": 4,
        "actividadEconomica": 11,
        "direccion": {
            "calle": "Otra Calle Inventada",
            "numeroExterior": "5432",
            "numeroInterior": "",
            "asentamiento": {
                "id": 66344,
                "codigoPostal": "52105",
                "colonia": "San Pedro",
                "ciudad": "San Mateo Atenco",
                "municipio": "San Mateo Atenco",
                "estado": "México"
            }
        },
        "configuracionEmpresa": {
            "logoFondoClaro": "",
            "logoFondoOscuro": "",
            "ejercicioActual": 2020,
            "mascaraCuentasContables": "9999-9999-9999-9999",
            "mesDeTrabajo": 12,
            "estructuraDeCuentas": "444400",
            "usarPlanDePagos": false,
            "usarDireccionDeEntrega": true,
            "usarCasetasDeLinea": true,
            "permitirSaldosNegativos": true
        }
    },
    {
        "id": 12,
        "nombre": "EXPLANADA SUR",
        "alias": "SUR",
        "rfc": "ERES232323222",
        "urlPaginaWeb": "http://tyv.com",
        "email": "tyv@tyv.com",
        "telefono": "4543225666",
        "integrantes": 3,
        "actividadEconomica": 11,
        "direccion": {
            "calle": "LKUNASNDA ASDAS",
            "numeroExterior": "342",
            "numeroInterior": "1",
            "asentamiento": {
                "id": 66659,
                "codigoPostal": "52303",
                "colonia": "El Carrizal",
                "ciudad": "Desconocida",
                "municipio": "Tenango del Valle",
                "estado": "México"
            }
        },
        "configuracionEmpresa": {
            "logoFondoClaro": "",
            "logoFondoOscuro": "",
            "ejercicioActual": 2020,
            "mascaraCuentasContables": "9999-9999-9999-9999",
            "mesDeTrabajo": 12,
            "estructuraDeCuentas": "444400",
            "usarPlanDePagos": false,
            "usarDireccionDeEntrega": true,
            "usarCasetasDeLinea": true,
            "permitirSaldosNegativos": true
        }
    }
  ];



  /*   this.empresaService.filterEmpresasByActividadEconomica(11).subscribe(data => {
      if (data.status === 200) {
        console.log('"data.result"', data.result);
        console.log(data.message);
        this.empresas = data.result;
      } else {
        console.log('Llego otro status');
        console.log(data.message);
      }
    },
      err => {
        console.log(err);
      }); */

  }

  guardarDatos() {
    if(this.empresaSelected > 0){      
          this.createAgente.value.direccion.asentamiento = this.asentamientoSelected;
          const agenteObj = {
            agente: {
              rfc: 'RFC' + new Date().getTime()
              , curp: 'CURP' + new Date().getTime()
              , departamento: 'RESIDENTE'
              , direccion: this.createAgente.value.direccion
              , puesto: 'RESIDENTE'
              , subClasificacion: 'SIN SUBCLASIFICACION'
              , subDepartamento: 'SIN SUBDEPARTAMENTO'
              , telefono: this.createAgente.value.celular
              , gerente: 4
              /* , fechaDeNacimiento: '01/01/2020 00:00:00.100'
              , fechaDeIngreso: '01/01/2020 00:00:00.100' *///No es necesario
              , empresa: this.empresaSelected
              , gerenteActivo: true
              /* , agenteCreador: 4 *///No es necesario
            },
            usuario: {
              username: this.createAgente.value.username
              , nombreCompleto: this.createAgente.value.nombreCompleto
              , email: this.createAgente.value.email
              , password: this.createAgente.value.password
              , autoRegistro: true
              , passwordExpirado: false
               , perfil: {id : 2} 
              /* , roles: selectedRoleIds */
            }
          };      
          console.log('objetivo enviavo: ', agenteObj);
          this.agenteService.registerUsuario(agenteObj).subscribe(data => {
            if (data.status === 200) {
              console.log('"data.result"', data.result);
              console.log('registrado coreectamente');
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
      this.showToast('necesario selecccionar una emoresa');
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
  
  showToast(dataMessage: string) {
    this.toastr.create({
      message: dataMessage,
      duration: 2000
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

