import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:string="";
  pass:string="";


  constructor(public alertController: AlertController, 
              private router: Router,
              private dataLocalService:DataLocalService) { }

  ngOnInit() {
  }

  iniciarSesion(){

    console.log("iniciarSesion");

    console.log(this.user);
    console.log(this.pass);

    if(this.user.toLowerCase() === 'test1' && this.pass.toLowerCase() === 'test1'){
      console.log('debo redireccionar al menu');
      this.dataLocalService.idempresa = 1;//Aqui es cuando se podra setear el id del usuario que se este logueando
      this.router.navigate(['/inicio']);
      
      
    }else{
      console.log('debo lanzar la alerta');
      this.presentAlert();
    }

    
    
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
