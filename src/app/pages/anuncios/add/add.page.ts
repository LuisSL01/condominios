import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { Anuncio } from '../../../models/anuncio.model';
import { DataLocalAnuncioService } from '../../../services/data-local-anuncio.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;
/* import * as moment from 'moment-timezone'; */



@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  anuncio: Anuncio = new Anuncio();
  idanuncio: number;
  enCamara: boolean;


  /* momentjs: any = moment; */


  constructor(private dataLocalAnuncioService: DataLocalAnuncioService,
    private camera: Camera) {
    /* this.momentjs().tz('America/Mexico_City');   */
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
      this.anuncio.imgs.push(img);
    }, (err) => {
      // Handle error
    });
  }
  save() {
    // Set the default timezone to UTC
    // More info about moment timezone: http://momentjs.com/timezone/docs
    /* this.momentjs.tz.setDefault('UTC');
    this.momentjs.locale('es'); */
    // Current datetime according to the default timezone (UTC as determined above)
    /* let currentDateTime = this.momentjs().format('YYYY-MM-DD HH:mm:ss ZZ');
    console.log(currentDateTime); 
    // A specific datetime according to a specific timezone ('Africa/Cairo' in this example) other than the default one (UTC as determined above)
    let dateTimeAccordingToAnotherTimezone = this.momentjs().format('MMMM Do YYYY, h:mm:ss a');
    console.log(dateTimeAccordingToAnotherTimezone);
    console.log('save new anuncio');
    console.log(this.momentjs); */



    console.log(this.anuncio);
    this.dataLocalAnuncioService.guardarAnuncio(this.anuncio);
  }
  cambioFechaVence(event) {
    console.log('cambio fecha vence: ', event);
    /* this.anuncio.fechaVence = this.momentjs()(event.detail.value);  */
    this.anuncio.fechaVence = new Date(event.detail.value);
  }

}
