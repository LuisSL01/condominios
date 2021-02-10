import { Component, Input, OnInit } from '@angular/core';
import { PagosComprobantes } from '../../../models/pagos-comprobantes.model';
import { PagosComprobantesService } from '../../../services/pagos-comprobantes.service';
import { ActionSheetController } from '@ionic/angular';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() pagoComprobante:PagosComprobantes;


  pathS3:string ="https://almacenamientonube.s3.us-west-1.amazonaws.com/";
  pathBase64:string ="data:image/jpeg;base64,";
  
  constructor(public pagosComprobantesService: PagosComprobantesService,
              private actionSheetCtrl:ActionSheetController,
              private userData: UserData) { }

  ngOnInit() {
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar comprobante',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar pago comprobante');
          console.log(this.pagoComprobante);  
          /* this.dataLocalPagosComprobantesService.borrarPagoComprobante(this.comprobante); */
        }
      };

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
      guardarBorrarBtn,
      {
        text: 'Autorizar',
        icon: 'checkmark-done-circle-outline',        
        cssClass: 'action-dark',
        handler: () => {
          console.log('aplicar pago clicked');
          this.updateStatus('AUTORIZADO');
        }
      },
      {
        text: 'Rechazar',
        icon: 'remove-circle-outline',
        cssClass: 'action-dark',
        handler: () => {
          console.log('rechazar pago clicked');
          this.updateStatus('RECHAZADA');
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

  updateStatus(nombreStatus:string){

    const formData = new FormData();
    formData.append("id", JSON.stringify(this.pagoComprobante.id));
    formData.append("status", nombreStatus);

    this.pagosComprobantesService.updateStatus(formData).subscribe(
      (data) => {
        if (data.status === 200) this.userData.showToast('Estatus actualizado correctamente');
        else this.userData.showToast('Error al actualizar estatus, llego otro status');
      },
      (err) => {
        console.log("Error al actualizar estatus, no se pudo conectar con el servidor" + err);
        this.userData.showToast('Error al actualizar estatus, ocurrio una excepcion al actualizar');
      }
    );

  }

}
