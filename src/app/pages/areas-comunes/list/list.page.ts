import { Component, OnInit, Input } from '@angular/core';
import { DataLocalAreaComunService } from '../../../services/data-local-area-comun.service';
import { AreaComun } from '../../../models/area-comun.model';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() areaComun:AreaComun;
  
  constructor(public dataLocalAreaComunService: DataLocalAreaComunService,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
  }
  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar área comun',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {                    
          this.dataLocalAreaComunService.borrarAreaComun(this.areaComun);
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
