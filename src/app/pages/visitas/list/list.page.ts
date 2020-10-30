import { Component, OnInit, Input } from '@angular/core';
import { DataLocalVisitaService } from '../../../services/data-local-visita.service';
import { Visita } from '../../../models/visita.model';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() visita:Visita;

  constructor(public dataLocalVisitaService: DataLocalVisitaService,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar visita',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar visita');
          this.dataLocalVisitaService.borrarVisita(this.visita);
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
