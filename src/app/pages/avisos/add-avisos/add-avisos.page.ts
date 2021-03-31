import { Component, OnInit, Input } from '@angular/core';
import { Publicacion } from '../../../models/publicacion.model';
import { AvisoService } from '../../../services/aviso.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { ArchivoVortexApp } from 'src/app/models/archivo-vortex.model';
import { FormBuilder, Validators } from "@angular/forms";
import { UserData } from '../../../providers/user-data';
import { AgenteService } from '../../../services/agente.service';
import { Archivo } from '../../../models/archivo-vortex.model';


declare var window: any;
@Component({
  selector: 'app-add-avisos',
  templateUrl: './add-avisos.page.html',
  styleUrls: ['./add-avisos.page.scss'],
})
export class AddAvisosPage implements OnInit {


  notificacion: Publicacion = new Publicacion();
  enCamara: boolean;

  files: Archivo[] = new Array();
  /* dataTemp: ArchivoVortexApp[] = new Array();   */

  manzanas: any[] =  [];

  createNotificacion = this.fb.group({
    //Esto para construir los formularios dinamicamente
    data: this.fb.group({
      destinatario: ["", [Validators.required]],
      titulo: ["", [Validators.required]],
      descripcion: ["", [Validators.required]]
    }),  

    tipo: ["NOTIFICACION"],
  });

  notificacionChangesForm: FormGroup;


  idEmpresa: number;
  idAgente: number;

  pathBase64:string ="data:image/jpeg;base64,";
  edit: boolean = false;

  //Inyectamos el servicio de data local.




  constructor(private notificacionService: AvisoService,
    private agenteService: AgenteService,
    private toastr: ToastController,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private camera: Camera,
    private router: Router,
    private userData: UserData) {
  }

  ngOnInit() {
    this.buscarManzanas();
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();

    
    this.notificacion = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    if (this.notificacion != null) this.prepareEdit();
    else this.notificacion = new Publicacion();


  }
  prepareEdit() {
    console.log('prepareEdit');
    this.edit = true; 
    this.createNotificacion = this.fb.group({
      data: this.fb.group({
        destinatario: [this.notificacion.data.destinatario],
        titulo: [this.notificacion.data.titulo],
        descripcion: [this.notificacion.data.descripcion]
      }),
      tipo: ["NOTIFICACION"],
    });
  }

  buscarManzanas(){
    console.log('buscando manzanas');    
/*     this.manzanas = [
      "37-B", "38-B", "39-B",
      "40-A",  
  ]; */

  this.agenteService.getManzanas(this.userData.getIdEmpresa()).subscribe(
    (data) => {
      if (data.status === 200) {
        console.log('Manzanas recuperadas correctamente');
        this.manzanas = data.result;
      } else {
        console.log('Llego otro status al recuperar manzanas');
      }
    },
    (err) => {
      console.log(err);
    }
  );
  }

  getCameraOptions(): CameraOptions {

    let sourceTypeSelected;
    if (this.enCamara) {
      sourceTypeSelected = this.camera.PictureSourceType.CAMERA;
    } else {
      sourceTypeSelected = this.camera.PictureSourceType.PHOTOLIBRARY;
    }
    const options: CameraOptions = {
      quality: 60,
      /* destinationType: this.camera.DestinationType.FILE_URI, */
      destinationType: this.camera.DestinationType.DATA_URL,
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
      /* const img = "data:image/jpeg;base64," + imageData; //Se agrega para que se muestren en la lista */
      const title = this.createNotificacion.value.titulo + "_notificacion.jpg";
      /* this.dataTemp.push(new ArchivoVortexApp(img, title)); */
      /* this.files.push(new ArchivoVortexApp(imageData, title)); //Se setea la imagen en base 64       */
      this.files.push(new Archivo(imageData, title)); //Se setea la imagen en base 64      
    }, (err) => {
      // Handle error
    });
  }

  save() {
    if (this.edit) this.editar();
    else this.nuevo();
  }
  nuevo(){    
    const notificacionObj ={
      empresa:this.idEmpresa,
      agenteCreador:this.idAgente,
      data: this.createNotificacion.value.data,
      tipo: this.createNotificacion.value.tipo,
      files: {
        archivos: [],//Se debe enviar vacio, ya que las imagenes se procesan por separado.
      },
      respuestas: {
        respuestasPublicacion: [],//Se debe enviar vacio, ya que en un principio no se tienen respuestas
      },
    };

    const formData = new FormData(); //Esto no esta trabajanco chido...
    formData.append("data", JSON.stringify(notificacionObj));
    formData.append("file", JSON.stringify(this.files));    
    this.notificacionService.save(formData).subscribe(
      (data) => {
        if (data.status === 200) {
          this.createNotificacion.reset();
          this.router.navigate(['/avisos', { item: true }]);
        } else {
          this.userData.showToast('error1 al guardar');          
        }
      },
      (err) => {      
        this.userData.showToast('error 2 al guardar');       
      },
      () => {}
    );

  }
  editar(){
    console.log('editar()...');
    this.notificacionChangesForm = this.fb.group({});
    this.getDirtyFields();
    console.log('resolucionChangesForm', JSON.stringify(this.notificacionChangesForm.value));

    this.notificacionService.update(this.notificacion.id, this.notificacionChangesForm.value).subscribe(data => {
      if (data.status === 200) {
        this.createNotificacion.reset();
        this.router.navigate(['/avisos', { item: true }]);
      } else {
        this.userData.showToast('Error al editar registro, llego otro status');
      }
    }, err => {
      console.log(err); this.userData.showToast("Error: " + err);
    },
      () => {
      });
  }

  getDirtyFields() {
    Object.keys(this.createNotificacion['controls'].data['controls']).forEach(key => {
      if (this.createNotificacion.get('data').get(key).dirty) {
        this.notificacionChangesForm.addControl(key, this.createNotificacion.get('data').get(key));
      }
    });
  }

  guardarNotificacionLocalmente() {
    console.log('guardando anuncio localmente');    
    /*
    this.notificacion.empresa = this.idEmpresa;
    this.notificacion.agenteCreador = this.idAgente;
    this.notificacion.data.titulo = this.createNotificacion.value.titulo;
    this.notificacion.data.descripcion = this.createNotificacion.value.descripcion;    
    this.notificacion.tipo = this.createNotificacion.value.tipo;    
    this.notificacion.files = this.files;
    this.notificacionService.saveLocal(this.notificacion);
    */
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
