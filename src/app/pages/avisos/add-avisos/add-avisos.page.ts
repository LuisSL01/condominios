import { Component, OnInit, Input } from '@angular/core';
import { Aviso } from '../../../models/aviso.model';
import { DataLocalAvisoService } from '../../../services/data-local-aviso.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;
@Component({
  selector: 'app-add-avisos',
  templateUrl: './add-avisos.page.html',
  styleUrls: ['./add-avisos.page.scss'],
})
export class AddAvisosPage implements OnInit {


  aviso: Aviso = new Aviso();
  enCamara: boolean;


  //Inyectamos el servicio de data local.

  constructor(private dataLocalAvisoService: DataLocalAvisoService,
    private camera: Camera) {
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
      this.aviso.imgs.push(img);
    }, (err) => {
      // Handle error
    });
  }

  save() {
    console.log('save');
    console.log(this.aviso);
    this.dataLocalAvisoService.guardarAviso(this.aviso);
  }

  getAviso() {

  }

}
