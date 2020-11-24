import { Component, OnInit, Input } from '@angular/core';
import { DataLocalPagosComprobantesService } from '../../../../services/data-local-pagos-comprobantes.service';
import { PagosComprobantes } from '../../../../models/pagos-comprobantes.model';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() pagoComprobante:PagosComprobantes;

  constructor(public dataLocalPagosComprobantesService: DataLocalPagosComprobantesService,
    private actionSheetCtrl: ActionSheetController) { }

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
          this.dataLocalPagosComprobantesService.borrarPagoComprobante(this.pagoComprobante);
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
