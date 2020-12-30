import { Component, OnInit } from "@angular/core";
import { AreaComun } from "../../../models/area-comun.model";
import { AreaComunService } from '../../../services/area-comun.service';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Router } from "@angular/router";
import { ArchivoVortexApp } from "../../../models/archivo-vortex.model";
import { FormBuilder, Validators } from "@angular/forms";
import { UserData } from "../../../providers/user-data";

declare var window: any;

@Component({
  selector: "app-add",
  templateUrl: "./add.page.html",
  styleUrls: ["./add.page.scss"],
})
export class AddPage implements OnInit {

  clasificacionAreas: string[] = ['Area verde','Juegos infantiles','Mascotas','Trota pista', 'Otro'];

  diasSelected:any[]=[];

  dias: any[] = [
    { name: 'Domingo', isChecked: false, pos: 0 },
    { name: 'Lunes',isChecked: false, pos: 1}, 
    { name: 'Martes',isChecked: false, pos: 2}, 
    { name: 'Miércoles',isChecked: false, pos: 3}, 
    { name: 'Jueves',isChecked: false, pos: 4}, 
    { name: 'Viernes', isChecked: false, pos: 5},
    { name: 'Sábado', isChecked: false, pos: 6}
  ]

  areaComun: AreaComun = new AreaComun();
  enCamara: boolean;

  data: ArchivoVortexApp[] = new Array();

  createArea = this.fb.group({
    //Esto para construir los formularios dinamicamente
    nombre: ["", [Validators.required]],
    descripcion: ["", [Validators.required]],
    clasificacion:["",[Validators.required]],
    costo: ["", [Validators.required]],
    codigoColor: ["", []],
    disponibleTodosDias: [true],
    disponibleTodasHoras: [true],
    horaInicia: ['08:00'],
    horaTermina: ['22:00'],
    diasDisponibles: [[], null] 
    
  });
  idEmpresa: number;
  idAgente: number;
  pathBase64: string = "data:image/jpeg;base64,";

  constructor(
    private areaComunService: AreaComunService,
    private camera: Camera,
    private router: Router,
    private fb: FormBuilder,
    private userData: UserData
  ) {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
    console.log("this.idEmpresa: " + this.idEmpresa);
    console.log("this.idAgente: " + this.idAgente);
    console.log(this.dias);
    
  }

  ngOnInit() {}

  getCameraOptions(): any {
    let sourceTypeSelected;
    if (this.enCamara) {
      sourceTypeSelected = this.camera.PictureSourceType.CAMERA;
    } else {
      sourceTypeSelected = this.camera.PictureSourceType.PHOTOLIBRARY;
    }
    const options: CameraOptions = {
      quality: 40,
      /* destinationType: this.camera.DestinationType.FILE_URI, */
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceTypeSelected,
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
    this.camera.getPicture(options).then(
      (imageData) => {
        /* const img = window.Ionic.WebView.convertFileSrc(imageData); */
        const title = this.createArea.value.titulo + "_area-comun.jpg";        
        this.data.push(new ArchivoVortexApp(imageData, title));
      },
      (err) => {
        // Handle error
      }
    );
  }

  verificaDiasSeleccionados() {
    console.log('verificaDiasSeleccionados');

    this.dias.forEach(day => {
      if (day.isChecked) {
        this.areaComun.diasDisponibles.push(day.pos);
      }      
      console.log(day);
    });

  }


  diaIsClicked(dia : any){
    dia.isChecked = !dia.isChecked;

    console.log('diaIsClicked: '+dia);    
    this.diasSelected.push(dia);
    console.log(this.diasSelected);
    console.log(this.dias);
  }

  save() {
    /* this.dataLocalAreaComunService.guardarAreaComun(this.areaComun);
    this.router.navigate(["/mis-areas-comunes/areas-comunes"]); */
    console.log(this.createArea.value);

    if( ! this.createArea.value.disponibleTodosDias){
      this.verificaDiasSeleccionados();

      if(this.areaComun.diasDisponibles.length === 0){
        this.userData.showToast('Debe elegir al menos un día')
        return;
      }

    }


    console.log(this.areaComun);
    

    const areaObj={
      empresa : this.idEmpresa,
      nombre : this.createArea.value.nombre,
      descripcion : this.createArea.value.descripcion,
      costo : this.createArea.value.costo,
      codigoColor:this.createArea.value.codigoColor,
      clasificacion:this.createArea.value.clasificacion,
      disponibleTodosDias: this.createArea.value.disponibleTodosDias,
      disponibleTodasHoras: this.createArea.value.disponibleTodasHoras,
      horaInicia : this.createArea.value.horaInicia,
      horaTermina : this.createArea.value.horaTermina,
      data:{archivos:[]},
      diasDisponibles: this.areaComun.diasDisponibles
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(areaObj));
    formData.append("file", JSON.stringify(this.data));


    
    console.log('objeto enviado: '+  JSON.stringify(areaObj));

    this.areaComunService.save(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.status === 200) { 
          this.userData.showToast('anuncio registrado correctamente');
          this.redirecciona();
        } else {          
          this.guardarAreaComunLocalmente();
          this.redirecciona();
        }
      },
      (err) => {
        console.log(err);
        this.userData.showToast("Error: "+ err);
        this.guardarAreaComunLocalmente();
        this.redirecciona();
       
      },
      () => {}
    );
  }

  redirecciona(){
    this.router.navigate(["/areas-comunes"]);
  }

  guardarAreaComunLocalmente() {
    console.log('guardando anuncio localmente');    
    this.areaComun.empresa = this.idEmpresa;    
    this.areaComun.nombre = this.createArea.value.nombre;
    this.areaComun.descripcion = this.createArea.value.descripcion;
    this.areaComun.costo = this.createArea.value.costo;
    this.areaComun.codigoColor = this.createArea.value.codigoColor;
    this.areaComun.horaInicia = this.createArea.value.horaInicia;
    this.areaComun.horaTermina = this.createArea.value.horaTermina;
    this.areaComun.data = this.data;
    
    this.areaComunService.saveLocal(this.areaComun);
  }

  cambioHoraInicia(event) {
    this.areaComun.horaInicia = new Date(event.detail.value);
  }

  cambioHoraTermina(event) {
    this.areaComun.horaTermina = new Date(event.detail.value);
  }
}
