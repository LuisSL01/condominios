import { Component, OnInit } from '@angular/core';
import { Aviso } from '../../../models/aviso.model';
import { DataLocalAvisoService } from '../../../services/data-local-aviso.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PostServiceService } from '../../../services/post-service.service';

declare var window: any;
@Component({
  selector: 'app-add-avisos',
  templateUrl: './add-avisos.page.html',
  styleUrls: ['./add-avisos.page.scss'],
})
export class AddAvisosPage implements OnInit {


  aviso: Aviso = new Aviso();


  //Inyectamos el servicio de data local.

  constructor(private dataLocalAvisoService: DataLocalAvisoService,
    private postServiceService: PostServiceService,
    private camera: Camera) { }

  ngOnInit() {
  }

  camara() {
    /*     const path = this.postServiceService.camara();     
        console.log('path', path);    
        if(path){
          console.log('agregando el path en el camara');      
          this.aviso.imgs.push(path);
        } */

      const options: CameraOptions = {
        quality: 60,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: this.camera.PictureSourceType.CAMERA
      };
  
      this.procesarImagen(options);

  }



  libreria() {

    console.log('avisos page libreria()');
/* 
    await this.postServiceService.libreria().then( data => {
      console.log(data);
    }).catch( err => {
      console.log('error en carga', err);
    });
    
    const path = this.postServiceService.filePath;
    console.log('path');
    console.log(path);
    console.log('agregando el path en libreria');
    this.aviso.imgs.push(path); */



    
        const options: CameraOptions = {
          quality: 60,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
    
        this.procesarImagen(options);

  }

  procesarImagen(options: CameraOptions) {
    console.log('procesarImagen()');
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

      const img = window.Ionic.WebView.convertFileSrc(imageData);
      console.log(img);

      /* this.postServiceService.subirImagen( imageData ); */

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
