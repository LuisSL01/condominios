import { Component, OnInit, Input } from '@angular/core';
import { DataLocalGastoService } from '../../../services/data-local-gasto.service';
import { Gasto } from '../../../models/gasto.model';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() gasto:Gasto;

  constructor(public dataLocalGastoService:DataLocalGastoService,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
  }

  	
  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar gasto',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar gasto');
          console.log(this.gasto);  
          this.dataLocalGastoService.borrarGasto(this.gasto);
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
  