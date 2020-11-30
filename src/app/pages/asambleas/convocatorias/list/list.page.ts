import { Component, OnInit, Input } from '@angular/core';

import { DataLocalConvocatoriaService } from '../../../../services/data-local-convocatoria.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Publicacion } from '../../../../models/publicacion.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() convocatoria: Publicacion;


  constructor(public dataLocalConvocatoriaService: DataLocalConvocatoriaService,
      private actionSheetCtrl: ActionSheetController,    
      private router: Router) {

  }

  ngOnInit() {
  }
  async lanzarMenu() {



    let guardarBorrarBtn;

    guardarBorrarBtn = {
      text: 'Borrar convocatoria',
      icon: 'trash',
      cssClass: 'action-dark',
      handler: () => {
        this.dataLocalConvocatoriaService.borrar(this.convocatoria);
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
