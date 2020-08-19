import { Component, OnInit } from '@angular/core';
import { DataLocalContactosEmergenciaService } from '../../../services/data-local-contactos-emergencia.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(public dataLocalContactosEmergenciaService : DataLocalContactosEmergenciaService) { }

  ngOnInit() {
  }

}
