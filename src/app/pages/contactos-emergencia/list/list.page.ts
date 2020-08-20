import { Component, OnInit, Input } from '@angular/core';
import { DataLocalContactosEmergenciaService } from '../../../services/data-local-contactos-emergencia.service';
import { ContactosEmergencia } from '../../../models/contactos-emergencia.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() contacto:ContactosEmergencia;
  
  constructor(public dataLocalContactosEmergenciaService : DataLocalContactosEmergenciaService) { }

  ngOnInit() {
  }

}
