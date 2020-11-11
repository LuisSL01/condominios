import { Component, OnInit } from '@angular/core';
import { ContactosEmergencia } from '../../../models/contactos-emergencia.model';
import { DataLocalContactosEmergenciaService } from '../../../services/data-local-contactos-emergencia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  contactoEmergencia:ContactosEmergencia = new ContactosEmergencia();
  constructor(private dataLocalContactosEmergenciaService: DataLocalContactosEmergenciaService,
    private router:Router) { }

  ngOnInit() {
  }

  save(){

    console.log('I am in save new contacto emergencia..');
    console.log(this.contactoEmergencia);
    this.dataLocalContactosEmergenciaService.guardarContactoEmergencia(this.contactoEmergencia);
    this.router.navigate(['/contactos-emergencia']);
  }

}
