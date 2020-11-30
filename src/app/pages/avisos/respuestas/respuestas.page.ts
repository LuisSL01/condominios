import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Publicacion } from '../../../models/publicacion.model';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.page.html',
  styleUrls: ['./respuestas.page.scss'],
})
export class RespuestasPage implements OnInit {

  @Input() titulo:string;
  @Input()  respuestas:Publicacion[];
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  
  cancelar(){
    console.log('cancelar');
    this.modalCtrl.dismiss();
  }

}
