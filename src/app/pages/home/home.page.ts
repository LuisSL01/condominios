import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataLocalService } from '../../services/data-local.service';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserOptions } from '../../interfaces/user-option';
import { UserData } from '../../providers/user-data';
import { EmpresaPage } from '../empresa/empresa.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  login: UserOptions = { username: '', password: '' };
  load: any;
  idAgente: number = 0;
  empresas: any[] = [];

  constructor(
    public userData: UserData,
    private authService: AuthService,
    public loadingController: LoadingController,
    private toastr: ToastController,
    public alertController: AlertController,
    public storage: Storage,
    private router: Router,
    private dataLocalService: DataLocalService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }


  onLogin() {
    console.log("onLogin()");
    console.log('this.user:' + this.login.username);
    console.log('this.pass:' + this.login.password);

    const loginPayload = {
      username: this.login.username,
      password: this.login.password
    }
    console.log("loginPayload: " + loginPayload);
    this.showLoading();
/* 
       this.authService.login(loginPayload).subscribe(data => {
         if (data.status === 200) {
           window.localStorage.setItem('userDetails', JSON.stringify(data.result));
           this.storage.set('userDetails', JSON.stringify(data.result));
           if (data.result.roles.indexOf('ROLE_AUTO_REGISTRADO') > -1 || data.result.roles.indexOf('ROLE_VALIDACION_PENDIENTE') > -1) {
             this.router.navigate(['/']);
             this.showToast("El usuario " + data.result.nombreCompleto + ", no esta activo para la aplicación móvil");
           } else {
             //Aqui debo preguntar a cuantas empresas tiene acceso
             console.log("data.result del login: "+data.result);             
             let idAgente:number;
             this.idAgente = 4;
             this.authService.getListEmpresas(this.idAgente).subscribe(data => {
              console.log("getListEmpresas: data: "+data);              
              if (data.status === 200) {
                this.empresas = data.result;
                console.log("estatus200:" + this.empresas);
                if(this.empresas.length == 1){//Debo redirecionar al inicio, solo hay una empresa
                  this.userData.login(this.login.username);
                this.router.navigateByUrl('/inicio');
                this.showToast("Bienvenido " + data.result.nombreCompleto);
                }else if(this.empresas.length > 1){
                  this.presentModalListEmpresas()//Debo presentar el modal para seleccionar una empresa
                }else{
                  console.log("Error al recuperar empresas..");//Error al recuperar las empresas del user
                }                
              }
            }, err => {
              console.log('Error al buscar las empresas');
            });
           }
         }
       }, err => {
         this.showToast("Error usuario o contraseña inválidos");
       }); */

    //******************************* 
    if (loginPayload.username.toLowerCase() === 'test1'
      && loginPayload.password.toLowerCase() === 'test1') {
      this.dataLocalService.idempresa = 1;//Aqui es cuando se podra setear el id del usuario que se este logueando
      this.dataLocalService.miIdAgente = 10;
      this.idAgente = 14;
      this.buscarEmpresasAgente();
      console.log("empresas: " + this.empresas);
      if (this.empresas.length === 1) { //Debo redirecionar al inicio, solo hay una empresa
        this.userData.login(this.login.username);
        this.router.navigateByUrl('/inicio');
        this.showToast("Bienvenido a la residencia: "+ this.empresas[0].nombre);
      } else if (this.empresas.length > 1) {
        this.presentModalListEmpresas()//Debo presentar el modal para seleccionar una empresa
      } else {//Error al recuperar las empresas del user
        console.log('Error al recuperar empresas');
      }
    }
    else if (loginPayload.username.toLowerCase() === 'test2'
      && loginPayload.password.toLowerCase() === 'test2') {
      this.dataLocalService.idempresa = 1;//Aqui es cuando se podra setear el id del usuario que se este logueando
      this.dataLocalService.miIdAgente = 10;
      this.idAgente = 14;
      this.buscarEmpresasAgente();
      console.log("empresas: " + this.empresas);
      if (this.empresas.length === 1) { //Debo redirecionar al inicio, solo hay una empresa
        this.userData.login(this.login.username);
        this.router.navigateByUrl('/inicio');
        this.showToast("Bienvenido a la residencia: "+ this.empresas[0].nombre);
      } else if (this.empresas.length > 1) {
        this.presentModalListEmpresas()//Debo presentar el modal para seleccionar una empresa
      } else {//Error al recuperar las empresas del user
        console.log('Error al recuperar empresas');
      }
    }
    
    else if (loginPayload.username.toLowerCase() === 'rcortes'
      && loginPayload.password.toLowerCase() === 'rcortes') {
      this.dataLocalService.idempresa = 1;//Aqui es cuando se podra setear el id del usuario que se este logueando
      this.dataLocalService.miIdAgente = 10;
      this.router.navigate(['/inicio']);
      this.showToast("Bienvenido a la RESIDENCIA EXPLANADA SUR");
    }
    else if (loginPayload.username.toLowerCase() === 'eosorio'
      && loginPayload.password.toLowerCase() === 'eosorio') {
      this.dataLocalService.idempresa = 1;//Aqui es cuando se podra setear el id del usuario que se este logueando
      this.dataLocalService.miIdAgente = 10;
      this.router.navigate(['/inicio']);
      this.showToast("Bienvenido a la RESIDENCIA EXPLANADA SUR");
    }
    else {
      this.presentAlert();
    }
  }

  buscarEmpresasAgente() {
    console.log('buscando empresas...');

    if (this.idAgente > 0) {
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
        }
        ,
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

    /*   this.authService.getListEmpresas(this.idAgente).subscribe(data => {
        console.log("getListEmpresas: data: "+data);        
        if (data.status === 200) {
          this.empresas = data.result;
          console.log("estatus200:" + this.empresas);          
        }
      }, err => {
        console.log('Error al buscar las empresas');
      }); */
    }
  }

  async presentModalListEmpresas() {
    const modal = await this.modalCtrl.create({
      component: EmpresaPage,
      componentProps: {
        empresas: this.empresas
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  loginServidor() {

  }

  showLoading() {
    this.load = this.loadingController.create({
      message: 'Iniciando session espere',
      duration: 2000
    }).then((loadingData) => {
      loadingData.present();
    });
  }

  showToast(dataMessage: string) {
    this.toastr.create({
      message: dataMessage,
      duration: 2000
    }).then((toastData) => {
      toastData.present();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      subHeader: 'Error de autenticación',
      message: 'Usuario o contraseña invalidos.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
