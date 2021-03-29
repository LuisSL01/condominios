import { Component, OnInit, Input } from '@angular/core';
import { VisitaService } from '../../../services/visita.service';
import { Visita } from '../../../models/visita.model';
import { ActionSheetController } from '@ionic/angular';
import { UserData } from '../../../providers/user-data';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
    private router: Router,
    
    private barcodeScanner: BarcodeScanner
    ) { }

  ngOnInit() {
  }

  onRowSelected(){
    console.log(this.visita);
    this.router.navigate(['/visitas/add', { item: JSON.stringify(this.visita)}]);  
    
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
                if (data.status === 200) {                   
                  this.userData.showToast('visita eliminada correctamente');
                  this.router.navigate(['/visitas', { item: true, skipLocationChange: true}]);
                }                
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
      let bttns =[];
    if(this.userData.administrador){
      bttns = [
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
            this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeDataVisita).then(encodedData => {
              console.log('dentro de data');
              
                console.log('encodedData',encodedData);
                this.encodeDataVisita = encodedData;
              },(err) => {
                console.log("Error occured : " + err);
              }
            );
  
  
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
      ];
    }else{
      bttns = [        
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

            this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeDataVisita).then(encodedData => {
              console.log('dentro de data');
              
                console.log('encodedData',encodedData);
                this.encodeDataVisita = encodedData;
              },(err) => {
                console.log("Error occured : " + err);
              }
            );
  
  
          }
        }
      ];
    }
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: bttns
    });
    await actionSheet.present();
  }
}
