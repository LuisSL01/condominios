import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera , CameraOptions } from '@ionic-native/camera/ngx';
import { BitacoraVisita } from '../../../models/bitacora-visitas.model';
import { DataLocalBitacoraVisitaService } from '../../../services/data-local-bitacora-visita.service';


declare var window: any;


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  registroVisita:BitacoraVisita = new BitacoraVisita();
  enCamara:boolean;


  constructor(private dataLocalBitacoraVisitaService : DataLocalBitacoraVisitaService,
              private camera:Camera,
              private router:Router) { }

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
      this.registroVisita.imgs.push(img);
    }, (err) => {
      // Handle error
    });
  }

  scanQR(){
    console.log('scanQR()');
    
  }
  
  save() {
    console.log(this.registroVisita);
    this.dataLocalBitacoraVisitaService.guardar(this.registroVisita);
    this.router.navigate(['/bitacora-visitas']);
  }

}
