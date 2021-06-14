import { Component, Input, OnInit } from '@angular/core';
import { BitacoraVisita } from '../../../models/bitacora-visitas.model';
import { BitacoraVisitaService } from '../../../services/bitacora-visita.service';
import { ActionSheetController } from '@ionic/angular';
import { UserData } from '../../../providers/user-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() bitacora:BitacoraVisita;
  
  pathS3:string ="https://almacenamientonube.s3.us-west-1.amazonaws.com/";
  pathBase64:string ="data:image/jpeg;base64,";

  constructor(public bitacoraVisitaService : BitacoraVisitaService,
              public actionSheetCtrl : ActionSheetController,
              private router: Router,
              public userData:UserData) {                
               }

  ngOnInit() {
  }

  onRowSelected(){
    this.router.navigate(['/bitacora-visitas/add', { item: JSON.stringify(this.bitacora)}]);
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar registro',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar bitacora visita');
          
          if(this.bitacora.id){
            this.bitacoraVisitaService.delete(this.bitacora.id).subscribe((data) => {
              if (data.status === 200) {                 
                 this.userData.showToast('registro eliminado correctamente');
                 this.bitacoraVisitaService.removeElement(this.bitacora);
                }
              else  this.userData.showToast('Error al eliminar registro');                
            },(err) => {
                this.userData.showToast("Error al eliminar registro");                  
            }
          );
          }else{
            this.bitacoraVisitaService.borrar(this.bitacora);
          }
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
