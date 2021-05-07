import { Component, OnInit } from '@angular/core';
import { Publicidad } from 'src/app/models/publicidad.model';
import { PublicidadService } from 'src/app/services/publicidad.service';
import { UserData } from '../../providers/user-data';
import { ModalController } from '@ionic/angular';
import { CreatePage } from './create/create.page';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.page.html',
  styleUrls: ['./publicidad.page.scss'],
})
export class PublicidadPage implements OnInit {

  publicidades:Publicidad[]=[];
  idEmpresa:number;

  constructor(public publicidadService:PublicidadService,
              private modalCtrl: ModalController,
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
  }

  
  async buscaRegistros(){
    this.publicidadService.getPublicidadAllPorEmpresa(this.idEmpresa).subscribe(
      data=>{
        console.log(JSON.stringify(data));        
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
