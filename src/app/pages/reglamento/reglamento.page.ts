import { Component, OnInit } from '@angular/core';
/* import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
*/
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
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
  selector: 'app-reglamento',
  templateUrl: './reglamento.page.html',
  styleUrls: ['./reglamento.page.scss'],
})
export class ReglamentoPage implements OnInit {

  /* fileTransfer: FileTransferObject */
  idEmpresa: number;

  constructor(
    private transfer: FileTransfer,
    private file: File,
    private fileopen: FileOpener,
    private platform: Platform,
    private userData: UserData,
    private fileChooser: FileChooser,
    private filePicker: IOSFilePicker,
    private filePath: FilePath,
    private base64: Base64,
    private empresaService: EmpresaService
  ) {
    /* this.fileTransfer = this.transfer.create(); */
  }


  ngOnInit() {
    console.log('en el ngoninit de reglamento..');

    this.idEmpresa = this.userData.getIdEmpresa();

    console.log('this.idEmpresa: ' + this.idEmpresa);

  }

  //Creamos la instancia del fileTransfer a transfer con un voley.



  /* download() {
    console.log('download');
    const fileTransfer: FileTransferObject =  this.transfer.create();    
    const url = 'https://almacenamientonube.s3.us-west-1.amazonaws.com/Config/reglamento_empresaId_7.pdf';
    fileTransfer.download(url,this.file.dataDirectory+'reglamento.pdf').then((entry) => {
      const entryUrl = entry.toURL();
      console.log('download complete: ' + entryUrl);
      this.fileopen.open(entryUrl, 'application/pdf');
    }, (error) => {
      console.log('error: '+error);      
    });     
  } */


