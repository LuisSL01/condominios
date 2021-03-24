import { Component, OnInit } from '@angular/core';
import { TorreService } from '../../services/torre.service';
import { UserData } from '../../providers/user-data';
import { AlertController, ToastController } from '@ionic/angular';

import { DepartamentoService } from '../../services/departamento.service';
import { Storage } from "@ionic/storage";
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-configuracion-emp',
  templateUrl: './configuracion-emp.page.html',
  styleUrls: ['./configuracion-emp.page.scss'],
})
export class ConfiguracionEmpPage implements OnInit {


  torres: any[] = [];
  departamentos: any[] = [];

  idEmpresa: number;
  aplicaTorres: boolean = false;
  torreSelected: any;

  dataRegistro = {};

  crearRegistroTorre: boolean = false;
  crearRegistroDepartamento: boolean = false;

  mensajeStr: string;

  constructor(private torreService: TorreService,
    private departamentoService: DepartamentoService,
    private empresaService: EmpresaService,
    public alertController: AlertController,
    private toastCtrl: ToastController,
    public storage: Storage,
    private userData: UserData) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.aplicaTorres = this.userData.getAplicaTorres();

  }

  ionViewDidEnter() {
    if(this.aplicaTorres){
      this.getDataTorre();
    }else{
      this.getDataDepartamento();
    }
      

    
  }


  addTorre() {
    this.crearRegistroTorre = true;
    this.mensajeStr = "Crear una nueva torre";
    this.presentAlertCreateTorre();
  }


  showToastAlert(dataMessage: string) {
    this.toastCtrl.create({
      message: dataMessage,
      color: "warning",
      duration: 2000
    }).then((toastData) => {
      toastData.present();
    });
  }

  addDepartamento() {
    if (this.aplicaTorres) {
      if (this.torreSelected) {
        this.mensajeStr = "Crear una nuevo departamento en la torre: " + this.torreSelected.data.nombre;
      } else {
        this.showToastAlert('Es necesario seleccionar una torre');
        return;
      }
    } else {
      this.mensajeStr = "Crear una nuevo departamento ";
    }
    this.crearRegistroDepartamento = true;
    this.presentAlertCreateDepartamento();
  }

  cambioTorre() {
    console.log('cambio torre');
    this.getDataDepartamento();
  }

  cambiaAplicaTorre(){
    console.log('cambia aplica torre');
    if(this.aplicaTorres){
      this.getDataTorre();
    }else{
      this.torreSelected = null;
    }    
  }

  async presentAlertCreateTorre() {
    const alert = await this.alertController.create({
      cssClass: 'alertHeader',
      header: 'Confirmar!',
      message: this.mensajeStr,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre'
        }
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
            this.dataRegistro = {
              nombre: alertData.name
            }
            this.crearTorre();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertCreateDepartamento() {
    const alert = await this.alertController.create({
      cssClass: 'alertHeader',
      header: 'Confirmar!',
      message: this.mensajeStr,
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre'
        }
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
            this.dataRegistro = {
              nombre: alertData.name
            }
            this.crearDepartamento();
          }
        }
      ]
    });

    await alert.present();
  }

  async crearTorre() {
    console.log('crear torre');

    const torreObj = {
      empresa: this.idEmpresa,
      data: this.dataRegistro
    };
    console.log('Objeto enviado..' + JSON.stringify(torreObj));
    await this.torreService.save(torreObj).subscribe((data) => {
      console.log(data);
      if (data.status === 200) {
        this.userData.showToast('registrado correctamente');
        this.getDataTorre();
        this.crearRegistroTorre = false;
      } else { this.userData.showToast('Error al registrar en el servidor'); }
    },
      (err) => {
        console.log(err); this.userData.showToast("Error: " + err);
      }, () => { }
    );
  }

  async crearDepartamento() {
    console.log('crear departamento');
    if( ! this.aplicaTorres)
      this.torreSelected = null;
    const departamentoObj = {
      empresa: this.idEmpresa,
      torre: this.torreSelected?.id,
      data: this.dataRegistro
    };
    console.log('Objeto enviado..' + JSON.stringify(departamentoObj));
    await this.departamentoService.save(departamentoObj).subscribe((data) => {
      console.log(data);
      if (data.status === 200) {
        this.userData.showToast('registrado correctamente');
        this.getDataDepartamento();
        this.crearRegistroDepartamento = false;
      } else { this.userData.showToast('Error al registrar en el servidor'); }
    },
      (err) => {
        console.log(err); this.userData.showToast("Error: " + err);
      }, () => { }
    );
  }

  async getDataTorre() {
    console.log('getDataTorree');

    await this.torreService.getTorresFull(this.idEmpresa).subscribe((data) => {
      console.log(data);
      if (data.status === 200) {
        this.torres = data.result;
      } else {
        this.userData.showToast('error al recuperar registros');
      }
    },
      (err) => {
        this.userData.showToast('error al recuperar registros');
      }
    );
  }

  async getDataDepartamento() {
    console.log('getDataDepartamento');
    if (this.aplicaTorres) {
      if (this.torreSelected) {
        await this.departamentoService.getDepartamentosPorTorre(this.torreSelected.id).subscribe((data) => {
          console.log(data);
          if (data.status === 200) this.departamentos = data.result;
          else this.userData.showToast('error al recuperar registros');
        },
          (err) => { this.userData.showToast('error al recuperar registros'); }
        );
      } else {
        this.userData.showToast('Debe seleccionar una torre para listar los departamentos');
      }

    } else {
      await this.departamentoService.getDepartamentosPorEmpresa(this.idEmpresa).subscribe((data) => {
        console.log(data);
        if (data.status === 200) this.departamentos = data.result;
        else this.userData.showToast('error al recuperar registros');
      },
        (err) => { this.userData.showToast('error al recuperar registros'); }
      );
    }

  }

  guardarInfoEmpresa() {
    this.guardaDataEmpresa();
  }

  guardaDataEmpresa() {
    console.log('guardaDataEmpresa()');
    let obj = {
      aplicaTorres: this.aplicaTorres
    };
    const formData = new FormData();
    formData.append("id", JSON.stringify(this.idEmpresa));
    formData.append("data", JSON.stringify(obj));
    this.empresaService.update(formData).subscribe(
      (data) => {
        if (data.status === 200) {
          this.userData.showToast('se guardo correctamente, para ver los cambios es necesario volver a iniciar sesión');
        } else
          this.userData.showToast('error al actualzar registro ' + data.status);
      },
      (err) => {
        console.log("Error al actualizar agente" + err);
        this.userData.showToast('error al actualzar registro');
      }
    );

  }






}
