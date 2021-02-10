import { Component, OnInit, Input } from '@angular/core';
import { PagosComprobantesService } from '../../../services/pagos-comprobantes.service';
import { PagosComprobantes } from '../../../models/pagos-comprobantes.model';
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
              private actionSheetCtrl: ActionSheetController,
              private userData:UserData) { }

  ngOnInit() {
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
          }


          /* this.dataLocalPagosComprobantesService.borrarPagoComprobante(this.pagoComprobante); */
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
