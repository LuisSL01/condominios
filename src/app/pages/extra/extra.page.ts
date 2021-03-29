import { Component, OnInit } from '@angular/core';

import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Archivo } from '../../models/archivo-vortex.model';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.page.html',
  styleUrls: ['./extra.page.scss'],
})
export class ExtraPage implements OnInit {

  idEmpresa: number;

  constructor(private transfer: FileTransfer, 
    private file: File,
    private fileopen: FileOpener,
    private platform: Platform,
    private userData: UserData,
    private fileChooser: FileChooser,
    private filePicker: IOSFilePicker,
    private filePath: FilePath,
    private base64: Base64,
    private empresaService: EmpresaService) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
  }

  cargarFormato() {
    this.userData.showToast("Cargando formato, por favor espere...");
    if (this.platform.is('ios')) {
      this.filePicker.pickFile()
        .then((uri) => {
          this.filePath.resolveNativePath(uri)
          .then(filePath => {
            this.base64.encodeFile(filePath).then((base64File: string) => {
              base64File = base64File.substring(base64File.lastIndexOf(',') + 1, base64File.length)
              const files: Archivo[] = new Array();
              files.push(new Archivo(base64File, "formatoconst_" + this.idEmpresa + ".pdf"));
              const formData = new FormData();
              formData.append("file", JSON.stringify(files));
              this.empresaService.saveFormatoConstruccionPDF(formData, this.idEmpresa).subscribe(
                (data) => {
                  console.log(data);
                  if(data.status === 200){          
                    //this.router.navigate(['/reglamento']);    
                    alert('El formato se ha cargado correctamente')      
                  } else {
                    alert('Problema al cargar el formato')   
                  }
                }, (err) =>{
                  this.userData.showToast("Error C: " + err);
                }, () => {}
              );
            }, (err) => {
              alert("Error E: " + err);
            });
          })
          .catch(err => alert(err));
        })
        .catch(err => alert('Error F' + err));
    } else {
      console.log('is in android');
      this.fileChooser.open({ "mime": "application/pdf" })
        .then((uri) =>{
          this.filePath.resolveNativePath(uri)
          .then(filePath => {
            this.base64.encodeFile(filePath).then((base64File: string) => {
              base64File = base64File.substring(base64File.lastIndexOf(',') + 1, base64File.length)
              const files: Archivo[] = new Array();
              files.push(new Archivo(base64File, "formatoconst_" + this.idEmpresa + ".pdf"));
              const formData = new FormData();
              formData.append("file", JSON.stringify(files));
              this.empresaService.saveFormatoConstruccionPDF(formData, this.idEmpresa).subscribe(
                (data) => {
                  console.log(data);
                  if(data.status === 200){          
                    //this.router.navigate(['/reglamento']);    
                    alert('El formato se ha cargado correctamente')      
                  } else {
                    alert('Problema al cargar el formato')   
                  }
                }, (err) =>{
                  this.userData.showToast("Error C: " + err);
                }, () => {}
              );
            }, (err) => {
              alert("Error E: " + err);
            });
          })
          .catch(err => alert(err));
          }, (err) => {}
        ).catch(e => alert('Error F' + e));
    }

  }

  verFormato(){
    this.userData.showToast("Descargando pdf, por favor espere...");
    this.empresaService.getEmpresaById(this.idEmpresa).subscribe(
      (data) => {
        var file : Archivo;
        file = data.result.configuracionEmpresa.formatoConstruccion;
        if(file == null){
          alert("Aún no se ha cargado un formato");
        } else {
          const fileTransfer: FileTransferObject =  this.transfer.create();    
          const url = 'https://almacenamientonube.s3.us-west-1.amazonaws.com/' + file.rutaS3;
          fileTransfer.download(url, this.file.dataDirectory + 'formatoConstruccion.pdf').then((entry) => {
            const entryUrl = entry.toURL();
            console.log('download complete: ' + entryUrl);
            this.fileopen.open(entryUrl, 'application/pdf');
          }, (error) => {
            console.log('error: '+error);      
          }); 
        }      
      }, (err) =>{
        console.log(err);
        this.userData.showToast("Error: " + err);
      }, () => {}
    );
 
  }
}
