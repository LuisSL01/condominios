import { Component, OnInit, Input } from '@angular/core';
import { DataLocalVisitaService } from '../../../services/data-local-visita.service';
import { Visita } from '../../../models/visita.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() visita:Visita;

  constructor(public dataLocalVisitaService: DataLocalVisitaService) { }

  ngOnInit() {
  }

}
