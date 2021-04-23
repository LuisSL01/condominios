import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.page.html',
  styleUrls: ['./departamento.page.scss'],
})
export class DepartamentoPage implements OnInit {

  @Input() departamentos:any[];

  constructor(private modalCtrl: ModalController,
              public storage: Storage,
              private router: Router,) { }

  ngOnInit() {

  }

  cancelar(){
    console.log('cancelar');
    this.modalCtrl.dismiss();
  }

  departamentoSelected(departamento:any){

    console.log('se ha seleccionado el departamento: '+ JSON.stringify(departamento));
    this.storage.set('departamentoData', JSON.stringify(departamento));
    this.router.navigate(['/inicio']);
    this.modalCtrl.dismiss();

  }

}
