import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Archivo } from '../../models/archivo-vortex.model';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { UserData } from '../../providers/user-data';
import { AdeudoService } from 'src/app/services/adeudo.service';
import { FileDownloaderService } from 'src/app/services/file-downloader.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-adeudo-plantilla',
  templateUrl: './adeudo-plantilla.page.html',
  styleUrls: ['./adeudo-plantilla.page.scss'],
})
export class AdeudoPlantillaPage implements OnInit {

  plantilla:Archivo=null;
  idEmpresa:number=0;
  idAgente:number=0;
  nombreArchivo:string;

  constructor(private platform: Platform,
              private filePicker: IOSFilePicker,
              private base64: Base64,
              private file: File,
              private transfer: FileTransfer,
              private fileChooser: FileChooser,
              private filePath: FilePath,
              private fileopen: FileOpener,
              private modalCtrl: ModalController,
              private adeudoService:AdeudoService,
              private fileDownloaderService: FileDownloaderService,
              private ui:UiServiceService,
              private userData:UserData) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
  }


  downloadPlantilla(){
    console.log('downloadPlantilla');

    /* let MIMETypes={ 
      //extensiones para diferentes archivos
      //https://stackoverflow.com/questions/48583578/how-to-open-doc-ppt-xlsx-pdf-jpg-png-file-using-ionic-native-file-opener
      'txt' :'text/plain',
      'docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc' : 'application/msword',
      'pdf' : 'application/pdf',
      'jpg' : 'image/jpeg',
      'bmp' : 'image/bmp',
      'png' : 'image/png',
      'xls' : 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'rtf' : 'application/rtf',
      'ppt' : 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    } */

    const fileTransfer: FileTransferObject = this.transfer.create();
    //const url = 'https://almacenamientonube.s3.us-west-1.amazonaws.com/Config/reglamento_empresaId_7.pdf';
    const url = 'https://almacenamientonube.s3.us-west-1.amazonaws.com/App/plantillas/PLANTILLA_CARGAR_ADEUDOS.xlsx';
    fileTransfer.download(url, this.file.dataDirectory + 'plantilla_cargar_adeudos.xlsx').then((entry) => {
      const entryUrl = entry.toURL();
      console.log('download complete: ' + entryUrl);
      this.fileopen.open(entryUrl, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }, (error) => {
      console.log('error: ' + error);
      this.userData.showToast('Error al descargar plantilla, no se encontro en el servidor','danger');
    });

    
  }


  seleccionarPlantilla(){    
    if (this.platform.is('ios')) {
      this.filePicker.pickFile()
        .then((uri) => {
          this.filePath.resolveNativePath(uri)
          .then(filePath => {
            this.nombreArchivo = filePath.substring(filePath.lastIndexOf('/') + 1);
            this.base64.encodeFile(filePath).then((base64File: string) => {
              base64File = base64File.substring(base64File.lastIndexOf(',') + 1, base64File.length);
              this.plantilla = new Archivo(base64File, "plantillaAdeudo_" + this.idEmpresa + ".xlsx")
              this.userData.showToast('seleccionado correctamente...','success');
            }, (err) => {
              alert("Error E: " + err);
            });
          })
          .catch(err => alert(err));
        })
        .catch(err => alert('Error F' + err));
    } else {
      console.log('is in android');
      this.fileChooser.open()
        .then((uri) =>{
          this.filePath.resolveNativePath(uri)
          .then(filePath => {
            console.log('FILEPATH',JSON.stringify(filePath));
            this.nombreArchivo = filePath.substring(filePath.lastIndexOf('/') + 1);
            this.base64.encodeFile(filePath).then((base64File: string) => {
              base64File = base64File.substring(base64File.lastIndexOf(',') + 1, base64File.length)              
              this.plantilla = new Archivo(base64File, "plantillaAdeudo_" + this.idEmpresa + ".xlsx")
              this.userData.showToast('seleccionado correctamente...','success');
            }, (err) => {
              alert("Error E: " + err);
            });
          })
          .catch(err => alert(err));
          }, (err) => {}
        ).catch(e => alert('Error F' + e));
    }
  }

  cargarPlantilla(){
    this.ui.presentLoading();
    console.log('cargarPlantilla'+ this.plantilla);    
    const formData = new FormData();
    formData.append("file", JSON.stringify(this.plantilla));
    this.adeudoService.uploadPlantilla(formData, this.idEmpresa, this.idAgente).subscribe(
      (data) => {
        console.log(data);
        this.ui.dismissLoading();
        if (data.status === 200) {          
          //this.router.navigate(['/reglamento']);    
          alert('Plantilla enviada exitosamente \n'+ data.result)
        } else {          
          alert('Problema al enviar plantilla al servidor')
        }
      }, (err) => {
        this.ui.dismissLoading();
        this.userData.showToast("Error C: " + err);
      }, () => { }
    );
  }

  cargarPlantillaConciliacion(){
    this.ui.presentLoading();
    console.log('cargarPlantillaConciliacion'+ this.plantilla);    
    const formData = new FormData();
    formData.append("file", JSON.stringify(this.plantilla));
    this.adeudoService.uploadPlantillaConciliacionP(formData, this.idEmpresa).subscribe(
      (data) => {
        console.log(data);
        this.ui.dismissLoading();
        if (data.status === 200) {          
          //this.router.navigate(['/reglamento']);    
          alert('Plantilla enviada exitosamente \n'+ data.result)
        } else {
          alert('Problema al enviar plantilla al servidor')
        }
      }, (err) => {
        this.ui.dismissLoading();
        this.userData.showToast("Error C: " + err);
      }, () => { }
    );
  }

  close(){    
    this.modalCtrl.dismiss();
  }

  

}
