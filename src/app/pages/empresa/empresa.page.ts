import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {


  @Input() empresas:any[];


  constructor(private modalCtrl: ModalController,
    private toastr: ToastController,    
    public storage: Storage,
    private router: Router) { }

  ngOnInit() {
  }

  cancelar(){
    console.log('cancelar');
    this.modalCtrl.dismiss();
  }  

  empresaSelected(empresa: any) {
    console.log('empresa selected..', empresa);
    console.log('navehando a la new empresa');    
    
    this.router.navigate(['/inicio']);    
    this.showToast('Bienvenido a la residencia: '+ empresa.nombre)

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
