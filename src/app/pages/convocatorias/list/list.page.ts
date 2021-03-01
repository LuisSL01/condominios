import { Component, OnInit, Input } from '@angular/core';

import { ConvocatoriaService } from '../../../services/convocatoria.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Publicacion } from '../../../models/publicacion.model';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() convocatoria: Publicacion;


  constructor(public convocatoriaService: ConvocatoriaService,
      private actionSheetCtrl: ActionSheetController,    
      private router: Router,
      private userData: UserData) {

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
        if(this.convocatoria.id > 0){            
          this.convocatoriaService.borrarConvocatoria(this.convocatoria.id).subscribe((data) => {
              if (data.status === 200) this.userData.showToast('registro eliminado correctamente');                       
              else this.userData.showToast("Error al eliminar registro");                                
            },
            (err) => {
              console.log(err);                
              this.userData.showToast("Error al eliminar registro");
            },() => {}
          );
        }
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
