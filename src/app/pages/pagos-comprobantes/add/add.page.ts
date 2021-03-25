import { Component, OnInit } from '@angular/core';

import { PagosComprobantesService } from '../../../services/pagos-comprobantes.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { PagosComprobantes } from '../../../models/pagos-comprobantes.model';
import { ArchivoVortexApp } from 'src/app/models/archivo-vortex.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserData } from '../../../providers/user-data';
import { AgenteService } from '../../../services/agente.service';
import { AdeudoService } from '../../../services/adeudo.service';
import { AdeudosPage } from '../../adeudos/adeudos.page';
import { AdeudoPago } from '../../../models/adeudo-pago.model';
import { Archivo } from '../../../models/archivo-vortex.model';

declare var window: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  pago: PagosComprobantes = new PagosComprobantes();
  enCamara:boolean;

  files: Archivo[] = new Array();

  createPagoComprobante = this.fb.group({    
    adeudoId:["",[Validators.required]],    
    data: this.fb.group({
      formaPago:["",[Validators.required]],
      descripcionFormaPago:["",],
    })
  });

  idEmpresa: number;
  idAgente: number;
  pathBase64: string = "data:image/jpeg;base64,";

  agentes: any[] =  [];
  adeudos: AdeudoPago[] =[];
  agenteSelectedId:number;
  edit:boolean = false;
  pagoComprobanteChangesForm: FormGroup;

  constructor(private pagosComprobantesService: PagosComprobantesService,
    private camera: Camera,
    private router: Router,
    private fb: FormBuilder,
    private userData: UserData,
    private agenteService: AgenteService,
    public activatedRoute: ActivatedRoute,
    private adeudoService: AdeudoService) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
    
    this.pago = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));    
    if(this.pago != null) this.prepareEdit();
    else this.pago = new PagosComprobantes();
    
    
  }

  ionViewDidEnter(){
    console.log('this.userData.administrador', this.userData.administrador);    
    if(this.userData.administrador){
      this.buscarAgentes();
    }else{
      this.agenteSelectedId = this.idAgente;
      this.buscarAdeudosAgente();
    }
  }
 

  prepareEdit(){
    this.edit = true;
    this.createPagoComprobante = this.fb.group({
      data: this.fb.group({
        formaPago:[this.pago.data.formaPago],
        descripcionFormaPago:[this.pago.data.descripcionFormaPago]
      })
    });
  }

  buscarAgentes(){
    this.agenteService.getAllAgentesByEmpresa(this.userData.getIdEmpresa()).subscribe((data) => {
        if (data.status === 200) {
          console.log('Agentes recuperadas correctamente');
          this.agentes = data.result;
        } else {
          console.log('Llego otro status al recuperar agentes');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cambioAgenteAdeudo(event) {
    console.log('cambioAgenteAdeudo');
    console.log('event', event);
    this.agenteSelectedId = event.detail.value;
    this.buscarAdeudosAgente();
  }

  buscarAdeudosAgente(){
    console.log('buscarAdeudosAgente');    
    this.adeudoService.getAdeudosByEmpresaAndAgente(this.userData.getIdEmpresa(), this.agenteSelectedId).subscribe((data) => {
      if (data.status === 200) {
        console.log('Adeudos recuperados correctamente'); 
        this.adeudos = data.result;
      } else {
        console.log('Llego otro status al recuperar agentes');
      }
    },
    (err) => {
      console.log(err);
    }
  );
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
      const title = this.createPagoComprobante.value.adeudoId+ "_pago_comprobante.jpg";
      this.files.push(new Archivo(imageData, title));
      /* const img = window.Ionic.WebView.convertFileSrc(imageData); */
      /* this.pago.imgs.push(img); */
    }, (err) => {
      // Handle error
    });
  }

  save(){
    if(this.edit) this.editar();
    else this.nuevo();       
  }

  nuevo(){
    console.log(this.createPagoComprobante.value);
    const pagoComprobanteObj={
      empresa : this.idEmpresa,
      agenteCreador: this.idAgente,            
      status : 1,//por autorizar
      data: this.createPagoComprobante.value.data,
      /* formaPago : this.createPagoComprobante.value.formaPago, */
      adeudo: this.createPagoComprobante.value.adeudoId,
      files:{archivos:[]}
    };


    const formData = new FormData();
    formData.append("data", JSON.stringify(pagoComprobanteObj));
    formData.append("file", JSON.stringify(this.files));
    
    console.log('objeto enviado: '+  JSON.stringify(pagoComprobanteObj));

    this.pagosComprobantesService.save(formData).subscribe((data) => {
        console.log(data);
        if (data.status === 200) {
          this.userData.showToast('comprobante de pago registrado correctamente');          
          this.router.navigate(['/pagos-comprobantes', { item: true}]);
        } else {
          this.userData.showToast('Error al registrar el comprobante, llego otro status');          
        }
      },
      (err) => {
        console.log(err);this.userData.showToast("Error: "+ err);       
      },
      () => {}
    );
  }
  editar(){
    console.log('editar()...');    
    this.pagoComprobanteChangesForm = this.fb.group({});
    this.getDirtyFields();
    console.log('pagoComprobanteChangesForm', JSON.stringify(this.pagoComprobanteChangesForm.value));
    this.pagosComprobantesService.update(this.pago.id, this.pagoComprobanteChangesForm.value).subscribe(data => {
      if (data.status === 200) {
        this.createPagoComprobante.reset();
        this.userData.showToast('editado correctamente');
        this.router.navigate(['/pagos-comprobantes', { item: true}]);
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
    Object.keys(this.createPagoComprobante['controls'].data['controls']).forEach(key => {
      if (this.createPagoComprobante.get('data').get(key).dirty) {
        this.pagoComprobanteChangesForm.addControl(key, this.createPagoComprobante.get('data').get(key));
      }
    });
  }

}
