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
  user: string;

  constructor(
    public userData: UserData,
    private authService: AuthService,
    public loadingController: LoadingController,
    private toastr: ToastController,
    public alertController: AlertController,
    public storage: Storage,
    private router: Router,
    private dataLocalService: DataLocalService,
    private modalCtrl: ModalController,
    private agenteService: AgenteService,
    private pushService: PushService
  ) {

    this.storage.get('userDetails').then((val) => {
      if (val) {
        if(val.id){
          this.showLoading();
          this.userData.setConfigEmpresa();
          this.router.navigate(['/inicio']);
          this.showToast("Bienvenido " + JSON.parse(val).nombreCompleto);
        }        
      }
    });

  }

  ngOnInit() { }

  onLogin() {
    console.log("onLogin()");
    console.log("this.user:" + this.login.username);
    console.log("this.pass:" + this.login.password);

    if (this.login.username === "" || this.login.password === "") {
      this.showToast("Se necesita usuario y contraseña")
      return;
    }


    const objAgente = {
      /* dispositivoUuid: this.pushService.userId       */
    };

    const loginPayload = {
      username: this.login.username,
      password: this.login.password,
    };



    console.log("loginPayload: " + loginPayload);
    this.showLoading();

    this.user = loginPayload.username.toLowerCase();
    if (
      loginPayload.username.toLowerCase() === "test1" &&
      loginPayload.password.toLowerCase() === "test1"
    ) {//Usuario admin prueba
      window.localStorage.setItem("userDetails", JSON.stringify({ "username": "test1", "nombreCompleto": "Test1", "id": 4 }));
      this.storage.set("userDetails", JSON.stringify({ "username": "test1", "nombreCompleto": "Test1", "id": 4 }));
      this.idAgente = 4;
      this.updateAgenteCore(this.idAgente , objAgente);

      this.buscarEmpresasAgente();
      this.presentModalListEmpresas(); //Debo presentar el modal para seleccionar una empresa
    } else {
      this.authService.login(loginPayload).subscribe(data => {
        if (data.status === 200) {
          window.localStorage.setItem('userDetails', JSON.stringify(data.result));
          this.storage.set('userDetails', JSON.stringify(data.result));
          this.agenteService.getUserById(data.result.id).subscribe(userFull => {
            if (userFull.status === 200) {
              this.storage.set('userFull', userFull.result);
              if (userFull.result.activo === false) {
                this.router.navigate(['/']);
                this.showToast("El usuario " + data.result.nombreCompleto + ", no se encuentra activo para la aplicación móvil");
              } else {//Aqui debo preguntar a cuantas empresas tiene acceso                          
                this.idAgente = data.result.id;
                let nombreAgente = data.result.nombreCompleto;
                console.log("objAgente: " + objAgente);

                this.updateAgenteCore(this.idAgente , objAgente);

                this.authService.getListEmpresas(this.idAgente).subscribe(data => {
                  if (data.status === 200) {
                    this.empresas = data.result;
                    if (this.empresas.length == 1) {//Debo redirecionar al inicio, solo hay una empresa


                      /* window.localStorage.setItem('empresaData', JSON.stringify({ "nombre": this.empresas[0].nombre, "id": this.empresas[0].id }));
                      this.storage.set('empresaData', JSON.stringify({ "nombre": this.empresas[0].nombre, "id": this.empresas[0].id })); */

                      window.localStorage.setItem('empresaData', JSON.stringify(this.empresas[0]));
                      this.storage.set('empresaData', JSON.stringify(this.empresas[0]));



                      this.userData.setConfigEmpresa();
                      this.router.navigateByUrl('/inicio');
                      this.showToast("Bienvenido " + nombreAgente + " a armonía residencial");
                    } else if (this.empresas.length > 1) {
                      this.presentModalListEmpresas()//Debo presentar el modal para seleccionar una empresa
                    } else {
                      console.log("Error al recuperar empresas del agente: ", nombreAgente);//Error al recuperar las empresas del user
                    }
                  }
                }, err => {
                  console.log('Error al buscar las empresas');
                });
              }
            } else {
              console.log('Llego otro status al recuperar el usauario');
            }
          });
        } else {
          this.showToast("Error usuario o contraseña inválidos");
        }
      }, err => {
        this.showToast("Error al comunicarse con el servidor");
      });
    }
  }

  
  updateAgenteCore(id: number, datosForm: any) {
    this.agenteService.updateUsuarioCore(id, datosForm).subscribe(data => {
      console.log('data.result:: ', data.result);
      if (data.status === 200) {        
      } else {
        this.userData.showToast('Error al actualizar uuid de usuario');        
      }
    }, err => {
      console.log('error::', err);     
    },
      () => {});
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
