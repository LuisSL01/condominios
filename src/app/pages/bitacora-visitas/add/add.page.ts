import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera , CameraOptions } from '@ionic-native/camera/ngx';
import { BitacoraVisita } from '../../../models/bitacora-visitas.model';
import { BitacoraVisitaService } from '../../../services/bitacora-visita.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserData } from '../../../providers/user-data';
import { ArchivoVortexApp } from '../../../models/archivo-vortex.model';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


declare var window: any;


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  registroVisita:BitacoraVisita = new BitacoraVisita();
  enCamara:boolean;

  data: ArchivoVortexApp[] = new Array();

  createBitacoraVisita = this.fb.group({
    nombreCompleto: ["", [Validators.required]],
    conAuto: [false,],
    placa:["",],
    personasIngresan: [1,],
    observaciones: ["", []],
    visitaProgramada: [true]    
  });

  idEmpresa: number;
  idAgente: number;
  pathBase64: string = "data:image/jpeg;base64,";

  constructor(private bitacoraVisitaService : BitacoraVisitaService,
              private camera:Camera,
              private router:Router,
              private fb: FormBuilder,
              private userData: UserData,
              private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    console.log('en el ngoninit');
    
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter');    
    
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter');
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
      this.data.push(new ArchivoVortexApp(imageData, title));
    }, (err) => {
      // Handle error
    });
  }

  scanQR(){
    console.log('scanQR()');

    console.log('deberia estar llamando al method');
    
    




    this.barcodeScanner.scan().then(barcodeData => {

      
      console.log('Barcode data', barcodeData);
    }).catch(err => {


      console.log('Error', err);
    });
  }
  
  save() {
    console.log('value: ');
    console.log( this.createBitacoraVisita.value);
    

    const bitacoraVisitaObj={
      empresa : this.idEmpresa,
      agenteCreador: this.idAgente,
      visita : 2,
      nombreCompleto : this.createBitacoraVisita.value.nombreCompleto,
      conAuto : this.createBitacoraVisita.value.conAuto,
      placa : this.createBitacoraVisita.value.placa,
      personasIngresan : this.createBitacoraVisita.value.personasIngresan,
      observaciones: this.createBitacoraVisita.value.observaciones,
      visitaProgramada : this.createBitacoraVisita.value.visitaProgramada,
      data:{archivos:[]}
    };


    const formData = new FormData();
    formData.append("data", JSON.stringify(bitacoraVisitaObj));
    formData.append("file", JSON.stringify(this.data));

    this.bitacoraVisitaService.save(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.status === 200) { 
          this.userData.showToast('registro creado correctamente');
          this.router.navigate(['/mis-visitas/bitacora-visitas']); 
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


   /*  console.log(this.registroVisita);
    this.dataLocalBitacoraVisitaService.guardar(this.registroVisita);
    this.router.navigate(['/mis-visitas/bitacora-visitas']); */
  }

}
