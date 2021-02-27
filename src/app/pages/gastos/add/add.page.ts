import { Component, OnInit } from '@angular/core';
import { Gasto } from '../../../models/gasto.model';
import { GastoService } from '../../../services/gasto.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ArchivoVortexApp } from 'src/app/models/archivo-vortex.model';
import { FormBuilder, Validators } from "@angular/forms";
import { UserData } from '../../../providers/user-data';


declare var window: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  gasto: Gasto = new Gasto();
  enCamara:boolean;

  data: ArchivoVortexApp[] = new Array();

  createGasto = this.fb.group({
    //Esto para construir los formularios dinamicamente
    descripcion: ["", [Validators.required]],
    cantidad: ["", [Validators.required]],
    formaPago: ["", [Validators.required]],
    tipoGasto: ["", [Validators.required]]
  });

  idEmpresa: number;
  idAgente: number;
  pathBase64:string ="data:image/jpeg;base64,";

  //Inyectamos el servicio de data local.

  constructor(private gastoService : GastoService,
    private toastr: ToastController,
    private fb: FormBuilder,
    private camera: Camera,
    private router: Router,
    private userData: UserData) {
      console.log('im in constructor of gastos');
  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
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
      const title = this.createGasto.value.titulo + "_gasto.jpg";
      this.data.push(new ArchivoVortexApp(imageData, title)); //Se setea la imagen en base 64      
    }, (err) => {
      // Handle error
    });
  }

  save(){    
    console.log(this.createGasto.value);
    console.log(this.gasto)

    const gastoObj = {
      empresa: this.idEmpresa,
      agenteCreador: this.idAgente,
      cantidad: this.createGasto.value.cantidad,
      tipoGasto: this.createGasto.value.tipoGasto,
      descripcion: this.createGasto.value.descripcion,
      formaPago: this.createGasto.value.formaPago
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(gastoObj));
    formData.append("file", JSON.stringify(this.data));

    console.log('Objeto enviado..'+ JSON.stringify(gastoObj));

    this.gastoService.save(gastoObj).subscribe(
      (data) => {
        console.log(data);
        if(data.status === 200){
          this.userData.showToast('Gasto registrado correctamente');
        } else {
          this.guardarGastoLocalmente();
        }
        this.redirecciona();
      }, (err) =>{
        console.log(err);
        this.userData.showToast("Error: " + err);
        this.guardarGastoLocalmente();
        this.redirecciona();
      }, () => {}
    );
  }

  redirecciona(){
    this.router.navigate(["/gastos"]);
  }

  guardarGastoLocalmente() {
    console.log('guardando Gasto localmente');    
    this.gasto.idempresa = this.idEmpresa;    
   /*  this.areaComun.nombre = this.createArea.value.nombre;
    this.areaComun.descripcion = this.createArea.value.descripcion;
    this.areaComun.costo = this.createArea.value.costo;
    this.areaComun.codigoColor = this.createArea.value.codigoColor;
    this.areaComun.horaInicia = this.createArea.value.horaInicia;
    this.areaComun.horaTermina = this.createArea.value.horaTermina;
    this.areaComun.data = this.data; */
    
    this.gastoService.saveLocal(this.gasto);
  }

  cambioFecha(event){
    this.gasto.fechaGasto = new Date(event.detail.value);
  }

}
