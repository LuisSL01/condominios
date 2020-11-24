import { Component, Input, OnInit } from '@angular/core';
import { AdeudoPago } from '../../../../models/adeudo-pago.model';
import { DataLocalAdeudoService } from '../../../../services/data-local-adeudo.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() adeudo:AdeudoPago;
  
  constructor(public dataLocalAdeudoService:DataLocalAdeudoService,
              private actionSheetCtrl:ActionSheetController) { }

  ngOnInit() {
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar adeudo',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar adeudo');
          this.dataLocalAdeudoService.borrarAdeudo(this.adeudo);
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
