import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Publicacion } from '../../../models/publicacion.model';
import { RespuestaApp } from '../../../models/respuestaApp.model';
import { RespuestaPublicacion } from '../../../models/respuesta-publicacion.model';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.page.html',
  styleUrls: ['./respuestas.page.scss'],
})
export class RespuestasPage implements OnInit {

  
  @Input() titulo:string;

  @Input()  respuestas:RespuestaPublicacion[];



  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  
  cancelar(){
    console.log('cancelar');
    this.modalCtrl.dismiss();
  }

}
