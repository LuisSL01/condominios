import { Component, OnInit } from '@angular/core';
import { DataLocalGastoService } from '../../../services/data-local-gasto.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(public dataLocalGastoService:DataLocalGastoService) { }

  ngOnInit() {
  }

}
  