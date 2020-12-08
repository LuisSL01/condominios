import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { Anuncio } from '../../../models/anuncio.model';
import { DataLocalAnuncioService } from '../../../services/data-local-anuncio.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;
/* import * as moment from 'moment-timezone'; */
import { Router } from '@angular/router';
import { Publicacion } from '../../../models/publicacion.model';
import { ArchivoVortex } from 'src/app/models/archivo-vortex.model';



@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  anuncio: Publicacion = new Publicacion();
  idanuncio: number;
  enCamara: boolean;


  /* momentjs: any = moment; */


  constructor(private dataLocalAnuncioService: DataLocalAnuncioService,
    private camera: Camera,
    private router:Router) {
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
      
      this.anuncio.data.push(new ArchivoVortex(img));//Se crea un elemento de tipo archivo vortex cada que se toma una foto

    }, (err) => {
      // Handle error
    });
  }
  save() {
    console.log(this.anuncio);
    this.anuncio.tipo = 'Anuncio';
    this.dataLocalAnuncioService.guardarAnuncio(this.anuncio);
    this.router.navigate(['/anuncios']);
  }
  cambioFechaVence(event) {
    console.log('cambio fecha vence: ', event);
    /* this.anuncio.fechaVence = this.momentjs()(event.detail.value);  */
    this.anuncio.fechaVence = new Date(event.detail.value);
  }

}
