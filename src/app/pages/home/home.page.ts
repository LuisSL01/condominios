import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { Router } from "@angular/router";
import { DataLocalService } from "../../services/data-local.service";
import { AuthService } from "../../services/auth.service";
import { LoadingController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { UserOptions } from "../../interfaces/user-option";
import { UserData } from "../../providers/user-data";
import { EmpresaPage } from "../empresa/empresa.page";
import { AgenteService } from '../../services/agente.service';
import { PushService } from '../../services/push.service';
import { isEmpty } from 'rxjs/operators';
import { LogService } from '../../services/log.service';
import { DepartamentoPage } from '../departamento/departamento.page';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  login: UserOptions = { username: "", password: "" };
  load: any;
  idAgente: number = 0;
  empresas: any[] = [];
  departamentos: any[] = [];
  user: string;

  nombreCompleto ="";

  constructor(
    public userData: UserData,
    private authService: AuthService,
    public loadingController: LoadingController,
    private toastr: ToastController,
    public alertController: AlertController,
    public storage: Storage,
    private router: Router,
    private logService:LogService,
    private dataLocalService: DataLocalService,
    private modalCtrl: ModalController,
    private agenteService: AgenteService,
    private pushService: PushService,
    private ui:UiServiceService
  ) {
  }

  ngOnInit() {
   }

  onLogin() {
  
    this.logService.escribeLog("Se ha presionado iniciar sesión");

    if (this.login.username === "" || this.login.password === "") {
      this.showToast("Se necesita usuario y contraseña")
      return;
    }

    const objAgente = {
      dispositivoUuid: this.pushService.userId      
    };

    const loginPayload = {
      username: this.login.username.toLowerCase(),
      password: this.login.password,
    };

    console.log("loginPayload: " + JSON.stringify(loginPayload));
    
    this.ui.presentLoading();
    this.user = loginPayload.username.toLowerCase();
  
      this.authService.login(loginPayload).subscribe(data => {
        if (data.status === 200) {
          this.agenteService.getUserById(data.result.id).subscribe(userFull => {
            if (userFull.status === 200) {
              /* this.userData.recibeDepartamento(userFull.result.departamento); */
              this.nombreCompleto = userFull.result.nombreCompleto +" "+ userFull.result.apellidoPaterno +" " +  userFull.result.apellidoMaterno;
              if (userFull.result.activo === false) {
                this.router.navigate(['/home']);
                this.ui.dismissLoading();
                this.showToast("El usuario " + this.nombreCompleto + ", no se encuentra activo para la aplicación móvil");                
              } else {//Aqui debo preguntar a cuantas empresas tiene acceso                          
                window.localStorage.setItem('userDetails', JSON.stringify(data.result));
                this.storage.set('userDetails', JSON.stringify(data.result));
                this.storage.set('userFull', userFull.result);
                this.idAgente = data.result.id;
                
                if( ! this.isEmpty(objAgente.dispositivoUuid)){                  
                  this.agenteService.updateAgenteCore(this.idAgente , objAgente);                  
                }
                this.buscaEmpresasUsuario();                
              }
            } else {
              this.userData.showToast("Error al recuperar datos de usuario", "warning");
              this.ui.dismissLoading();
            }
          });
        } else {
          this.userData.showToast("Error al autenticar usuario", "warning");
          this.ui.dismissLoading();
        }
      }, err => {        
        this.userData.showToast("Error al autenticar usuario", "warning");
        this.ui.dismissLoading();
      });
    /* } */
  }

  buscaEmpresasUsuario(){
    if(this.idAgente > 0){
      this.authService.getListEmpresas(this.idAgente).subscribe(data => {

        if (data.status === 200) {
          this.empresas = data.result;
          if (this.empresas.length == 1) {//Debo redirecionar al inicio, solo hay una empresa
            
            window.localStorage.setItem('empresaData', JSON.stringify(this.empresas[0]));
            this.storage.set('empresaData', JSON.stringify(this.empresas[0]));
            this.userData.setConfigEmpresa();
            
            this.buscaDepartamentosAgente();
            
          } else if (this.empresas.length > 1) {
            this.presentModalListEmpresas()//Debo presentar el modal para seleccionar una empresa
          } else {
            console.log("Error al recuperar empresas del agente: ", this.nombreCompleto);//Error al recuperar las empresas del user
          }
        }
      }, err => {
        console.log('Error al buscar las empresas');
        this.ui.dismissLoading();
      });
    }
  }

  buscaDepartamentosAgente(){
    if(this.idAgente > 0){
      this.agenteService.getDepartamentosPorAgente(this.idAgente).subscribe(data=>{
        this.ui.dismissLoading();
        if(data.status === 200){
            this.departamentos = data.result;          
            if(this.departamentos.length > 1 ){
              console.log('debo mostrar los departamentos para que seleccione alguno');
              console.log(this.departamentos);
              this.presentModalListDepartamentos();
            }else{
              if(this.departamentos.length == 1){
                this.storage.set('departamentoData', this.departamentos[0]);
                this.userData.setConfigUser();
              }else{
                this.userData.setConfigUser();
              }
              this.router.navigateByUrl('/inicio');
              this.showToast("Bienvenido " + this.nombreCompleto + " a Armonía Residencial");
            }
  
        }else{
          this.showToast('Error al recuperar departamentos del usuario')
          
        }
      }, err => {                        
        this.showToast('Error en el servicio al buscar departamentos de usuario')
        this.ui.dismissLoading();
      });
    }
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }

  
 

  buscarEmpresasAgente() {//Es para pruebas locales
    console.log("buscando empresas...");
    if (this.idAgente > 0) {
      this.empresas = [
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
      ];
    }
  }

  async presentModalListEmpresas() {
    const modal = await this.modalCtrl.create({
      component: EmpresaPage,
      componentProps: {
        empresas: this.empresas,
        username: this.user,
        idAgente: this.idAgente
      },
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }

  async presentModalListDepartamentos() {
    const modal = await this.modalCtrl.create({
      component: DepartamentoPage,
      componentProps: {
        departamentos: this.departamentos
      },
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }



  showLoading() {
    this.load = this.loadingController
      .create({
        message: "Iniciando sesión, espere",
        /* duration: 2000 */
        duration: 300,
      })
      .then((loadingData) => {
        loadingData.present();
      });
  }

  showToast(dataMessage: string) {
    this.toastr
      .create({
        message: dataMessage,
        duration: 2000,
      })
      .then((toastData) => {
        toastData.present();
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Mensaje",
      subHeader: "Error de autenticación",
      message: "Usuario o contraseña inválidos.",
      buttons: ["OK"],
    });

    await alert.present();
  }
}
