import { Component, OnInit, Input } from '@angular/core';
import { ContactosEmergenciaService } from '../../../services/contactos-emergencia.service';
import { ContactosEmergencia } from '../../../models/contactos-emergencia.model';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() contacto:ContactosEmergencia;
  
  constructor(public dataLocalContactosEmergenciaService : ContactosEmergenciaService,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
  }

  	
  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar contacto',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar contacto');
          console.log(this.contacto);  
          /* this.dataLocalContactosEmergenciaService.borrarContactoEmergencia(this.contacto);           */
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
