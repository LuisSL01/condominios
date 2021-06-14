import { Component, OnInit, Input } from '@angular/core';
import { DataLocalService } from '../../../services/data-local.service';
import { AvisoService } from '../../../services/aviso.service';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { AddRespuestaPage } from '../add-respuesta/add-respuesta.page';
import { Router } from '@angular/router';
import { RespuestasPage } from '../respuestas/respuestas.page';
import { Publicacion } from '../../../models/publicacion.model';
import { UserData } from '../../../providers/user-data';

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

  numRespuestas:number=0;

  pathS3: string = "https://almacenamientonube.s3.us-west-1.amazonaws.com/";
  pathBase64: string = "data:image/jpeg;base64,";

  constructor(public avisoService: AvisoService,
    private actionSheetCtrl: ActionSheetController,
    public userData: UserData,
    private modalCtlr: ModalController,
    private toastCtrl: ToastController,
    private router: Router) { }


  ngOnInit() {
    this.numRespuestas = this.aviso.respuestas.respuestasPublicacion.length;
    console.log('en ng on init '+ this.numRespuestas);
    
  }


  editRowSelected() {
    this.router.navigate(['/avisos/add-avisos', { item: JSON.stringify(this.aviso) }]);
  }

  verRespuestas(){
    this.presentModalRespuestas();
  }

  responder(){
    this.presentModalCreateRespuesta();
  }


  async lanzarMenu() {

    let tamanioRespuestas = 0;
    tamanioRespuestas = this.aviso.respuestas.respuestasPublicacion.length;
    let guardarBorrarBtn;

    guardarBorrarBtn = {
      text: 'Borrar',
      icon: 'trash',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Borrar');
        console.log(this.aviso);

        if (this.aviso.id > 0) {
          this.avisoService.delete(this.aviso.id).subscribe(
            (data) => {
              if (data.status === 200) {                
                this.showToast("notificacion eliminada correctamente");
                this.avisoService.removeElement(this.aviso);
              } else {                
                this.showToast("Error al eliminar registro");
              }
            },
            (err) => {
              console.log(err);
              console.log('Llego otro status al eliminar anuncio');
              this.showToast("Error al eliminar registro");
            },
            () => { }
          );
        } else {
          console.log('Debo borrar de data local');
          this.avisoService.deleteLocal(this.aviso);
        }
      }
    };


    let bttns = [];
    if (this.userData.administrador) {
      bttns = [

        {
          text: 'Ver respuestas (' + tamanioRespuestas + ')',
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
        guardarBorrarBtn];
    } else {
      bttns = [

        {
          text: 'Ver respuestas (' + tamanioRespuestas + ')',
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
        }];
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: bttns
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
      componentProps: {
        titulo: this.aviso.data.titulo,
        avisoPadre: this.aviso
      },
      cssClass: 'my-custom-class'
    });
    await modal.present();

    modal.onDidDismiss().then((result) => {
      console.log('result'+ JSON.stringify(result));
      if (result.data) {        
        console.log('qui debo de hacer el refresh de l alista');        
        this.aviso.respuestas.respuestasPublicacion.push(result.data);
        this.numRespuestas ++;
      }
    });
  }

  async presentModalRespuestas() {
    const modal = await this.modalCtlr.create({
      component: RespuestasPage,
      componentProps: {
        titulo: this.aviso.data.titulo,
        respuestas: this.aviso.respuestas.respuestasPublicacion
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  borrarAviso(aviso: Publicacion) {
    this.avisoService.deleteLocal(aviso);
    this.router.navigate(['/avisos']);
  }


}
