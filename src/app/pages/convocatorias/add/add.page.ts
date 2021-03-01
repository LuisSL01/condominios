import { Component, OnInit } from '@angular/core';

import { ConvocatoriaService } from '../../../services/convocatoria.service';
import { Router } from '@angular/router';
import { Publicacion } from '../../../models/publicacion.model';
import { Validators, FormBuilder } from '@angular/forms';
import { AgenteService } from '../../../services/agente.service';
import { UserData } from '../../../providers/user-data';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  convocatoria:Publicacion = new Publicacion();
  manzanas: any[] =  [];

  createConvocatoria = this.fb.group({

    data: this.fb.group({
      destinatario: ["", [Validators.required]],
      titulo: ["", [Validators.required]],
      descripcion: ["", [Validators.required]]
    }),  

    tipo: ["CONVOCATORIA"],
  });

  idEmpresa: number;
  idAgente: number;

  
  constructor(private convocatoriaService : ConvocatoriaService,
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
    console.log('save');
    
    console.log('save:' +this.createConvocatoria.value );
    const resolucionObj ={
      empresa:this.idEmpresa,
      agenteCreador:this.idAgente,
      data: this.createConvocatoria.value.data,
      tipo: this.createConvocatoria.value.tipo,
      files: {
        archivos: [],
      }      
    };

    const formData = new FormData(); //Esto no esta trabajanco chido...
    formData.append("data", JSON.stringify(resolucionObj));
    formData.append("file", JSON.stringify([]));
    console.log("anuncio enviado: ", formData);

    this.convocatoriaService.save(formData).subscribe((data) => {
        if (data.status === 200) {
          this.userData.showToast('convocatoria creada correctamente');          
          this.router.navigate(['/convocatorias']);
          
        } else this.userData.showToast('error al guardar');
      },
      (err) => {
        console.log(err);
        this.userData.showToast('error al guardar');       
      },() => {}
    );
/*     this.convocatoria.tipo = 'Convocatoria';
    this.dataLocalConvocatoriaService.guardar(this.convocatoria);
    this.router.navigate(['/asambleas/convocatorias']);    */ 
  }
  cancel(){
    this.router.navigate(['/convocatorias']);
  }

}
