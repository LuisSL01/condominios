import { Component, OnInit } from '@angular/core';
import { DataLocalVisitaService } from '../../../services/data-local-visita.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(public dataLocalVisitaService: DataLocalVisitaService) { }

  ngOnInit() {
  }

}
