import { Component, OnInit, Input } from '@angular/core';
import { DataLocalVotacionesService } from '../../../../services/data-local-votaciones.service';
import { Encuesta } from '../../../../models/votaciones.model';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ResponderEncuestaPage } from '../responder-encuesta/responder-encuesta.page';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() encuesta:Encuesta;

  constructor(public dataLocalVotacionesService: DataLocalVotacionesService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl:ModalController,
    private router:Router) { }

  ngOnInit() {
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar encuesta',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar encuesta');
          console.log(this.encuesta);  
          this.dataLocalVotacionesService.borrarVotacion(this.encuesta);
        }
      };

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
      {
        text: 'Responder',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Responder');
          this.presentModalRespoderEncuesta();
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

  
  async presentModalRespoderEncuesta(){
    const modal = await this.modalCtrl.create({
      component: ResponderEncuestaPage,
    componentProps:{
      titulo: this.encuesta.titulo,
      mensaje: this.encuesta.mensaje,
      preguntas: this.encuesta.preguntas
    },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
