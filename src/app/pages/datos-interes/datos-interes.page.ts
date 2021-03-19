import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-datos-interes',
  templateUrl: './datos-interes.page.html',
  styleUrls: ['./datos-interes.page.scss'],
})
export class DatosInteresPage implements OnInit {

  @Input() climaData:any;
  @Input() direccionData:any;
  @Input() nombreEmpresa:string;
  

  myDate:Date = new Date();

  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {
  }

  aceptar(){
    console.log('cancelar');
    this.modalCtrl.dismiss();
  }  

}
