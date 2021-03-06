import { Component, OnInit, Input } from '@angular/core';
import { GastoService } from '../../../services/gasto.service';
import { Gasto } from '../../../models/gasto.model';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() gasto: Gasto;

  pathS3:string ="https://almacenamientonube.s3.us-west-1.amazonaws.com/";
  pathBase64:string ="data:image/jpeg;base64,";

  constructor(public gastoService: GastoService,
    private actionSheetCtrl: ActionSheetController,
    private toastr: ToastController,
    private router: Router) { }

  ngOnInit() { }

  editRowSelected(){
    this.router.navigate(['/gastos/add', { item: JSON.stringify(this.gasto)}]);
  }

  	
  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          if(this.gasto.id > 0){            
            this.gastoService.delete(this.gasto.id).subscribe(
              (data) => {
                if (data.status === 200) {                  
                  this.showToast("Gasto eliminado correctamente");
                  this.gastoService.removeElement(this.gasto);
                } else {
                  console.log('Llego otro status al eliminar gasto');  
                  this.showToast("Error al eliminar registro de Gasto");                  
                }
              }, (err) => {
                console.log(err);                
                this.showToast("Error al eliminar registro");                  
              }, () => {}
            );
          } else{
            console.log('Borrar gasto Localmente');
            console.log(this.gasto);  
            this.gastoService.deleteLocal(this.gasto);           
          }
        }
      };

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
      guardarBorrarBtn]
    });
    await actionSheet.present();
  }

  showToast(dataMessage: string) {
    this.toastr
      .create({
        message: dataMessage,
        duration: 2000,
      })
      .then((toastData) => {
        toastData.present();
      });
  }

}
  