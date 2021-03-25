import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { EventoAppService } from '../../services/evento-app.service';

@Component({
  selector: 'app-boton-panico',
  templateUrl: './boton-panico.page.html',
  styleUrls: ['./boton-panico.page.scss'],
})
export class BotonPanicoPage implements OnInit {

  destinatarioAux:string ="";
  mensaje:string ="";

  idEmpresa:number;
  idAgente:number;
  dataRegistro = {};

  constructor(public alertController: AlertController,
              private eventoAppService:EventoAppService,
              private userData:UserData) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
  }


  enviarTodos(){
    console.log('mostrarOpciones');
    this.destinatarioAux ="RESIDENTE";
    this.mensaje="Se enviara una notificación a <strong>todos</strong>!!!";
    this.presentAlertConfirm();
  }

  enviarAdmin(){

    console.log('mostrarOpciones');
    this.destinatarioAux ="ADMINISTRADOR";
    this.mensaje="Se enviara una notificación a los <strong>Administradores</strong>!!!";
    this.presentAlertConfirm();
    

  }





  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'alertHeader',
      header: 'Confirmar!',
      message: this.mensaje,
      inputs: [
        {
          name: 'mensaje',
          type: 'text',
          placeholder: 'Mensaje'
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
          text: 'Enviar',
          handler: (alertData) => {
            console.log('Confirm Okay');
            this.dataRegistro ={
              destinatario:this.destinatarioAux,
              mensaje:alertData.mensaje
            }
            this.crearRegistro();
          }
        }
      ]
    });

    await alert.present();
  }

  crearRegistro(){    
      const eventoObj = {
        empresa : this.idEmpresa,
        agenteCreador : this.idAgente,
        tipo:"BOTON PANICO",
        data: this.dataRegistro       
      };
      console.log('Objeto enviado..'+ JSON.stringify(eventoObj));
      this.eventoAppService.save(eventoObj).subscribe((data) => {
          console.log(data);
          if (data.status === 200) {
            this.userData.showToast('registrado correctamente');
          } else {this.userData.showToast('Error al registrar en el servidor');}
        },
        (err) => {console.log(err);this.userData.showToast("Error: "+ err);
        },() => {}
      );
    }
  

}
