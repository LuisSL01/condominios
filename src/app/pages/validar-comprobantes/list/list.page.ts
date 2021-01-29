import { Component, Input, OnInit } from '@angular/core';
import { PagosComprobantes } from '../../../models/pagos-comprobantes.model';
import { DataLocalPagosComprobantesService } from '../../../services/data-local-pagos-comprobantes.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() comprobante:PagosComprobantes;
  
  constructor(public dataLocalPagosComprobantesService: DataLocalPagosComprobantesService,
              private actionSheetCtrl:ActionSheetController) { }

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
          console.log(this.comprobante);  
          this.dataLocalPagosComprobantesService.borrarPagoComprobante(this.comprobante);
        }
      };

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
      guardarBorrarBtn,
      {
        text: 'Aplicar pago',
        icon: 'checkmark-done-circle-outline',        
        cssClass: 'action-dark',
        handler: () => {
          console.log('aplicar pago clicked');
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
