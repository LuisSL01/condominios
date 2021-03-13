import { Component, Input, OnInit } from '@angular/core';
import { AreaComunReserva } from '../../../models/area-comun.model';
import { ActionSheetController } from '@ionic/angular';
import { UserData } from '../../../providers/user-data';
import { AreaComunService } from '../../../services/area-comun.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {


  @Input() reserva: AreaComunReserva;

  constructor(private actionSheetCtrl: ActionSheetController,
    private userData: UserData,
    private areaComunService: AreaComunService) { }

  ngOnInit() {
  }

  onRowSelected(){
    
  }

  async lanzarMenu() {

    let borrarBtn;
    borrarBtn = {
      text: 'Borrar reservacion',
      icon: 'trash',
      cssClass: 'action-dark',
      handler: () => {
        if (this.reserva.id > 0) {
          console.log('eliminar reserva');
          this.areaComunService.deleteReserva(this.reserva.id).subscribe(
            (data) => {
              if (data.status === 200) this.userData.showToast('Reservacion eliminada correctamente');
              else this.userData.showToast("Error al eliminar registro");
            },
            (err) => {
              console.log(err); this.userData.showToast("Error al eliminar registro");
            }
          );
        }
      }
    };

    let updateStatusBtn;
    updateStatusBtn = {
      text: (this.reserva.autorizado ? 'No autorizar' : 'Autorizar'),
      icon: 'trash',
      cssClass: 'action-dark',
      handler: () => {
        const formData = new FormData();
        formData.append("id", JSON.stringify(this.reserva.id));
        formData.append("status", JSON.stringify(!this.reserva.autorizado));
        this.areaComunService.updateStatusReserva(formData).subscribe(
          (data) => {
            if (data.status === 200) this.userData.showToast('Estatus actualizado correctamente');
            else this.userData.showToast('Error al actualizar estatus');
          },
          (err) => {
            console.log("Error al actualizar agente" + err);
            this.userData.showToast('Error al actualizar estatus');
          }
        );
      }
    };

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        borrarBtn,
        updateStatusBtn,      
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
