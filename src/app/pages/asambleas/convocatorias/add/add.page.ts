import { Component, OnInit } from '@angular/core';

import { DataLocalConvocatoriaService } from '../../../../services/data-local-convocatoria.service';
import { Router } from '@angular/router';
import { Publicacion } from '../../../../models/publicacion.model';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {


  convocatoria:Publicacion = new Publicacion();
  
  constructor(private dataLocalConvocatoriaService : DataLocalConvocatoriaService,
              private router:Router) { }

  ngOnInit() {
  }
  save(){
    console.log('save');
    this.convocatoria.tipo = 'Convocatoria';
    this.dataLocalConvocatoriaService.guardar(this.convocatoria);
    this.router.navigate(['/asambleas/convocatorias']);    
  }
  cancel(){
    this.router.navigate(['/asambleas/convocatorias']);
  }

}
