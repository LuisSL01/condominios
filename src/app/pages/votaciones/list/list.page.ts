import { Component, OnInit, Input } from '@angular/core';
import { DataLocalVotacionesService } from '../../../services/data-local-votaciones.service';
import { Votacion } from '../../../models/votaciones.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() votacion:Votacion;

  constructor(public dataLocalVotacionesService: DataLocalVotacionesService) { }

  ngOnInit() {
  }

}
