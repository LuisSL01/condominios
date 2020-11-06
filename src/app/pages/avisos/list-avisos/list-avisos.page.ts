import { Component, OnInit, Input } from '@angular/core';
import { DataLocalService } from '../../../services/data-local.service';
import { DataLocalAvisoService } from '../../../services/data-local-aviso.service';
import { ActionSheetController } from '@ionic/angular';
import { Aviso } from 'src/app/models/aviso.model';

@Component({
  selector: 'app-list-avisos',
  templateUrl: './list-avisos.page.html',
  styleUrls: ['./list-avisos.page.scss'],
})
export class ListAvisosPage implements OnInit {



  @Input() aviso: Aviso;
  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };
  constructor(public dataLocalAvisoService:DataLocalAvisoService,
          private actionSheetCtrl: ActionSheetController) { }


  ngOnInit() {
  }


  async lanzarMenu() {

    let guardarBorrarBtn;

      guardarBorrarBtn = {
        text: 'Borrar aviso',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar aviso');
          console.log(this.aviso);          
          this.dataLocalAvisoService.borrarAviso(this.aviso);
          
        }
      };

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Ver respuestas',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Ver respuestas');
        
             
        }
      },
        {
          text: 'Responder',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Responder');
        
             
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

  borrarAviso(aviso: Aviso){
    this.dataLocalAvisoService.borrarAviso(aviso);
  }


}
