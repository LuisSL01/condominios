import { Component, OnInit } from '@angular/core';
import { AgenteService } from '../../services/agente.service';
import { UserData } from '../../providers/user-data';
import { ToastController } from '@ionic/angular';
import { CorreoService } from '../../services/correo.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: string;

  constructor(private agenteService: AgenteService,
    private correoService: CorreoService,
    private router:Router,
    private toastCtrl: ToastController) { }

  ngOnInit() {
  }


  
  async buscarAgentePorEmail() {
    if (this.email) {
      await this.agenteService.getUserByEmail(this.email).subscribe(data => {
        if (data.status === 200) {
          if (data.result) {
            /* let link = environment.coreServiceBaseUrl + "/reset-password;item=%7B%22i%22:%22"+btoa(data.result.id)+"%22,%22c%22:%22"+btoa(data.result.email)+"%22%7D";             */
            
            //ip del proyecto de angular
            let link ="http://54.177.89.203/reset-password;item=%7B%22i%22:%22"+btoa(data.result.id)+"%22,%22c%22:%22"+btoa(data.result.email)+"%22%7D";

            let men = "Por favor acceda a la siguiente liga para reestablecer su contraseña <a href='" + link + "'>Clic aquí!</a>";
            let objCorreo = {
              de: "notificaciones@erpvortex.com",
              para: [this.email],
              asunto: "Reestablecer contraseña",
              mensaje: men,
              cc: ["luis.silva@erpvortex.com"],
              bcc: []
            }            
            const formularioData = new FormData();
            formularioData.append('data', JSON.stringify(objCorreo));

            this.correoService.enviarCorreo(formularioData).subscribe(data => {
              if (data.status === 200) {                
                this.showToast("Se ha enviado un correo para reestablecer la contraseña", "success", 5000);
              } else {
                this.showToast("Ocurrio un error al enviar correo", "warning");
              }
            }, err => {
              this.showToast("El servicio no se encuentra disponible, verifique tenga conexion a internet", "danger");
            },
              () => {
              });


          } else {
            this.showToast("No se encontro alguna cuenta con el correo proporcionado", "danger");
          }
        } else {
          this.showToast("Ocurrio un error al recuperar los datos", "warning");
        }
      }, err => {
        this.showToast("El servicio no se encuentra disponible, verifique tenga conexion a internet", "danger");
      });

    } else {
      this.showToast("Se necesita un correo", "warning");
    }

  }

  showToast(dataMessage: string, color_str?: string, _duration?: number) {
    this.toastCtrl.create({
      message: dataMessage,
      duration: _duration ? _duration : 2000,
      color: color_str ? color_str : null
    }).then((toastData) => {
      toastData.present();
    });
  }
}
