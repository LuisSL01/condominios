import { Component, OnInit } from '@angular/core';
import { DataLocalAreaComunService } from '../../../services/data-local-area-comun.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(public dataLocalAreaComunService: DataLocalAreaComunService) { }

  ngOnInit() {
  }

}
