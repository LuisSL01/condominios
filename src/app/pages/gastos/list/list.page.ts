import { Component, OnInit, Input } from '@angular/core';
import { DataLocalGastoService } from '../../../services/data-local-gasto.service';
import { Gasto } from '../../../models/gasto.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() gasto:Gasto;

  constructor(public dataLocalGastoService:DataLocalGastoService) { }

  ngOnInit() {
  }

}
  