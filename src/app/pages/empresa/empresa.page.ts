import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {


  @Input() empresas:any[];
  @Input() username:string;


  constructor(private modalCtrl: ModalController,
    private toastr: ToastController,    
    public storage: Storage,
    private router: Router,
    private userData:UserData) { }

  ngOnInit() {
  }

  cancelar(){
    console.log('cancelar');
    this.modalCtrl.dismiss();
  }  

  empresaSelected(empresa: any) {
    window.localStorage.setItem('empresaData', JSON.stringify({"nombre":empresa.nombre,"id":empresa.id}));
    this.storage.set('empresaData', JSON.stringify({"nombre":empresa.nombre,"id":empresa.id}));
    this.userData.setConfigEmpresa();
    this.router.navigate(['/inicio']);        
    this.showToast("Bienvenido a armonía residencial: " + this.username);

    this.modalCtrl.dismiss();
  }

  showToast(dataMessage: string) {
    this.toastr.create({
      message: dataMessage,
      duration: 2000
    }).then((toastData) => {
      toastData.present();
    });
  }

}
