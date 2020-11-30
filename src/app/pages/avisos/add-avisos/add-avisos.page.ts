import { Component, OnInit, Input } from '@angular/core';
import { Publicacion } from '../../../models/publicacion.model';
import { DataLocalAvisoService } from '../../../services/data-local-aviso.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';


declare var window: any;
@Component({
  selector: 'app-add-avisos',
  templateUrl: './add-avisos.page.html',
  styleUrls: ['./add-avisos.page.scss'],
})
export class AddAvisosPage implements OnInit {


  aviso: Publicacion = new Publicacion();
  enCamara: boolean;


  //Inyectamos el servicio de data local.




  constructor(private dataLocalAvisoService: DataLocalAvisoService,
    private toastr: ToastController,
    private camera: Camera,
    private router: Router) {
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
    /* this.addMarca(); */
    /* this.addAviso(); */
    console.log(this.aviso);
    
    this.aviso.tipo = 'Aviso';
    this.dataLocalAvisoService.guardarAviso(this.aviso);
    this.router.navigate(['/avisos']); 
   

    console.log('implementando el form reactivo');
    



    
  }

  
  addAviso(){

    console.log('add aviso in add avisos page');
    this.aviso.imgs.push('una imagen path');
    this.aviso.imgs.push('2 imagen path');
    const formularioData = new FormData();
    formularioData.append('empresa','14');
    formularioData.append('titulo',this.aviso.titulo);
    formularioData.append('mensaje',this.aviso.descripcion);
    formularioData.append('agenteCreador','24');
    
    console.log('quitando el data');
    this.aviso.empresa =14;
    this.aviso.agenteCreador =24;
    console.log('seteando empresa y agente creador');
    console.log('enviando formulario data');

    this.dataLocalAvisoService.addAviso(this.aviso).subscribe(data => {
        if (data.status === 200) {
          console.log(data);
          this.showToast("Se creo correctamente el aviso:"+ data);
        } else {
          this.showToast("Error al crear el aviso:"+ data);
        }
      }, err => {
        this.showToast("Error al crear el aviso"+ err);        
      },
      () => {

      });
    

  }

  addMarca(){
    console.log('add marca in add avisos page');
    const formularioData = new FormData();

    formularioData.append('data',JSON.stringify(this.aviso));
    formularioData.append('nombre','Nombre de marca');
    formularioData.append('file_historia','sin file historia');
    formularioData.append('file_informacion','sin file informacion');
    formularioData.append('imagen','sin imagen');
    console.log('formularioData: '+JSON.stringify(formularioData));
    
    this.dataLocalAvisoService.addMarca(14,formularioData).subscribe(data => {
        if (data.status === 200) {
          console.log(data);
          this.showToast("Se creo correctamente la marca:"+ data);
        } else {
          this.showToast("Error al crear la marca:"+ data);
        }
      }, err => {
        this.showToast("Error al crear la marca:"+ err);        
      },
      () => {

      });
    

  }
  showToast(dataMessage: string) {
    this.toastr.create({
      message: dataMessage,
      duration: 2000
    }).then((toastData) => {
      toastData.present();
    });
  }

  getAviso() {

  }

  cancel(){

    
    console.log('in boton cancel..');
    this.router.navigate(['/avisos']);


    
  }
    

}
