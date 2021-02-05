import { Component, Input, OnInit } from '@angular/core';
import { AdeudoPago } from '../../../models/adeudo-pago.model';
import { AdeudoService } from '../../../services/adeudo.service';
import { ActionSheetController } from '@ionic/angular';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() adeudo:AdeudoPago;
  
  constructor(public adeudoService:AdeudoService,
              private actionSheetCtrl:ActionSheetController,
              private userData:UserData) { }

  ngOnInit() {
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar adeudo',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar adeudo');
          if(this.adeudo.id > 0 ){
            this.adeudoService.delete(this.adeudo.id).subscribe((data) => {
                if (data.status === 200) { console.log("eliminado correctamente"); this.userData.showToast('registro eliminado correctamente');}
                else  this.userData.showToast('Error al eliminar registro');
              },
              (err) => {
                  this.userData.showToast("Error al eliminar registro");                  
              },
              () => {}
            );
          }else{
            //Se manda a eliminar de los registros que se tengan locales
            this.adeudoService.borrarAdeudo(this.adeudo);
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
