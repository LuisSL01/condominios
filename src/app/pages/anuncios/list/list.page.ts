import { Component, OnInit } from '@angular/core';
import { DataLocalAnuncioService } from '../../../services/data-local-anuncio.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(public dataLocalAnuncioService: DataLocalAnuncioService) { }

  ngOnInit() {
  }

}
