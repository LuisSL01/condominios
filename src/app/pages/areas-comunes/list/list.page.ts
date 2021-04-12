import { Component, OnInit, Input } from '@angular/core';
import { AreaComunService } from '../../../services/area-comun.service';
import { AreaComun } from '../../../models/area-comun.model';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { UserData } from '../../../providers/user-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() areaComun:AreaComun;

  
  pathS3:string ="https://almacenamientonube.s3.us-west-1.amazonaws.com/";
  pathBase64:string ="data:image/jpeg;base64,";
  
  constructor(
              public areaComunService: AreaComunService,
              private actionSheetCtrl: ActionSheetController,
              private router: Router,
              public userData:UserData) { }

  ngOnInit() {
  }

  onRowSelected(){

    console.log('onRowSelected');
    console.log(this.areaComun);    
    this.router.navigate(['/areas-comunes/add', { item: JSON.stringify(this.areaComun)}]);  

  }

  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar área comun',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          if(this.areaComun.id > 0){
            this.areaComunService.delete(this.areaComun.id).subscribe(
              (data) => {
                if (data.status === 200) {
                  this.userData.showToast('Área eliminada correctamente');
                } else {   
                  this.userData.showToast("Error al eliminar registro");
                }
              },
              (err) => {
                console.log(err);                
                this.userData.showToast("Error al eliminar registro");                
              },
              () => {}
            );
          }else{
            this.areaComunService.deleteLocal(this.areaComun);
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
