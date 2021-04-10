import { Component, OnInit, Input } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ConvocatoriaService } from '../../../services/convocatoria.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Publicacion } from '../../../models/publicacion.model';
import { UserData } from '../../../providers/user-data';
import { Archivo } from '../../../models/archivo-vortex.model';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() convocatoria: Publicacion;


  constructor(public convocatoriaService: ConvocatoriaService,
    private actionSheetCtrl: ActionSheetController,
    private file: File,
    private fileopen: FileOpener,
    private router: Router,
    private transfer: FileTransfer,
    private userData: UserData) {

  }

  ngOnInit() {
  }

  editRowSelected() {
    this.router.navigate(['/convocatorias/add', { item: JSON.stringify(this.convocatoria) }]);
  }


  downloadPDF(pdf: Archivo) {
    /* console.log('downloadPDF', JSON.stringify(pdf)); */
    this.userData.showToast("Descargando pdf, por favor espere...");
    if (pdf.rutaS3 == null) {
      alert("El archivo no se cargo correctamente");
    } else {
      const fileTransfer: FileTransferObject = this.transfer.create();
      const url = 'https://almacenamientonube.s3.us-west-1.amazonaws.com/' + pdf.rutaS3;
      fileTransfer.download(url, this.file.dataDirectory + "convocatoria_" + pdf.nombre).then((entry) => {
        const entryUrl = entry.toURL();
        this.userData.showToast("se ha descargado correctamente");
        this.fileopen.open(entryUrl, 'application/pdf');
      }, (error) => {
        this.userData.showToast("error: " + error);
      });
    }
  }
  async lanzarMenu() {



    let guardarBorrarBtn;

    guardarBorrarBtn = {
      text: 'Borrar convocatoria',
      icon: 'trash',
      cssClass: 'action-dark',
      handler: () => {
        if (this.convocatoria.id > 0) {
          this.convocatoriaService.borrarConvocatoria(this.convocatoria.id).subscribe((data) => {
            if (data.status === 200) this.userData.showToast('registro eliminado correctamente');
            else this.userData.showToast("Error al eliminar registro");
          },
            (err) => {
              console.log(err);
              this.userData.showToast("Error al eliminar registro");
            }, () => { }
          );
        }
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
