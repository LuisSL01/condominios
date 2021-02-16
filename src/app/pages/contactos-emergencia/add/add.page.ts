import { Component, OnInit } from '@angular/core';
import { ContactosEmergencia } from '../../../models/contactos-emergencia.model';
import { ContactosEmergenciaService } from '../../../services/contactos-emergencia.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  contactoEmergencia:ContactosEmergencia = new ContactosEmergencia();


  createContacto = this.fb.group({
    titulo: ["", [Validators.required]],
    nombreCompleto: ["",[Validators.required]],
    celular: ["", [Validators.required]],
    telefono1: ["",],
    telefono2: ["",]    
  });

  idEmpresa:number;
  idAgente:number;

  dataMapContacto: any = {};

  constructor(private contactoEmergenciaService: ContactosEmergenciaService,
              private router:Router,
              private fb: FormBuilder,
              private userData:UserData,) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
  }

  save(){

    console.log(this.createContacto.value);
    this.dataMapContacto.celular = this.createContacto.value.celular;
    this.dataMapContacto.telefono1 = this.createContacto.value.telefono1;
    this.dataMapContacto.telefono2 = this.createContacto.value.telefono2;

    const contactoObj = {
      empresa : this.idEmpresa,
      titulo : this.createContacto.value.titulo,
      nombreCompleto : this.createContacto.value.nombreCompleto,
      data: this.dataMapContacto
    };
    console.log('Objeto enviado..'+ JSON.stringify(contactoObj));

    this.contactoEmergenciaService.save(contactoObj).subscribe((data) => {
        console.log(data);
        if (data.status === 200) { 
          this.userData.showToast('contacto registrado correctamente');
          this.router.navigate(['/contactos-emergencia']);
        } else {this.userData.showToast('Error al registrar llego otro status');}
      },
      (err) => {console.log(err);this.userData.showToast("Error: "+ err);
      },() => {}
    );    
  }

}
