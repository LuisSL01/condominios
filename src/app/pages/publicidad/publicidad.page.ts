import { Component, OnInit } from '@angular/core';
import { Publicidad } from 'src/app/models/publicidad.model';
import { PublicidadService } from 'src/app/services/publicidad.service';
import { UserData } from '../../providers/user-data';
import { AlertController, ModalController } from '@ionic/angular';
import { CreatePage } from './create/create.page';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.page.html',
  styleUrls: ['./publicidad.page.scss'],
})
export class PublicidadPage implements OnInit {

  publicidades:Publicidad[]=[];
  idEmpresa:number;
  publicidadObj:Publicidad;

  pathS3:string = "https://almacenamientonube.s3.us-west-1.amazonaws.com/";

  constructor(public publicidadService:PublicidadService,
              private modalCtrl: ModalController,
              private  alertController: AlertController,
              private userData:UserData) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
  }

  ionViewDidEnter() {        
    this.buscaRegistros();    
  }

  agregar(){
    console.log('agregar');
    this.presentModalPublicidad();
  }

  async presentModalPublicidad() {
    const modal = await this.modalCtrl.create({
      component: CreatePage,
      componentProps: {
      },
      cssClass: "modal-medium",
    });
    await modal.present();
    modal.onDidDismiss().then((result) => {
      console.log('result de modal'+ JSON.stringify(result));      
      if (result.data && result.data.event) {
        console.log(result.data.event);
        this.publicidades.push(...result.data.event);
        console.log(JSON.stringify(this.publicidades));        
      } 
    });
  }


  delete(elm){
    console.log('delete'+ elm);
    this.publicidadObj = elm;
    if(this.publicidadObj){
      this.presentAlertDeletePublicidad();
    }
  }

  async presentAlertDeletePublicidad() {
    const alert = await this.alertController.create({
      cssClass: 'alertHeader',
      header: 'Confirmar!',
      message: '¿Seguro que deseas quitar el registro?',    
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Quitar',
          handler: (alertData) => {                       
            
              this.publicidadService.delete(this.publicidadObj.id).subscribe(
                (data) => {
                  if (data.status === 200) {
                    this.userData.showToast("Eliminado correctamente", 'success');
                    if(this.publicidades){//se remueve de la lista
                      var index = this.publicidades.indexOf(this.publicidadObj);
                      if (index > -1)  this.publicidades.splice(index, 1);                                              
                    }
                    this.publicidadObj = null;
                  } else {
                    this.userData.showToast("Error al eliminar registro ", 'warning');                                   
                  }
                }, (err) => {
                  console.log(err);                                        
                  this.userData.showToast("Error en el servicio, no se puede eliminar registro ", 'danger');
                }, () => {}
              );
            
          }
        }
      ]
    });
    await alert.present();
  }

  
  async buscaRegistros(){
    this.publicidadService.getPublicidadAllPorEmpresa(this.idEmpresa).subscribe(
      data=>{        
        if(data.status === 200){
          this.publicidades = data.result;                    
        }else{
          this.userData.showToast('Error al recuperar registros de publicidad')
        }
      }, err => {                        
        this.userData.showToast('Error en el servicio al buscar registros')
      }
    );

  }

}
