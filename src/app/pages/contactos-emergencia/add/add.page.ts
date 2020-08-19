import { Component, OnInit } from '@angular/core';
import { ContactosEmergencia } from '../../../models/contactos-emergencia.model';
import { DataLocalContactosEmergenciaService } from '../../../services/data-local-contactos-emergencia.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  contactoEmergencia:ContactosEmergencia = new ContactosEmergencia();
  constructor(private dataLocalContactosEmergenciaService: DataLocalContactosEmergenciaService) { }

  ngOnInit() {
  }

  save(){

    console.log('I am in save new contacto emergencia..');
    console.log(this.contactoEmergencia);
    this.dataLocalContactosEmergenciaService.guardarContactoEmergencia(this.contactoEmergencia);
    
  }

}
