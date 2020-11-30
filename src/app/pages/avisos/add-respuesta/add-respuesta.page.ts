import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataLocalAvisoService } from '../../../services/data-local-aviso.service';
import { Publicacion } from '../../../models/publicacion.model';

@Component({
  selector: 'app-add-respuesta',
  templateUrl: './add-respuesta.page.html',
  styleUrls: ['./add-respuesta.page.scss'],
})
export class AddRespuestaPage implements OnInit {



  aviso: Publicacion = new Publicacion();
  

  @Input() titulo:string;
  @Input() avisoPadre:Publicacion;

  constructor(private modalCtrl: ModalController,
    private dataLocalAvisoService:DataLocalAvisoService) { }

  ngOnInit() {
  }

  cancelar(){
    console.log('cancelar');
    this.modalCtrl.dismiss();

    

  }
  save(){
    console.log('save in add respuestaPage');
    this.dataLocalAvisoService.guardarRespuestaAviso(this.avisoPadre, this.aviso);
    console.log('navegando de regresoo');
    
    this.modalCtrl.dismiss();
    
  }

}
