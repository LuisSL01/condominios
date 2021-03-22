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


@Component({
  selector: 'app-reglamento',
  templateUrl: './reglamento.page.html',
  styleUrls: ['./reglamento.page.scss'],
})
export class ReglamentoPage implements OnInit {

  /* fileTransfer: FileTransferObject */
  idEmpresa: number;

  constructor(
    private transfer: FileTransfer, private file: File,
    private fileopen: FileOpener,
    private platform: Platform,
    private userData: UserData,
    private fileChooser: FileChooser,
    private filePicker: IOSFilePicker
  ) {
    /* this.fileTransfer = this.transfer.create(); */
  }


  ngOnInit() {
    console.log('en el ngoninit de reglamento..');
    
    this.idEmpresa = this.userData.getIdEmpresa();

    console.log('this.idEmpresa: '+ this.idEmpresa);
    
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


  subirReglamento(){

    if(this.platform.is('ios')){    
      
this.filePicker.pickFile()
.then(uri => console.log(uri))
.catch(err => console.log('Error', err));  


  }
  else{
    console.log('is in android');
    console.log('subirReglamento');    
    this.fileChooser.open()
    .then(uri => 
      console.log(uri))
    .catch(e => 
      console.log(e));
      // run android code
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

}
