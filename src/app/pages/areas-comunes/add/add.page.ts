import { Component, OnInit } from '@angular/core';
import { AreaComun } from '../../../models/area-comun.model';
import { DataLocalAreaComunService } from '../../../services/data-local-area-comun.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  areaComun:AreaComun = new AreaComun();

  constructor(private dataLocalAreaComunService: DataLocalAreaComunService) { }

  ngOnInit() {
  }


  save(){
    console.log('save the new area');
    console.log(this.areaComun);
    this.dataLocalAreaComunService.guardarAreaComun(this.areaComun);
  }
  
  cambioHoraInicia(event){
    this.areaComun.horaInicia = new Date(event.detail.value);
  }

  cambioHoraTermina(event){
    this.areaComun.horaTermina = new Date(event.detail.value);
  }
  
}
