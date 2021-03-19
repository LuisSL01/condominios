import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera , CameraOptions } from '@ionic-native/camera/ngx';
import { BitacoraVisita } from '../../../models/bitacora-visitas.model';
import { BitacoraVisitaService } from '../../../services/bitacora-visita.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserData } from '../../../providers/user-data';
import { ArchivoVortexApp, Archivo } from '../../../models/archivo-vortex.model';

import { VisitaService } from '../../../services/visita.service';
import { Visita } from '../../../models/visita.model';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


declare var window: any;


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  registroVisita:BitacoraVisita = new BitacoraVisita();

  visitaFound:Visita;

  enCamara:boolean;

  files: Archivo[] = new Array();

  createBitacoraVisita = this.fb.group({
    data: this.fb.group({
      nombreCompleto: ["", [Validators.required]],
      conAuto: [false,],
      placa:["",],
      personasIngresan: [1,],
      observaciones: ["", []],
      visitaProgramada: [true]    
    })
  });

  bitacoraVisitaChangesForm: FormGroup;

  idEmpresa: number;
  idAgente: number;
  pathBase64: string = "data:image/jpeg;base64,";
  abrirQR:boolean = true;
  edit:boolean=false;
  constructor(private bitacoraVisitaService : BitacoraVisitaService,
              private visitaService: VisitaService,
              private camera:Camera,
              private router:Router,
              private fb: FormBuilder,
              private userData: UserData,
              public activatedRoute: ActivatedRoute,
              private barcodeScanner: BarcodeScanner
              ) { }

  ngOnInit() {
    console.log('en el ngoninit');
    
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();

    this.registroVisita = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));    
    if(this.registroVisita != null) this.prepareEdit();
    else this.registroVisita = new BitacoraVisita();
  }

  prepareEdit(){
    this.abrirQR = false;
    console.log('prepareEdit');
    this.edit = true;

    this.createBitacoraVisita = this.fb.group({
      data: this.fb.group({
        nombreCompleto: [this.registroVisita.data.nombreCompleto],
        conAuto: [this.registroVisita.data.conAuto],
        placa:[this.registroVisita.data.placa],
        personasIngresan: [this.registroVisita.data.personasIngresan],
        observaciones: [this.registroVisita.data.observaciones],
        visitaProgramada: [this.registroVisita.data.visitaProgramada]
      })
    });
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter');        
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter');
    if(this.abrirQR)
      this.scanQR();
    
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
      /* const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.registroVisita.imgs.push(img); */
      const title = this.createBitacoraVisita.value.nombreCompleto + "_bitacora-visita.jpg";        
      this.files.push(new Archivo(imageData, title));
    }, (err) => {
      // Handle error
    });
  }

  scanQR(){    
    console.log('scanQR()');
    console.log('deberia estar llamando al method');    
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.buscaInfoVisita(barcodeData.text);
    }).catch(err => {
      console.log('Error', err);
    });
  }

  buscaInfoVisita(data_visita:string){
    console.log("buscaInfoVisita");

    this.visitaFound = null;
    let x = atob(data_visita).split("|");

    console.log(x[0]);
    console.log(x[1]);

    this.visitaService.getVisitaByIdAndUUID(x[0], x[1]).subscribe((data) => {

      if (data.status === 200) { 
        this.visitaFound = data.result;         
      }else  this.userData.showToast('No se encontro el registro');
    },
    (err) => {
        this.userData.showToast("Error en el servicio al recuperar registro");
    },
    () => {}
  );


  }

  generateQr(){
    
  }

  editar(){
    console.log('editar()...');

    this.bitacoraVisitaChangesForm = this.fb.group({});        
    this.getDirtyFields();

    console.log('bitacoraVisitaChangesForm', JSON.stringify(this.bitacoraVisitaChangesForm.value));

    this.bitacoraVisitaService.update(this.registroVisita.id, this.bitacoraVisitaChangesForm.value).subscribe(data => {
      if (data.status === 200) {        
        this.createBitacoraVisita.markAsPristine();
        this.createBitacoraVisita.reset();
        this.router.navigate(['/bitacora-visitas', { item: true}]); 

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
    console.log('getDirtyFields');    
    Object.keys(this.createBitacoraVisita['controls'].data['controls']).forEach(key => {
      if (this.createBitacoraVisita.get('data').get(key).dirty) {
        this.bitacoraVisitaChangesForm.addControl(key, this.createBitacoraVisita.get('data').get(key));
      }
    });
  }
  
  nuevo(){

    console.log('value: ');
    console.log( this.createBitacoraVisita.value);    
    const bitacoraVisitaObj={
      empresa : this.idEmpresa,
      agenteCreador: this.idAgente,
      visita : (this.visitaFound === null ? null :this.visitaFound?.id),
      data: this.createBitacoraVisita.value.data,
      files:{archivos:[]}
    };


    const formData = new FormData();
    formData.append("data", JSON.stringify(bitacoraVisitaObj));
    formData.append("file", JSON.stringify(this.files));
    this.bitacoraVisitaService.save(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.status === 200) { 
          this.userData.showToast('registro creado correctamente');          
          this.router.navigate(['/bitacora-visitas', { item: true}]); 
        } else {                    
          this.userData.showToast('error al crear registro');
        }
      },
      (err) => {
        console.log(err);        
        this.userData.showToast('error al crear registro');       
      },
      () => {}
    );
  }
  
  save() {

    if(this.edit) this.editar();
    else this.nuevo();

  }

}
