import { Component, OnInit, Input } from '@angular/core';
import { AnuncioService } from '../../../services/anuncio.service';

import { ActionSheetController, ToastController } from '@ionic/angular';
import { Publicacion } from '../../../models/publicacion.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() anuncio :Publicacion;


  pathS3:string ="https://almacenamientonube.s3.us-west-1.amazonaws.com/";
  pathBase64:string ="data:image/jpeg;base64,";
  

  constructor(public anuncioService: AnuncioService,
    private actionSheetCtrl: ActionSheetController,
    private toastr: ToastController,) { }

  ngOnInit() {
  }

  async lanzarMenu() {
    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar anuncio',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          /* console.log('Borrar anuncio');
          console.log(this.anuncio);   */
          if(this.anuncio.id > 0){            
            this.anuncioService.borrarAnuncio(this.anuncio.id).subscribe(
              (data) => {
                if (data.status === 200) {
                  console.log('"data.result"', data.result);
                  console.log("anuncio eliminado correctamente correctamente");
                  this.showToast("anuncio eliminado correctamente");                  
                } else {
                  console.log('Llego otro status al eliminar anuncio');  
                  this.showToast("Error al eliminar registro");                  
                }
              },
              (err) => {
                console.log(err);                
                this.showToast("Error al eliminar registro");                  
              },
              () => {}
            );
          }else{
            console.log('Debo borrar de data local');
            this.anuncioService.borrarAnuncioLocal(this.anuncio);            
          }          
        }
      };

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
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
    this.toastr
      .create({
        message: dataMessage,
        duration: 2000,
      })
      .then((toastData) => {
        toastData.present();
      });
  }

}
