import { Injectable } from '@angular/core';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  filePath:string='';

  constructor(private fileTransfer: FileTransfer,
    private camera: Camera ) { }

  subirImagen( img: string ) {
    console.log('subirImagen()');
    const options: FileUploadOptions = {
      fileKey: 'image',
      /* headers: {
        'x-token': this.usuarioService.token
      } */
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload( img, `${ URL }/posts/upload`, options )
      .then( data => {
        console.log(data);
      }).catch( err => {
        console.log('error en carga', err);
      });

  }

  async camara() {
    this.filePath ='';

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    await this.procesarImagen(options);

    return this.filePath;

  }
  
  async libreria() {
    this.filePath ='';
    console.log('I am in lireria service..');

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    await this.procesarImagen(options).then( data => {

      console.log(data);
      
    }).catch( err => {
      console.log('error en carga', err);
    });

    return this.filePath;

  }

  async procesarImagen(options: CameraOptions) {
    console.log('procesarImagen()');
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

      /* const img = window.Ionic.WebView.convertFileSrc(imageData);
      console.log(img); */
      this.filePath = window.Ionic.WebView.convertFileSrc(imageData);
      
      console.log('this.filePath', this.filePath);
      
      

      /* this.postServiceService.subirImagen( imageData ); */      

    }, (err) => {
      // Handle error
    });
  }

}
