import { Component, OnInit, Input } from '@angular/core';
import { DataLocalAreaComunService } from '../../../services/data-local-area-comun.service';
import { AreaComun } from '../../../models/area-comun.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() areaComun:AreaComun;
  
  constructor(public dataLocalAreaComunService: DataLocalAreaComunService) { }

  ngOnInit() {
  }

}
