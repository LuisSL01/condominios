import { Component, OnInit } from '@angular/core';
import { PagosComprobantes } from '../../../models/pagos-comprobantes.model';
import { DataLocalPagosComprobantesService } from '../../../services/data-local-pagos-comprobantes.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  pago: PagosComprobantes = new PagosComprobantes();
  enCamara:boolean;



  constructor(private dataLocalPagosComprobantesService: DataLocalPagosComprobantesService,
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
      this.pago.imgs.push(img);
    }, (err) => {
      // Handle error
    });
  }

  save(){
    console.log('save new Pago ');
    console.log(this.pago);
    this.dataLocalPagosComprobantesService.guardarPagoComprobante(this.pago);    
  }

}
