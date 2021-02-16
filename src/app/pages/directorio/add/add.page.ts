import { Component, OnInit } from '@angular/core';
import { Directorio } from '../../../models/directorio.model';
import { DirectorioService} from '../../../services/directorio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CodigoPostalService } from '../../../services/codigo-postal.service';
import { doesNotReject } from 'assert';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  directorio: Directorio = new Directorio();

  
  dataMapdirectorio: any = {};

  directorioChangesForm: FormGroup;
  
  createDirectorio = this.fb.group({    
    data: this.fb.group({
      nombreCompleto: ['', [Validators.required]],
      descripcion: ['',null],
      celular: ['', null],
      email: ['', Validators.email]
    }),

    direccion: this.fb.group({
      calle: [null, null],
      numeroExterior: ['', null],      
      numeroInterior: ['', null],
      asentamiento: [null, Validators.required]
    })
  });

  asentamientoSelected: any;
  asentamientos: any[] = [];

  idEmpresa:number;
  idAgente:number;

  edit:boolean = false;

  constructor( private directorioService:DirectorioService, 
               private router: Router,
               private fb: FormBuilder, 
               private codigoPostalService: CodigoPostalService,
               private userData:UserData,
               public activatedRoute: ActivatedRoute,) {     
  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
    console.log('en el ngoninit');
    

    this.directorio = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));    
    if(this.directorio != null) this.prepareEdit();

  }

  prepareEdit(){
    console.log('prepareEdit');
    this.edit = true;
    this.createDirectorio = this.fb.group({
      data: this.fb.group({ 
        nombreCompleto: [this.directorio.data.nombreCompleto, [Validators.required]],
        descripcion: [this.directorio.data.descripcion,null],
        celular: [this.directorio.data.celular, null],
        email: [this.directorio.data.email, Validators.email]
      }),

      direccion: this.fb.group({
        calle: [this.directorio.direccion.calle, null],
        numeroExterior: [this.directorio.direccion.numeroExterior, null],      
        numeroInterior: [this.directorio.direccion.numeroInterior, null],
        asentamiento: [this.directorio.direccion.asentamiento.codigoPostal, Validators.required]
      })
    }); 
    this.asentamientoSelected = this.directorio.direccion.asentamiento;
    this.asentamientos.push(this.directorio.direccion.asentamiento);
  }


  validarCP() {
    console.log('cambio');
    this.codigoPostalService.filterCodigosPostales(this.createDirectorio.value.direccion.asentamiento).subscribe(data => {
      if (data.status === 200) {
        console.log('"data.result"', data.result);          
        console.log(data.message);               
        this.asentamientos = data.result;
      } else {
        console.log('Llego otro status');                        
        console.log(data.message);
      }
    },
    err => {
      console.log(err);    
    });
   }

   cambioAsentamiento(event) {
    console.log('cambio asentamiento');
    this.asentamientoSelected = event.detail.value;
    console.log('this.asentamientoSelected: ', this.asentamientoSelected);
  }

  save(){
    if(this.edit) this.editar();
    else this.nuevo();

  }

  nuevo(){

    console.log(this.createDirectorio.value);
    console.log(this.asentamientoSelected);

    this.createDirectorio.value.direccion.asentamiento = this.asentamientoSelected;

    const directorioObj = {
      empresa : this.idEmpresa,
      data: this.createDirectorio.value.data,
      direccion :this.createDirectorio.value.direccion
    };
    console.log('objeto enviado, '+ JSON.stringify(directorioObj));

    this.directorioService.save(directorioObj).subscribe((data) => {
      console.log(data);
      if (data.status === 200) { 
        this.userData.showToast('directorio registrado correctamente');
        this.router.navigate(['/directorio']);
      } else {this.userData.showToast('Error al registrar llego otro status');}
    },
    (err) => {console.log(err);this.userData.showToast("Error: "+ err);
    },() => {}
  );    
  }
  editar(){
    this.directorioChangesForm = this.fb.group({});
    console.log('en editar');
    
    this.getDirtyFields();
    console.log('directorioChangesForm', JSON.stringify(this.directorioChangesForm.value));
    

    this.directorioService.update(this.directorio.id, this.directorioChangesForm.value).subscribe(data => {
      if (data.status === 200) {
        this.createDirectorio.markAsPristine();
        this.userData.showToast('directorio editado correctamente');
        this.router.navigate(['/directorio']);
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
    
    Object.keys(this.createDirectorio['controls'].data['controls']).forEach(key => {
      if (this.createDirectorio.get('data').get(key).dirty) {
        this.directorioChangesForm.addControl(key, this.createDirectorio.get('data').get(key));
      }
    });
  }
}
