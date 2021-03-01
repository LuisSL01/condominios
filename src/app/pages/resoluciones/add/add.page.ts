import { Component, OnInit } from '@angular/core';

import { ResolucionService } from '../../../services/resolucion.service';
import { Router } from '@angular/router';
import { Publicacion } from '../../../models/publicacion.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AgenteService } from '../../../services/agente.service';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  resolucion:Publicacion = new Publicacion();
  manzanas: any[] =  [];

  createResolucion = this.fb.group({
    data: this.fb.group({
      destinatario: ["", [Validators.required]],
      titulo: ["", [Validators.required]],
      descripcion: ["", [Validators.required]]
    }),  
    tipo: ["RESOLUCION"],
  });

  idEmpresa: number;
  idAgente: number;

  constructor(private resolucionService : ResolucionService,
              private agenteService: AgenteService,
              private router:Router,
              private fb: FormBuilder,
              private userData: UserData) { }

  ngOnInit() {    
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
    this.buscarManzanas();
  }

  
  buscarManzanas(){  
  this.agenteService.getManzanas(this.idEmpresa).subscribe((data) => {
      if (data.status === 200) {
        this.userData.showToast('Manzanas recuperadas correctamente');       
        this.manzanas = data.result;
      } else this.userData.showToast('Error al recuperar manzanas');              
    },
    (err) => {
      console.log(err);
    }
  );
  }


  save(){
    console.log('save:' +this.createResolucion.value );
    const resolucionObj ={
      empresa:this.idEmpresa,
      agenteCreador:this.idAgente,
      data:this.createResolucion.value.data,
      /* titulo: this.createResolucion.value.titulo,
      descripcion: this.createResolucion.value.descripcion,      
      destinatario: this.createResolucion.value.destinatario, */

      tipo: this.createResolucion.value.tipo,
      files: {
        archivos: [],
      }      
    };

    const formData = new FormData(); //Esto no esta trabajanco chido...
    formData.append("data", JSON.stringify(resolucionObj));
    formData.append("file", JSON.stringify([]));
    console.log("anuncio enviado: ", formData);

    this.resolucionService.save(formData).subscribe((data) => {
        if (data.status === 200) {
          this.userData.showToast('resolucion correctamente creada');          
          this.router.navigate(['/resoluciones']);
        } else this.userData.showToast('error al guardar');
      },
      (err) => {
        console.log(err);
        this.userData.showToast('error al guardar');       
      },() => {}
    );
  }
}
