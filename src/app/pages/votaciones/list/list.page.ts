import { Component, OnInit } from '@angular/core';
import { DataLocalVotacionesService } from '../../../services/data-local-votaciones.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(public dataLocalVotacionesService: DataLocalVotacionesService) { }

  ngOnInit() {
  }

}
