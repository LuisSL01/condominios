import { Component, OnInit, Input } from '@angular/core';
import { DataLocalAnuncioService } from '../../../services/data-local-anuncio.service';
import { Anuncio } from '../../../models/anuncio.model';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() anuncio :Anuncio;
  

  constructor(public dataLocalAnuncioService: DataLocalAnuncioService,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar anuncio',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar anuncio');
          console.log(this.anuncio);  
          this.dataLocalAnuncioService.borrarAnuncio(this.anuncio);
          
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
