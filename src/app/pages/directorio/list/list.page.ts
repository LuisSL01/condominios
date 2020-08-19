import { Component, OnInit, Input } from '@angular/core';
import { Directorio } from '../../../models/directorio.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() directorio:Directorio;

  

  constructor() { }

  ngOnInit() {
  }

}
