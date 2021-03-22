import { Component, OnInit, Input } from '@angular/core';
import { PagosComprobantesService } from '../../../services/pagos-comprobantes.service';
import { PagosComprobantes } from '../../../models/pagos-comprobantes.model';
import { ActionSheetController } from '@ionic/angular';
import { UserData } from '../../../providers/user-data';
import { Router } from '@angular/router';

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
              private actionSheetCtrl: ActionSheetController,
              private router: Router,
              private userData:UserData) { }

  ngOnInit() {
  }

  editRowSelected(){
    this.router.navigate(['/pagos-comprobantes/add', { item: JSON.stringify(this.pagoComprobante)}]);
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar pago comprobante',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar pago comprobante');
          console.log(this.pagoComprobante);
          if(this.pagoComprobante.id > 0 ){
            this.pagosComprobantesService.delete(this.pagoComprobante.id).subscribe((data) => {
                if (data.status === 200) { 
                  console.log("eliminado correctamente"); this.userData.showToast('registro eliminado correctamente');
                  this.router.navigate(['/pagos-comprobantes', { item: true, skipLocationChange: true}]);
                }
                else  this.userData.showToast('Error al eliminar registro');
              },
              (err) => {
                  this.userData.showToast("Error al eliminar registro");                  
              },
              () => {}
            );
          }else{
            //Se manda a eliminar de los registros que se tengan locales            
          }
          /* this.dataLocalPagosComprobantesService.borrarPagoComprobante(this.pagoComprobante); */
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
      },
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

  updateStatus(nombreStatus:string){
    const formData = new FormData();
    formData.append("id", JSON.stringify(this.pagoComprobante.id));
    formData.append("status", nombreStatus);
    this.pagosComprobantesService.updateStatus(formData).subscribe(
      (data) => {
        if (data.status === 200){
          this.userData.showToast('Estatus actualizado correctamente');
          this.router.navigate(['/pagos-comprobantes', { item: true, skipLocationChange: true}]);
        } 
        else this.userData.showToast('Error al actualizar estatus, llego otro status');
      },
      (err) => {
        console.log("Error al actualizar estatus, no se pudo conectar con el servidor" + err);
        this.userData.showToast('Error al actualizar estatus, ocurrio una excepcion al actualizar');
      }
    );

  }

}
