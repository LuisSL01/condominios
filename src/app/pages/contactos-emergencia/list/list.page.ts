import { Component, OnInit, Input } from '@angular/core';
import { ContactosEmergenciaService } from '../../../services/contactos-emergencia.service';
import { ContactosEmergencia } from '../../../models/contactos-emergencia.model';
import { ActionSheetController } from '@ionic/angular';
import { UserData } from '../../../providers/user-data';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() contacto:ContactosEmergencia;
  
  constructor(public contactoService : ContactosEmergenciaService,
              private actionSheetCtrl: ActionSheetController,
              public userData:UserData,
              private router: Router,
              private callNumber: CallNumber) { }

  ngOnInit() {
  }

  editRowSelected(){
    console.log('editRowSelected');
    console.log(this.contacto);    
    this.router.navigate(['/contactos-emergencia/add', { item: JSON.stringify(this.contacto)}]);  
  }

  callSelected(number:string){    
    console.log('call, '+ number);    
    this.callNumber.callNumber(number, true).then(res =>
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
      guardarBorrarBtn
    ]
    });
    await actionSheet.present();
  }

}
