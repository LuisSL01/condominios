import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Archivo } from '../../models/archivo-vortex.model';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { UserData } from '../../providers/user-data';
import { AdeudoService } from 'src/app/services/adeudo.service';


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
              private fileChooser: FileChooser,
              private filePath: FilePath,
              private modalCtrl: ModalController,
              private adeudoService:AdeudoService,
              private userData:UserData) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
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
              this.userData.showToast('procesado correctamente...','success');
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
              this.userData.showToast('procesado correctamente...','success');
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
    console.log('cargarPlantilla'+ this.plantilla);    
    const formData = new FormData();
    console.log(JSON.stringify(this.plantilla));    
    formData.append("file", JSON.stringify(this.plantilla));
    this.adeudoService.uploadPlantilla(formData, this.idEmpresa, this.idAgente).subscribe(
      (data) => {
        console.log(data);
        if (data.status === 200) {
          //this.router.navigate(['/reglamento']);    
          alert('plantilla cargada correctamente')
        } else {
          alert('Problema al cargar plantilla')
        }
      }, (err) => {
        this.userData.showToast("Error C: " + err);
      }, () => { }
    );
  }

  close(){    
    this.modalCtrl.dismiss();
  }

  

}
