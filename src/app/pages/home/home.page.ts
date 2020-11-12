import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user:string="";
  pass:string="";

  constructor(public alertController:AlertController,
              private router:Router,
              private dataLocalService:DataLocalService) { }

  ngOnInit() {
  }

  
  iniciarSesion(){

    console.log("iniciarSesion");

    console.log('this.user:'+this.user);
    console.log('this.pass:'+this.pass);

    if(this.user.toLowerCase() === 'test1' 
                && this.pass.toLowerCase() === 'test1'){    
      this.dataLocalService.idempresa = 1;//Aqui es cuando se podra setear el id del usuario que se este logueando
      this.router.navigate(['/inicio']);            
    }else if(this.user.toLowerCase() === 'test2' 
                && this.pass.toLowerCase() === 'test2'){      
      this.dataLocalService.idempresa = 2;//Aqui es cuando se podra setear el id del usuario que se este logueando
      this.router.navigate(['/inicio']);            
    }else{      
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
