import { Component, OnInit, Input } from '@angular/core';
import { DataLocalService } from '../../../services/data-local.service';
import { AvisoService } from '../../../services/aviso.service';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { AddRespuestaPage } from '../add-respuesta/add-respuesta.page';
import { Router } from '@angular/router';
import { RespuestasPage } from '../respuestas/respuestas.page';
import { Publicacion } from '../../../models/publicacion.model';

@Component({
  selector: 'app-list-avisos',
  templateUrl: './list-avisos.page.html',
  styleUrls: ['./list-avisos.page.scss'],
})
export class ListAvisosPage implements OnInit {



  @Input() aviso: Publicacion;
  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };



  constructor(public avisoService:AvisoService,
          private actionSheetCtrl: ActionSheetController,
          private modalCtlr: ModalController,
          private toastCtrl: ToastController,
          private router: Router) { }


  ngOnInit() {
  }


  async lanzarMenu() {

    let tamanioRespuestas =0;
    
      tamanioRespuestas = this.aviso.respuestas.length;
    
    
    let guardarBorrarBtn;

      guardarBorrarBtn = {
        text: 'Borrar',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar');
          console.log(this.aviso);          

          if(this.aviso.id > 0){            
            this.avisoService.delete(this.aviso.id).subscribe(
              (data) => {
                if (data.status === 200) {
                  console.log('"data.result"', data.result);
                  console.log("notificacion eliminada correctamente");
                  this.showToast("notificacion eliminada correctamente");                  
                } else {
                  console.log('Llego otro status al eliminar anuncio');                  
                }
              },
              (err) => {
                console.log(err);
                console.log('Llego otro status al eliminar anuncio');
              },
              () => {}
            );
          }else{
            console.log('Debo borrar de data local');
            this.avisoService.deleteLocal(this.aviso);
          }
        }
      };

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        
        {
          text: 'Ver respuestas ('+tamanioRespuestas+')',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Ver respuestas');     
            this.presentModalRespuestas();
        }
      },
        {
          text: 'Responder',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Responder');
            this.presentModalCreateRespuesta();
        }
      },
      guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();

  }
  showToast(dataMessage: string) {
    this.toastCtrl
      .create({
        message: dataMessage,
        duration: 2000,
      })
      .then((toastData) => {
        toastData.present();
      });
  }

  async presentModalCreateRespuesta() {
    const modal = await this.modalCtlr.create({
      component: AddRespuestaPage,
    componentProps:{
      titulo: this.aviso.titulo,
      avisoPadre: this.aviso
    },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentModalRespuestas(){
    const modal = await this.modalCtlr.create({
      component: RespuestasPage,
    componentProps:{
      titulo: this.aviso.titulo,
      respuestas: this.aviso.respuestas
    },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  borrarAviso(aviso: Publicacion){
    this.avisoService.deleteLocal(aviso);
    this.router.navigate(['/avisos']);
  }


}
