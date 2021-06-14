import { Component, OnInit } from '@angular/core';
import { UserData } from '../../providers/user-data';
import { LogService } from '../../services/log.service';


@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {

  idEmpresa: number;

  constructor(
    public userData: UserData,
    private logService: LogService,
  ) {}


  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
  }

  btnEscribir(){
    var a = 'fui fui fui'
    this.logService.escribeLog(a)
  }

  btnLog(){
    this.userData.showToast("Intentanto log al servidor");
    this.logService.compartirLog()
    
  }

  btnReinicio(){
    this.logService.reiniciarLog()
  }

}
