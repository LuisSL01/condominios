import { Component, OnInit, Input } from '@angular/core';
import { DataLocalVotacionesService } from '../../../services/data-local-votaciones.service';
import { Encuesta } from '../../../models/votaciones.model';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() encuesta:Encuesta;

  constructor(public dataLocalVotacionesService: DataLocalVotacionesService,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar votación',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar votación');
          console.log(this.encuesta);  
          this.dataLocalVotacionesService.borrarVotacion(this.encuesta);
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

}
