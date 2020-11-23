import { Component, Input, OnInit } from '@angular/core';
import { BitacoraVisita } from '../../../models/bitacora-visitas.model';
import { DataLocalBitacoraVisitaService } from '../../../services/data-local-bitacora-visita.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() bitacora:BitacoraVisita;

  constructor(public dataLocalBitacoraVisitaService : DataLocalBitacoraVisitaService,
              public actionSheetCtrl : ActionSheetController) {
                console.log('en el constructor de list page registro de visitas 2');
                
               }

  ngOnInit() {
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar registro',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar bitacora visita');
          this.dataLocalBitacoraVisitaService.borrar(this.bitacora);
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
