import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AvisoService } from '../../../services/aviso.service';
import { Publicacion } from '../../../models/publicacion.model';
import { RespuestaPublicacion } from '../../../models/respuesta-publicacion.model';

@Component({
  selector: 'app-add-respuesta',
  templateUrl: './add-respuesta.page.html',
  styleUrls: ['./add-respuesta.page.scss'],
})
export class AddRespuestaPage implements OnInit {



  /* aviso: Publicacion = new Publicacion(); */
  aviso:RespuestaPublicacion = new RespuestaPublicacion();
  

  

  @Input() titulo:string;
  @Input() avisoPadre:Publicacion;

  constructor(private modalCtrl: ModalController,
    private dataLocalAvisoService:AvisoService) { }

  ngOnInit() {
  }

  cancelar(){
    console.log('cancelar');
    this.modalCtrl.dismiss();
  }
  save(){
    console.log('save in add respuestaPage');
    this.dataLocalAvisoService.saveRespuestaAviso(this.avisoPadre, this.aviso);
    console.log('navegando de regresoo');    
    this.modalCtrl.dismiss();    
  }

}
