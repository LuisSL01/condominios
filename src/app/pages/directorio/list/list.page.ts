import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { DataLocalAvisoService } from 'src/app/services/data-local-aviso.service';
import { Directorio } from '../../../models/directorio.model';
import { DataLocalDirectorioService } from '../../../services/data-local-directorio.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() directorio:Directorio;

  

  constructor(public dataLocalDirectorioService:DataLocalDirectorioService,
    private actionSheetCtrl: ActionSheetController) { 
      console.log('en el constructor de list directorio page');
      
    }

  ngOnInit() {
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar directorio',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar directorio');
          console.log(this.directorio);  
          this.dataLocalDirectorioService.borrarDirectorio(this.directorio);
          
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
