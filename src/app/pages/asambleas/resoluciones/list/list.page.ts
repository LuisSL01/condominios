import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

import { DataLocalResolucionService } from '../../../../services/data-local-resolucion.service';
import { Publicacion } from '../../../../models/publicacion.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() resolucion: Publicacion;
  
  constructor(private dataLocalResolucionService: DataLocalResolucionService,
      private actionSheetCtrl: ActionSheetController,    
    private router: Router) { }

  ngOnInit() {
  }

  async lanzarMenu() {



    let guardarBorrarBtn;

    guardarBorrarBtn = {
      text: 'Borrar resolución',
      icon: 'trash',
      cssClass: 'action-dark',
      handler: () => {
        this.dataLocalResolucionService.borrar(this.resolucion);
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
