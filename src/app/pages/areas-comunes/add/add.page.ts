import { Component, OnInit } from '@angular/core';
import { AreaComun } from '../../../models/area-comun.model';
import { DataLocalAreaComunService } from '../../../services/data-local-area-comun.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  areaComun:AreaComun = new AreaComun();
  enCamara:boolean;

  constructor(private dataLocalAreaComunService: DataLocalAreaComunService,
              private camera: Camera) { }

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
      this.areaComun.imgs.push(img);
    }, (err) => {
      // Handle error
    });
  }


  save(){
    console.log('save the new area');
    console.log(this.areaComun);
    this.dataLocalAreaComunService.guardarAreaComun(this.areaComun);
  }
  
  cambioHoraInicia(event){
    this.areaComun.horaInicia = new Date(event.detail.value);
  }

  cambioHoraTermina(event){
    this.areaComun.horaTermina = new Date(event.detail.value);
  }
  
}
