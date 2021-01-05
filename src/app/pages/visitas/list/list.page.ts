import { Component, OnInit, Input } from '@angular/core';
import { VisitaService } from '../../../services/visita.service';
import { Visita } from '../../../models/visita.model';
import { ActionSheetController } from '@ionic/angular';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() visita:Visita;

  constructor(public visitaService: VisitaService,
    private actionSheetCtrl: ActionSheetController,
    private userData:UserData) { }

  ngOnInit() {
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar visita',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar visita');
          if(this.visita.id > 0 ){
            this.visitaService.delete(this.visita.id).subscribe((data) => {
                if (data.status === 200) { console.log("eliminado correctamente"); this.userData.showToast('visita eliminada correctamente');}
                else  this.userData.showToast('Error al eliminar registro');                
              },
              (err) => {
                  this.userData.showToast("Error al eliminar registro");                  
              },
              () => {}
            );
          }else{
            this.visitaService.borrarVisita(this.visita);
          }
        }
      };

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
      guardarBorrarBtn,
      {
        text: 'Compartir qr',
        icon: 'share',        
        cssClass: 'action-dark',
        handler: () => {
          console.log('Compartir qr');
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
    });
    await actionSheet.present();
  }
}
