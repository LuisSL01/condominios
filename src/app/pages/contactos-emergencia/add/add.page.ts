import { Component, OnInit } from '@angular/core';
import { ContactosEmergencia } from '../../../models/contactos-emergencia.model';
import { ContactosEmergenciaService } from '../../../services/contactos-emergencia.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  contactoEmergencia:ContactosEmergencia = new ContactosEmergencia();


  createContacto = this.fb.group({
    data: this.fb.group({      
      titulo: ["", [Validators.required]],
      nombreCompleto: ["", null],
      celular: ["", [Validators.required]],
      telefono1: ["",],
      telefono2: ["",]
    })
  });

  idEmpresa:number;
  idAgente:number;
  edit:boolean = false;
  contactoChangesForm: FormGroup;

  

  constructor(private contactoEmergenciaService: ContactosEmergenciaService,
              private router:Router,
              private fb: FormBuilder,
              public activatedRoute: ActivatedRoute,
              private userData:UserData,) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();

    this.contactoEmergencia = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));    
    if(this.contactoEmergencia != null) this.prepareEdit();
    else this.contactoEmergencia = new ContactosEmergencia();
  }

  prepareEdit(){
    console.log('prepareEdit');
    this.edit = true;

    this.createContacto = this.fb.group({
      data: this.fb.group({
        titulo: [this.contactoEmergencia.data.titulo],
        nombreCompleto: [this.contactoEmergencia.data.nombreCompleto],
        celular: [this.contactoEmergencia.data.celular],
        telefono1: [this.contactoEmergencia.data.telefono1],
        telefono2: [this.contactoEmergencia.data.telefono2]
      })
    });
  }

  save(){
    if(this.edit) this.editar();
    else this.nuevo();    
  }
  nuevo(){
    console.log(this.createContacto.value);    
    const contactoObj = {
      empresa : this.idEmpresa,      
      data: this.createContacto.value.data
    };
    console.log('Objeto enviado..'+ JSON.stringify(contactoObj));

    this.contactoEmergenciaService.save(contactoObj).subscribe((data) => {
        console.log(data);
        if (data.status === 200) {           
          this.router.navigate(['/contactos-emergencia', { item: true}]);
        } else {this.userData.showToast('Error al registrar llego otro status');}
      },
      (err) => {console.log(err);this.userData.showToast("Error: "+ err);
      },() => {}
    );    
  }

  editar(){
    console.log('editar()...');    
    this.contactoChangesForm = this.fb.group({});        
    this.getDirtyFields();
    console.log('visitaChangesForm', JSON.stringify(this.contactoChangesForm.value));

    this.contactoEmergenciaService.update(this.contactoEmergencia.id, this.contactoChangesForm.value).subscribe(data => {
      if (data.status === 200) {
        this.createContacto.markAsPristine();
        this.createContacto.reset();
        this.router.navigate(['/contactos-emergencia', { item: true}]);
      } else {
        this.userData.showToast('Error al editar registro, llego otro status');
      }
    }, err => {
      console.log(err);this.userData.showToast("Error: "+ err);
    },() => {
    });
  }

  getDirtyFields() {
    Object.keys(this.createContacto['controls'].data['controls']).forEach(key => {
      if (this.createContacto.get('data').get(key).dirty) {
        this.contactoChangesForm.addControl(key, this.createContacto.get('data').get(key));
      }
    });
  }
}
