import { Component, OnInit } from '@angular/core';
import { Gasto } from '../../../models/gasto.model';
import { GastoService } from '../../../services/gasto.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ArchivoVortexApp } from 'src/app/models/archivo-vortex.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserData } from '../../../providers/user-data';
import { Archivo } from '../../../models/archivo-vortex.model';


declare var window: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  gasto: Gasto = new Gasto();
  enCamara:boolean;

  files: Archivo[] = new Array();
  
  idEmpresa: number;
  idAgente: number;
  pathBase64:string ="data:image/jpeg;base64,";
  edit:boolean = false;

  createGasto = this.fb.group({
    data: this.fb.group({
      descripcion: ["", [Validators.required]],
      cantidad: ["", [Validators.required]],
      formaPago: ["", [Validators.required]],
      tipoGasto: ["", [Validators.required]],
      fechaGasto: [new Date()]
    })
  });

  gastoChangesForm: FormGroup;

  //Inyectamos el servicio de data local.

  constructor(private gastoService : GastoService,
    private toastr: ToastController,
    private fb: FormBuilder,
    private camera: Camera,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private userData: UserData) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();

    this.gasto = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));    
    if(this.gasto != null) this.prepareEdit();
    else this.gasto = new Gasto();
  }

  prepareEdit(){
    console.log('prepareEdit');
    this.edit = true;
    this.createGasto = this.fb.group({
      data: this.fb.group({
        descripcion: [this.gasto.data.descripcion],
        cantidad: [this.gasto.data.cantidad],
        formaPago: [this.gasto.data.formaPago],
        tipoGasto: [this.gasto.data.tipoGasto],
        fechaGasto: [this.gasto.data.fechaGasto]
      })      
    });
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
      const title = this.createGasto.value.tipoGasto + "_gasto.jpg";
      this.files.push(new Archivo(imageData, title)); //Se setea la imagen en base 64      
    }, (err) => {
      // Handle error
    });
  }

  save(){ 
    if(this.edit) this.editar();
    else this.nuevo();   
    
  }

  editar(){
    console.log('editar()...');    
    this.gastoChangesForm = this.fb.group({});
    this.getDirtyFields();
    console.log('gastoChangesForm', JSON.stringify(this.gastoChangesForm.value));
    this.gastoService.update(this.gasto.id, this.gastoChangesForm.value).subscribe(data => {
      if (data.status === 200) {
        this.createGasto.reset();
        this.userData.showToast('editado correctamente');
        this.router.navigate(['/gastos', { item: true}]);
      } else {
        this.userData.showToast('Error al editar registro, llego otro status');
      }
    }, err => {
      console.log(err);this.userData.showToast("Error: "+ err);
    },
      () => {
      });
  }

  getDirtyFields() {    
    Object.keys(this.createGasto['controls'].data['controls']).forEach(key => {
      if (this.createGasto.get('data').get(key).dirty) {
        this.gastoChangesForm.addControl(key, this.createGasto.get('data').get(key));
      }
    });
  }
  nuevo(){    
    const gastoObj = {
      empresa: this.idEmpresa,
      agenteCreador: this.idAgente,
      data: this.createGasto.value.data,
      /* tipoDeGasto: this.createGasto.value.tipoGasto, */
      /* fechaDeCreacion: this.createGasto.value.fechaGasto, */
      files: {
        archivos: [],//Se debe enviar vacio, ya que las imagenes se procesan por separado.
      }
    };
    console.log('Objeto pre: ' + JSON.stringify(gastoObj));
    const formData = new FormData();
    formData.append("data", JSON.stringify(gastoObj));
    formData.append("file", JSON.stringify(this.files));
    console.log('Objeto enviado: ' + JSON.stringify(formData));
    this.gastoService.save(formData).subscribe(
      (data) => {
        console.log(data);
        if(data.status === 200){          
          this.createGasto.reset();     
          this.router.navigate(['/gastos', { item: true}]);          
        } else {
          this.userData.showToast('Problema al registrar el Gasto');
        }
      }, (err) =>{
        console.log(err);
        this.userData.showToast("Error: " + err);
      }, () => {}
    );
  }

  redirecciona(){
    this.router.navigate(["/gastos"]);
  }

  guardarGastoLocalmente() {
    console.log('Guardando Gasto localmente');    
    this.gasto.empresa = this.idEmpresa;        
    this.gastoService.saveLocal(this.gasto);
  }

  cambioFecha(event){
    /* this.gasto.fechaDeCreacion = new Date(event.detail.value); */
    
  }

}
