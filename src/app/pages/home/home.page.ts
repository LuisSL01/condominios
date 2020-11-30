import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataLocalService } from '../../services/data-local.service';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserOptions } from '../../interfaces/user-option';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  login: UserOptions = { username: '', password: '' };
  
  /* user:string="";
  pass:string=""; */
  load: any;

  

  constructor(
              public userData: UserData,
              private authService:AuthService, 
              public loadingController: LoadingController,
              private toastr: ToastController,
              public alertController:AlertController,
              public storage: Storage,
              private router:Router,
              private dataLocalService:DataLocalService) { }

  ngOnInit() {
  }

  
  onLogin(){

    console.log("onLogin()");

    console.log('this.user:'+this.login.username);
    console.log('this.pass:'+this.login.password);

    const loginPayload = {
      username: this.login.username,
      password: this.login.password
    }
    console.log("loginPayload: "+loginPayload);
    

    this.showLoading();
/*     this.authService.login(loginPayload).subscribe(data => {
      if (data.status === 200) {
        window.localStorage.setItem('userDetails', JSON.stringify(data.result));
        this.storage.set('userDetails', JSON.stringify(data.result));

        if (data.result.roles.indexOf('ROLE_AUTO_REGISTRADO') > -1 || data.result.roles.indexOf('ROLE_VALIDACION_PENDIENTE') > -1) {
          this.router.navigate(['/']);
          this.showToast("El usuario " + data.result.nombreCompleto + ", no esta activo para la aplicación móvil");
        } else {
          this.userData.login(this.login.username);
          this.router.navigateByUrl('/inicio');
          
          this.showToast("Bienvenido " + data.result.nombreCompleto);
        }
      }
    }, err => {
      this.showToast("Error usuario o contraseña inválidos");
    }); */




    if(loginPayload.username.toLowerCase() === 'test1' 
                && loginPayload.password.toLowerCase() === 'test1'){    
      this.dataLocalService.idempresa = 1;//Aqui es cuando se podra setear el id del usuario que se este logueando
      this.dataLocalService.miIdAgente = 10;
      this.router.navigate(['/inicio']);            
      this.showToast("Bienvenido " + loginPayload.username.toLowerCase());
    }else if(loginPayload.username.toLowerCase() === 'test2' 
                && loginPayload.password.toLowerCase() === 'test2'){      
      this.dataLocalService.idempresa = 2;//Aqui es cuando se podra setear el id del usuario que se este logueando
      this.dataLocalService.miIdAgente = 20;
      this.router.navigate(['/inicio']);
      this.showToast("Bienvenido " + loginPayload.username.toLowerCase());
    }else{      
      this.presentAlert();
    }
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
