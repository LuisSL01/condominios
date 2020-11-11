import { Component, Input, OnInit } from '@angular/core';
import { Aviso } from 'src/app/models/aviso.model';
import { ModalController } from '@ionic/angular';
import { DataLocalAvisoService } from '../../../services/data-local-aviso.service';

@Component({
  selector: 'app-add-respuesta',
  templateUrl: './add-respuesta.page.html',
  styleUrls: ['./add-respuesta.page.scss'],
})
export class AddRespuestaPage implements OnInit {



  aviso: Aviso = new Aviso();
  

  @Input() titulo:string;
  @Input() avisoPadre:Aviso;

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
