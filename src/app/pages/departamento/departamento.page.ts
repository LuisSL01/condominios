import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.page.html',
  styleUrls: ['./departamento.page.scss'],
})
export class DepartamentoPage implements OnInit {

  @Input() departamentos:any[];

  constructor(private modalCtrl: ModalController,
              public storage: Storage,
              private userData:UserData,
              private router: Router,) { }

  ngOnInit() {

  }

  cancelar(){
    console.log('cancelar');
    this.modalCtrl.dismiss();
  }

  departamentoSelected(departamento:any){
    this.storage.set('departamentoData', departamento);
    this.userData.setConfigUser();
    this.router.navigate(['/inicio']);
    this.modalCtrl.dismiss();

  }

}
