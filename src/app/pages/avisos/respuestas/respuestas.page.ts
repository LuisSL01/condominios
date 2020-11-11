import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Aviso } from 'src/app/models/aviso.model';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.page.html',
  styleUrls: ['./respuestas.page.scss'],
})
export class RespuestasPage implements OnInit {

  @Input() titulo:string;
  @Input()  respuestas:Aviso[];
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  
  cancelar(){
    console.log('cancelar');
    this.modalCtrl.dismiss();
  }

}
