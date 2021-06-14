import { Component, OnInit } from '@angular/core';
import { Archivo } from 'src/app/models/archivo-vortex.model';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { UserData } from '../../../providers/user-data';
import { PublicidadService } from '../../../services/publicidad.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  _pathUrl:string;
  image:Archivo= null;

  files: Archivo[] = new Array();

  idEmpresa:number;
  pathBase64:string ="data:image/jpeg;base64,";

  constructor(private camera: Camera,
              private modalCtrl: ModalController,
              private publicidadService:PublicidadService,
              private userData:UserData) {
    

   }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
  }


  getCameraOptions(): any {
    let sourceTypeSelected;    
    sourceTypeSelected = this.camera.PictureSourceType.PHOTOLIBRARY;
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceTypeSelected,
    };
    return options;
  }

  libreria() {    
    this.procesarImagen(this.getCameraOptions());
  }

  
  async procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then(
      (imageData) => {
        this.files = new Array();
        const title = "_publicidad.jpg";
        this.image =new Archivo(imageData, title);
        this.files.push(this.image); //Se setea la imagen en base 64
      },
      (err) => {
      }
    );
  }

  async save() {
    if(this.isEmpty(this._pathUrl)){
      this.userData.showToast("El campo url es necesario", "danger");
    }else{      
      if(this.image){



      let objPublicidadData = {
          pathUrl: this._pathUrl
          
        };



        let objPublicidad = {
          empresa:this.idEmpresa,
          files: {
            archivos: [],//Se debe enviar vacio, ya que las imagenes se procesan por separado.
          },    
          data: objPublicidadData,    
        };
        //Aqui me quede...05/05/21
        console.log("debo crear registro"+ JSON.stringify(objPublicidad));

        const formularioData = new FormData();
        formularioData.append('data',JSON.stringify(objPublicidad));
        formularioData.append('file',JSON.stringify(this.files));    
        this.publicidadService.save(formularioData).subscribe(data => {
          console.log(data);
          if (data.status === 200) {
            console.log(data.result);
            this.userData.showToast("Se ha creado correctamente");
            this.modalCtrl.dismiss(data.result);
          } else {
            this.userData.showToast("Error al crear registro", "danger");
          }
        }, err => {
          console.log(err);
          this.userData.showToast("Error en el servicio al crear registro","danger");          
        },
        () => {      
        });
      }else{
        this.userData.showToast("La imagen es necesaria", "warning");
      }
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }

}
