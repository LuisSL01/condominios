import { Component, OnInit } from '@angular/core';
import { Gasto } from '../../../models/gasto.model';
import { DataLocalGastoService } from '../../../services/data-local-gasto.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  gasto: Gasto = new Gasto();
  enCamara:boolean;

  constructor(private dataLocalGastoService : DataLocalGastoService,
              private camera: Camera) {
    console.log('im in constructor of gastos');
    
   }

  ngOnInit() {
  }

  getCameraOptions(): any {
    let sourceTypeSelected;
    if (this.enCamara) {
      sourceTypeSelected = this.camera.PictureSourceType.CAMERA;
    } else {
      sourceTypeSelected = this.camera.PictureSourceType.PHOTOLIBRARY;
    }
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceTypeSelected
    };
    return options;
  }

  camara() {
    this.enCamara = true;
    this.procesarImagen(this.getCameraOptions());
  }

  libreria() {
    this.enCamara = false;
    this.procesarImagen(this.getCameraOptions());
  }


  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.gasto.imgs.push(img);
    }, (err) => {
      // Handle error
    });
  }

  cambioFecha(event){
    console.log('cambio fecha..');
    this.gasto.fechaGasto = new Date(event.detail.value);
  }
  save(){
    console.log('save a new gasto');
    console.log(this.gasto);
    this.dataLocalGastoService.guardarGasto(this.gasto);
  }

}