  subirReglamento() {
    if (this.platform.is('ios')) {
      this.filePicker.pickFile()
        .then((uri) => {
          this.filePath.resolveNativePath(uri)
            .then(filePath => {
              this.base64.encodeFile(filePath).then((base64File: string) => {
                base64File = base64File.substring(base64File.lastIndexOf(',') + 1, base64File.length)
                const files: Archivo[] = new Array();
                files.push(new Archivo(base64File, "reglamento_" + this.idEmpresa + ".pdf"));
                const formData = new FormData();
                formData.append("file", JSON.stringify(files));
                this.empresaService.saveReglamentoPDF(formData, this.idEmpresa).subscribe(
                  (data) => {
                    console.log(data);
                    if (data.status === 200) {
                      //this.router.navigate(['/reglamento']);    
                      alert('Reglamento cargado correctamente')
                    } else {
                      alert('Problema al cargar el reglamento')
                    }
                  }, (err) => {
                    this.userData.showToast("Error C: " + err);
                  }, () => { }
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
      console.log('subirReglamento');
      this.fileChooser.open({ "mime": "application/pdf" })
        .then((uri) => {
          this.filePath.resolveNativePath(uri)
            .then(filePath => {
              this.base64.encodeFile(filePath).then((base64File: string) => {
                base64File = base64File.substring(base64File.lastIndexOf(',') + 1, base64File.length)
                const files: Archivo[] = new Array();
                files.push(new Archivo(base64File, "reglamento_" + this.idEmpresa + ".pdf"));
                const formData = new FormData();
                formData.append("file", JSON.stringify(files));
                this.empresaService.saveReglamentoPDF(formData, this.idEmpresa).subscribe(
                  (data) => {
                    console.log(data);
                    if (data.status === 200) {
                      //this.router.navigate(['/reglamento']);    
                      alert('Reglamento cargado correctamente')
                    } else {
                      alert('Problema al cargar el reglamento')
                    }
                  }, (err) => {
                    this.userData.showToast("Error C: " + err);
                  }, () => { }
                );
              }, (err) => {
                alert("Error E: " + err);
              });
            })
            .catch(err => alert(err));
        }, (err) => { }
        ).catch(e => alert('Error F' + e));
    }

  }


  downloadDoc() {
    console.log('downloadDoc');
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'https://almacenamientonube.s3.us-west-1.amazonaws.com/Config/reglamento_empresaId_' + this.idEmpresa + '.pdf';
    console.log('url:', url);

    const nameFile = 'reglamento_' + this.idEmpresa + '.pdf';
    const nameFolder = "ArmoniaResidencial/";
    if (this.platform.is('cordova')) {
      this.file.checkDir(this.file.externalRootDirectory, nameFolder)
        .then(
          // Directory exists, check for file with the same name
          _ => this.file.checkFile(this.file.externalRootDirectory, nameFolder + nameFile)
            .then(_ => {
              //alert("A file with the same name already exists!");
              this.fileopen.open((this.file.externalRootDirectory + nameFolder + nameFile), 'application/pdf');
            })
            // File does not exist yet, we can save normally
            .catch(err =>
              fileTransfer.download(url, this.file.externalRootDirectory + nameFolder + nameFile).then((entry) => {
                //alert('File saved in:  ' + entry.nativeURL);
                this.fileopen.open(entry.toURL(), 'application/pdf');
              })
                .catch((err) => {
                  alert('Error saving file: ' + err.message);
                })
            ))
        .catch(
          // Directory does not exists, create a new one
          err => this.file.createDir(this.file.externalRootDirectory, nameFolder, false)
            .then(response => {
              //alert('New folder created:  ' + response.fullPath);
              fileTransfer.download(url, this.file.externalRootDirectory + nameFolder + nameFile).then((entry) => {
                //  alert('File saved in : ' + entry.nativeURL);
                this.fileopen.open(entry.toURL(), 'application/pdf');
              })
                .catch((err) => {
                  alert('Error saving file:  ' + err.message);
                });

            }).catch(err => {
              alert('It was not possible to create the dir ' + nameFolder + '. Err: ' + err.message);
            })
        );

    } else {
      // If downloaded by Web Browser
      let link = document.createElement("a");
      link.download = nameFile;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      link = null;
    }
  }

  verReglamento() {
    this.userData.showToast("Descargando pdf, por favor espere...");
    this.empresaService.getEmpresaById(this.idEmpresa).subscribe(
      (data) => {
        var file: Archivo;
        file = data.result.configuracionEmpresa.reglamento;
        if (file == null) {
          alert("No hay reglamento cargado");
        } else {
          const fileTransfer: FileTransferObject = this.transfer.create();
          //const url = 'https://almacenamientonube.s3.us-west-1.amazonaws.com/Config/reglamento_empresaId_7.pdf';
          const url = 'https://almacenamientonube.s3.us-west-1.amazonaws.com/' + file.rutaS3;
          fileTransfer.download(url, this.file.dataDirectory + 'reglamento.pdf').then((entry) => {
            const entryUrl = entry.toURL();
            console.log('download complete: ' + entryUrl);
            this.fileopen.open(entryUrl, 'application/pdf');
          }, (error) => {
            console.log('error: ' + error);
          });
        }
      }, (err) => {
        console.log(err);
        this.userData.showToast("Error: " + err);
      }, () => { }
    );

  }

  generarPdf() {


    var b64PDF = "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YmoKMTQgMCBvYmoKPDwvTmFtZXMgMTMgMCBSL1R5cGUvQ2F0YWxvZy9QYWdlcyA0IDAgUi9WaWV3ZXJQcmVmZXJlbmNlczw8L1ByaW50U2NhbGluZy9BcHBEZWZhdWx0Pj4+PgplbmRvYmoKMTUgMCBvYmoKPDwvTW9kRGF0ZShEOjIwMjEwMzA0MTgzODQ1WikvQ3JlYXRvcihKYXNwZXJSZXBvcnRzIExpYnJhcnkgdmVyc2lvbiA2LjExLjAtMGM0MDU2Y2NhYTRkMjVhNWE4YzQ1NjcyZDJmNzY0ZWEzNDk4YmViYikvQ3JlYXRpb25EYXRlKEQ6MjAyMTAzMDQxODM4NDVaKS9Qcm9kdWNlcihpVGV4dCAyLjEuNyBieSAxVDNYVCk+PgplbmRvYmoKeHJlZgowIDE2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMTM5MiAwMDAwMCBuIAowMDAwMDA1MDk3IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwNTE4NSAwMDAwMCBuIAowMDAwMDAzMjkwIDAwMDAwIG4gCjAwMDAwMDE2MzMgMDAwMDAgbiAKMDAwMDAwNDc0OSAwMDAwMCBuIAowMDAwMDAzNTMxIDAwMDAwIG4gCjAwMDAwMDQ5OTAgMDAwMDAgbiAKMDAwMDAwNTAyNSAwMDAwMCBuIAowMDAwMDA1MDYxIDAwMDAwIG4gCjAwMDAwMDUyNjAgMDAwMDAgbiAKMDAwMDAwNTM2OSAwMDAwMCBuIAowMDAwMDA1NDAzIDAwMDAwIG4gCjAwMDAwMDU1MDggMDAwMDAgbiAKdHJhaWxlcgo8PC9JbmZvIDE1IDAgUi9JRCBbPDYzNDdlYzYzNWJmYjQ0N2U3ZjIwYTBjNzEzNDM0Mzg4PjwyOTMyYjA3Zjk5OTkxYTFjNDVlNDE4NTA2YjcxOTg4Mj5dL1Jvb3QgMTQgMCBSL1NpemUgMTY+PgpzdGFydHhyZWYKNTcwNgolJUVPRgo=";
    fetch('data:application/pdf;base64,' + b64PDF, { method: "GET" })
      .then(res => res.blob())
      .then(blob => {
        //this.file.writeFile(this.file.externalApplicationStorageDirectory, 'Recibo.pdf', blob, { replace: true })
        this.file.writeFile(this.file.cacheDirectory, 'Recibo.pdf', blob, { replace: true })
          .then(res => {
            this.fileopen.open(
              res.toInternalURL(),
              'application/pdf')
              .then((res) => { })
              .catch(err => {
                console.log('open error')
                this.userData.showToast('open error!');
              });
          })
          .catch(err => {
            console.log('save error')
            this.userData.showToast('save error!');
          });
      }).catch(err => {
        console.log('error')
        this.userData.showToast('error!');
      });
  }
}
