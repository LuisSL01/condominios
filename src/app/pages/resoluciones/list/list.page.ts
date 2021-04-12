import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

import { ResolucionService } from '../../../services/resolucion.service';
import { Publicacion } from '../../../models/publicacion.model';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() resolucion: Publicacion;
  
  constructor(private resolucionService: ResolucionService,
              private actionSheetCtrl: ActionSheetController,    
              public userData:UserData,
              private router: Router) { }

  ngOnInit() {
  }


  editRowSelected() {
    this.router.navigate(['/resoluciones/add', { item: JSON.stringify(this.resolucion) }]);
  }

  async lanzarMenu() {
    let bntBorrar;    
    bntBorrar = {
      text: 'Borrar resolución',
      icon: 'trash',
      cssClass: 'action-dark',
      handler: () => {
        
        if(this.resolucion.id > 0){            
          this.resolucionService.borrarResolucion(this.resolucion.id).subscribe((data) => {
              if (data.status === 200) this.userData.showToast("resolución eliminada correctamente");
              else this.userData.showToast("Error al eliminar registro");
            },
            (err) => {
              console.log(err);                
              this.userData.showToast("Error al eliminar registro");
            },() => {}
          );
        }

      }
    };

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        bntBorrar
      ]
    });

    await actionSheet.present();
  }


}
