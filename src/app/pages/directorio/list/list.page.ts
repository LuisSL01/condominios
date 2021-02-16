import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AvisoService } from 'src/app/services/aviso.service';
import { Directorio } from '../../../models/directorio.model';
import { DirectorioService } from '../../../services/directorio.service';
import { UserData } from '../../../providers/user-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() directorio:Directorio;

  

  constructor(public directorioService:DirectorioService,
              private actionSheetCtrl: ActionSheetController,
              private userData:UserData,
              private router: Router) { 
    }

  ngOnInit() {
  }

  async lanzarMenu() {

    let btnEliminar;
      btnEliminar = {
        text: 'Borrar directorio',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          if(this.directorio.id > 0 ){
            this.directorioService.delete(this.directorio.id).subscribe((data) => {
                if (data.status === 200) { console.log("eliminado correctamente"); this.userData.showToast('registro eliminado correctamente');}
                else  this.userData.showToast('Error al eliminar registro');
              },
              (err) => {
                  this.userData.showToast("Error al eliminar registro");                  
              },
              () => {}
            );
          } 
        }
      };

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'editar directorio',
          icon: 'trash',
          cssClass: 'action-dark',
          handler: () => {
            console.log('estoy en editar');
            
          }
        },
      btnEliminar,
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

  onRowSelected(){    
    console.log('onRowSelected');
    console.log(this.directorio);    
    this.router.navigate(['/directorio/add', { item: JSON.stringify(this.directorio)}]);  
  }

}
