import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { UserData } from '../../../providers/user-data';
import { CodigoPostalService } from '../../../services/codigo-postal.service';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Archivo } from '../../../models/archivo-vortex.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  pathBase64:string ="data:image/jpeg;base64,";
  createEmpresa = this.fb.group({
    nombre: ["", [Validators.required]],
    alias: ["",Validators.required],
    rfc: ["",Validators.required],
    telefono: ["",Validators.required],
    email: ["",Validators.required],
    integrantes: [10],//valor por default
    actividadEconomica: [11],
    direccion: this.fb.group({
      calle: [null, Validators.required],
      numeroInterior: ['', null],
      numeroExterior: ['', null],
      cp: ["",],
      asentamiento: [null, Validators.required]
    })
  });

  asentamientos: any[] = [];
  logoFondo:Archivo= null;

  constructor(private modalCtrl: ModalController ,
              private userData:UserData,
              private camera: Camera,
              private empresaService:EmpresaService,
              private codigoPostalService:CodigoPostalService,
              private toastr: ToastController,
              private fb: FormBuilder,) { }

  ngOnInit() {
  }

  validarCP() {
    console.log('validarCP');
    console.log(this.createEmpresa.value.direccion.cp);
    if(this.createEmpresa.value.direccion.cp){
      this.userData.showToast("Buscando CP, espere...");    
      this.codigoPostalService.filterCodigosPostales(this.createEmpresa.value.direccion.cp).subscribe(data => {
        if (data.status === 200) {        
          this.asentamientos = data.result;
          if(this.asentamientos.length ==0){
            this.userData.showToast("No hay asentamientos con el CP proporcionado");        
          }else{
            this.userData.showToast("Termino la busqueda, seleccione asentamiento");
          }
        } else {
          this.userData.showToast("Error al buscar el CP");
          console.log('Llego otro status');                        
          console.log(data.message);
        }
      },
      err => {
        this.userData.showToast("Error al buscar el CP");
        console.log(err);    
      });
    }else{
      this.userData.showToast("Es necesario un codigo postal");  
    }    
    
   }

   getCameraOptions(): any {
    let sourceTypeSelected;    
    sourceTypeSelected = this.camera.PictureSourceType.PHOTOLIBRARY;
    const options: CameraOptions = {
      quality: 60,
      /* destinationType: this.camera.DestinationType.FILE_URI, */
      destinationType: this.camera.DestinationType.DATA_URL, //Esto es para que lo transforme en BASE64
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceTypeSelected,
    };
    return options;
  }

   libreria() {    
    this.procesarImagen(this.getCameraOptions());
  }

  async procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then(
      (imageData) => {
        const title = this.createEmpresa.value.nombre + "_logo.jpg";              
        this.logoFondo =new Archivo(imageData, title);
      },
      (err) => {
      }
    );
  }


  async save() {
    console.log(this.createEmpresa.value);  
    if(!this.createEmpresa.valid){
      this.showToast("Por favor llene todos los campos", "danger");
      return;
    }else{
      await this.registrarEmpresa();
    }    
  }


  registrarEmpresa() {
    const formularioData = new FormData();
    formularioData.append('data',JSON.stringify(this.createEmpresa.value));
    formularioData.append('logo_fondo_claro',JSON.stringify(this.logoFondo));    
      this.empresaService.registerEmpresa(formularioData).subscribe(data => {
      console.log(data);
      if (data.status === 200) {
        console.log(data.result);
        this.userData.showToast("Se ha creado correctamente");
        this.modalCtrl.dismiss(data.result);
      } else {
        this.userData.showToast("Error: 1, No se creó el registro");
      }
    }, err => {
      console.log(err);
      if (err.status === 500) {//comunmente pasa por que el campo email es unico
        this.showToast("Error al registrar,el rfc y el alias deben ser unicos", "danger");
      }else{
        this.showToast("Error al registrar", "danger");
      }      
    },
    () => {      
    });
  }
  showToast(dataMessage: string, color_str?: string) {
    this.toastr.create({
      message: dataMessage,
      duration: 2000,
      color: color_str ? color_str : null
    }).then((toastData) => {
      toastData.present();
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }


}
