import { Component, OnInit } from '@angular/core';

import { DataLocalResolucionService } from '../../../../services/data-local-resolucion.service';
import { Router } from '@angular/router';
import { Publicacion } from '../../../../models/publicacion.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  resolucion:Publicacion = new Publicacion();

  constructor(private dataLocalResolucionService : DataLocalResolucionService,
              private router:Router) { }

  ngOnInit() {
  }
  save(){

    this.resolucion.tipo = 'Resolucion';
    this.dataLocalResolucionService.guardar(this.resolucion);
    this.router.navigate(['/asambleas/resoluciones']);    

  }



}
