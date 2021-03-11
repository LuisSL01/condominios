import { Component, OnInit, Input } from '@angular/core';
import { Publicacion } from '../../models/publicacion.model';
import { RespuestaPublicacion } from '../../models/respuesta-publicacion.model';
import { AnuncioService } from '../../services/anuncio.service';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-anuncio-list',
  templateUrl: './anuncio-list.component.html',
  styleUrls: ['./anuncio-list.component.scss'],
})
export class AnuncioListComponent implements OnInit {

  @Input() anuncio: Publicacion;


  pathS3: string = "https://almacenamientonube.s3.us-west-1.amazonaws.com/";
  pathBase64: string = "data:image/jpeg;base64,";


  reporte:RespuestaPublicacion = new RespuestaPublicacion();

  constructor(public anuncioService: AnuncioService,
    private actionSheetCtrl: ActionSheetController,
    private toastr: ToastController,
    private userData: UserData) { }

  ngOnInit() {}

  
  async lanzarMenu() {
    let guardarBorrarBtn;
    guardarBorrarBtn = {
      text: 'Borrar anuncio',
      icon: 'trash',
      cssClass: 'action-dark',
      handler: () => {
        if (this.anuncio.id > 0) {
          this.anuncioService.borrarAnuncio(this.anuncio.id).subscribe((data) => {
            if (data.status === 200) {
              this.showToast("anuncio eliminado correctamente");
            } else {
              this.showToast("Error al eliminar registro");
            }
          },
            (err) => {
              console.log(err);
              this.showToast("Error al eliminar registro");
            },
            () => { }
          );
        } else {
          console.log('Debo borrar de data local');
          this.anuncioService.borrarAnuncioLocal(this.anuncio);
        }
      }
    };

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        guardarBorrarBtn,
        {
          text: 'Reportar',
          icon: 'alert-circle-outline',
          cssClass: 'action-dark',
          handler: () => {

            this.reporte.agenteCreador = this.userData.getIdAgente();
            this.reporte.nombreAgente = this.userData.getNombreCompleto();
            this.reporte.mensaje = "Se ha reportado el anuncio";

            this.anuncioService.reportarAnuncio(this.anuncio.id, this.reporte).subscribe(
              (data) => {
                console.log(data);        
                if (data.status === 200) this.userData.showToast('Se ha reportado correctamente');                  
                else console.log('Llego otro status al guardar reporte');                
              },
              (err) => {
                console.log(err);
                this.userData.showToast('No se pudo guardar la reporte, se guarda localmente');                
              },
              () => {}
            );
          }
        },    
        {
          text: this.anuncio.estatus?'Inactivar':'Activar',
          icon: (this.anuncio.estatus?'close-circle-outline':'checkmark-outline'),
          cssClass: 'action-dark',
          handler: () => {

            const formData = new FormData();
              formData.append("id_publicacion",   JSON.stringify(this.anuncio.id));
              formData.append("status", JSON.stringify(!this.anuncio.estatus));

        this.anuncioService.updateStatus(formData)
        .subscribe(
          (data) => {
            if (data.status === 200) {
              console.log('data: '+ data);                
              this.showToast('Anuncio '+(!this.anuncio.estatus?"Activado":"Inactivado")+' correctamente');
            } else {this.showToast('No se pudo actualizar el registro');
            }
          },
          (err) => {
            this.showToast('ERROR!, No se pudo actualizar el registro');
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
        }]
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
