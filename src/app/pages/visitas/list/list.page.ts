import { Component, OnInit, Input } from '@angular/core';
import { VisitaService } from '../../../services/visita.service';
import { Visita } from '../../../models/visita.model';
import { ActionSheetController } from '@ionic/angular';
import { UserData } from '../../../providers/user-data';
/* import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx'; */

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() visita:Visita;

  encodeDataVisita: any;
  /* barcodeScannerOptions: BarcodeScannerOptions; */

  constructor(public visitaService: VisitaService,
    private actionSheetCtrl: ActionSheetController,
    private userData:UserData,
    /* private barcodeScanner: BarcodeScanner */
    ) { }

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
        text: 'Generar qr',
        icon: 'qr-code-outline',        
        cssClass: 'action-dark',
        handler: () => {

    /*       this.barcodeScannerOptions = {
            showTorchButton: true,
            showFlipCameraButton: true
          }; */

          this.encodeDataVisita = this.visita.id+"|"+this.visita.uuid;
          this.encodeDataVisita = btoa(this.encodeDataVisita);
          

          console.log('Compartir qr');

          console.log('Compartir qr2222');




       /*    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeDataVisita).then(encodedData => {
            console.log('dentro de data');
            
              console.log('encodedData',encodedData);
              this.encodeDataVisita = encodedData;
            },(err) => {
              console.log("Error occured : " + err);
            }
          ); */


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
