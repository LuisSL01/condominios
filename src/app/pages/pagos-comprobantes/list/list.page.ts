import { Component, OnInit, Input } from '@angular/core';
import { PagosComprobantesService } from '../../../services/pagos-comprobantes.service';
import { PagosComprobantes } from '../../../models/pagos-comprobantes.model';
import { ActionSheetController, AlertController } from '@ionic/angular';
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
              public alertController: AlertController,
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
                  this.pagosComprobantesService.removeElement(this.pagoComprobante);                  
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

      



      console.log('this.userData.administrador', this.userData.administrador);

      
      if(this.userData.administrador){
        
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
              this.presentAlertPagoRechazado();
            }
          }
          ]
        });
        await actionSheet.present();

      }else{
     
        const actionSheet = await this.actionSheetCtrl.create({
          buttons: [
          guardarBorrarBtn          
          ]
        });
        await actionSheet.present();
      }

    
  }

  async presentAlertPagoRechazado() {
    const alert = await this.alertController.create({
      cssClass: 'alertHeader',
      header: 'Confirmar!',
      message: 'El comprobante de pago será rechazado',
      inputs: [
        {
          name: 'comentarios',
          type: 'text',
          placeholder: 'Comentarios'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Guardar',
          handler: (alertData) => {

            console.log('rechazar pago clicked');
              this.updateStatus('RECHAZADA', alertData.comentarios);
          }
        }
      ]
    });

    await alert.present();
  }

  updateStatus(nombreStatus:string, _comentarios?:string){
    let dataMap= new Object();
    

    const formData = new FormData();
    formData.append("id", JSON.stringify(this.pagoComprobante.id));
    formData.append("status", nombreStatus);

    //Hacer pruebas, el map no se puede enviar
    if(_comentarios){       
      const dataJson = {
        'comentarios': _comentarios
      };     

      console.log('JSON.stringify({comentarios:_comentarios})'+ JSON.stringify(dataJson));
      
      formData.append("dataMap", JSON.stringify(dataJson));
      
    }

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
