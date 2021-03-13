import { Component, OnInit } from "@angular/core";
import { AreaComun } from "../../../models/area-comun.model";
import { AreaComunService } from '../../../services/area-comun.service';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Router, ActivatedRoute } from '@angular/router';
import { ArchivoVortexApp, Archivo } from '../../../models/archivo-vortex.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

  files: Archivo[] = new Array();

  createArea = this.fb.group({
    
    data: this.fb.group({      
      nombre: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      comentarios: ["",],
      clasificacion:["",[Validators.required]],
      costo: ["", [Validators.required]],
      codigoColor: ["", []],
      requiereReserva: [false],
      disponibleTodosDias: [true],
      disponibleTodasHoras: [true],
      horaInicia: ['08:00'],
      horaTermina: ['22:00'],
    }),  



    diasDisponibles: [[], null] 
    
  });
  idEmpresa: number;
  idAgente: number;
  pathBase64: string = "data:image/jpeg;base64,";
  edit:boolean = false;
  areaComunChangesForm: FormGroup;

  constructor(
    private areaComunService: AreaComunService,
    private camera: Camera,
    private router: Router,
    private fb: FormBuilder,
    public activatedRoute: ActivatedRoute,
    private userData: UserData
  ) {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
    console.log("this.idEmpresa: " + this.idEmpresa);
    console.log("this.idAgente: " + this.idAgente);
    console.log(this.dias);
    
  }

  ngOnInit() {

    this.areaComun = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));    
    if(this.areaComun != null) this.prepareEdit();
    else this.areaComun = new AreaComun();

  }

  
  prepareEdit(){
    console.log('prepareEdit');
    this.edit = true;

    this.createArea = this.fb.group({      
      data: this.fb.group({
        nombre: [this.areaComun.data.nombre],
        descripcion: [this.areaComun.data.descripcion],
        comentarios: [this.areaComun.data.comentarios],
        clasificacion:[this.areaComun.data.clasificacion],
        costo: [this.areaComun.data.costo],        
        requiereReserva: [this.areaComun.data.requiereReserva],
        disponibleTodosDias: [this.areaComun.data.disponibleTodosDias],
        disponibleTodasHoras: [this.areaComun.data.disponibleTodasHoras],
        horaInicia: [this.areaComun.data.horaInicia],
        horaTermina: [this.areaComun.data.horaTermina],
      }),  
      diasDisponibles: [this.areaComun.diasDisponibles]       
    });
    this.files = this.areaComun.files.archivos;
  }

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
        this.files.push(new Archivo(imageData, title));
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


  editar() {
    console.log('editar()...');

    this.areaComunChangesForm = this.fb.group({});

    this.getDirtyFields();
    console.log('areaComunChangesForm', JSON.stringify(this.areaComunChangesForm.value));
    this.areaComunService.update(this.areaComun.id, this.areaComunChangesForm.value).subscribe(data => {
      if (data.status === 200) {
        this.createArea.markAsPristine();
        this.userData.showToast('area editado correctamente');
        this.router.navigate(["/areas-comunes"]);

      } else {
        this.userData.showToast('Error al editar registro, llego otro status');
      }
    }, err => {
      console.log(err); this.userData.showToast("Error: " + err);
    }, () => { }
    );
  }
    
  getDirtyFields() {
    console.log('getDirtyFields');    
    Object.keys(this.createArea['controls'].data['controls']).forEach(key => {
      
      if (this.createArea.get('data').get(key).dirty) {
        this.areaComunChangesForm.addControl(key, this.createArea.get('data').get(key));
      }
      /* if (this.createArea.get('nombre').get(key).dirty) {
        this.areaComunChangesForm.addControl(key, this.createArea.get('nombre').get(key));
      } */
    });
  }

  nuevo(){
    console.log(this.createArea.value);

    if( ! this.createArea.value.data.disponibleTodosDias){
      this.verificaDiasSeleccionados();

      if(this.areaComun.diasDisponibles.length === 0){
        this.userData.showToast('Debe elegir al menos un día')
        return;
      }
    }
    const areaObj={
      empresa : this.idEmpresa,
      /* nombre : this.createArea.value.nombre, */
      data : this.createArea.value.data,      
      files:{archivos:[]},
      diasDisponibles: this.areaComun.diasDisponibles
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(areaObj));
    formData.append("file", JSON.stringify(this.files));    
    console.log('objeto enviado: '+  JSON.stringify(areaObj));

    this.areaComunService.save(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.status === 200) { 
          this.userData.showToast('anuncio registrado correctamente');
          this.redirecciona();
        } else {
          this.userData.showToast('Ocurrio un error al guardar');
          /* this.guardarAreaComunLocalmente();
          this.redirecciona(); */
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

  save() {
    if(this.edit) this.editar();
    else this.nuevo();    
  }

  redirecciona(){
    this.router.navigate(["/areas-comunes"]);
  }

  guardarAreaComunLocalmente() {
    console.log('guardando anuncio localmente');    
    this.areaComun.empresa = this.idEmpresa;    
    /* this.areaComun.nombre = this.createArea.value.nombre; */

/* 
    this.areaComun.descripcion = this.createArea.value.descripcion;
    this.areaComun.costo = this.createArea.value.costo;
    this.areaComun.codigoColor = this.createArea.value.codigoColor;
    this.areaComun.horaInicia = this.createArea.value.horaInicia;
    this.areaComun.horaTermina = this.createArea.value.horaTermina; */

    this.areaComun.files.archivos = this.files;
    
    this.areaComunService.saveLocal(this.areaComun);
  }

  cambioHoraInicia(event) {
    /* this.areaComun.horaInicia = new Date(event.detail.value); */
    this.createArea.value.data.horaInicia =new Date(event.detail.value);
    
  }

  cambioHoraTermina(event) {
    /* this.areaComun.horaTermina = new Date(event.detail.value); */
    this.createArea.value.data.horaTermina =new Date(event.detail.value);
  }
}
