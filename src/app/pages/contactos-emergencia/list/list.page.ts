import { Component, OnInit, Input } from '@angular/core';
import { ContactosEmergenciaService } from '../../../services/contactos-emergencia.service';
import { ContactosEmergencia } from '../../../models/contactos-emergencia.model';
import { ActionSheetController } from '@ionic/angular';
import { UserData } from '../../../providers/user-data';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() contacto:ContactosEmergencia;
  
  constructor(public contactoService : ContactosEmergenciaService,
              private actionSheetCtrl: ActionSheetController,
              private userData:UserData,
              private callNumber: CallNumber) { }

  ngOnInit() {
  }

  callSelected(){
    
    console.log('call, '+ this.contacto.data.celular);
    
    this.callNumber.callNumber(this.contacto.data.celular, true).then(res =>
       console.log('Launched dialer!', res))
    .catch(err => 
      console.log('Error launching dialer', err));
  }

  	
  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar contacto',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar contacto');
          console.log(this.contacto);
          if(this.contacto.id > 0 ){
            this.contactoService.delete(this.contacto.id).subscribe((data) => {
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
          /* this.dataLocalContactosEmergenciaService.borrarContactoEmergencia(this.contacto);           */
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
