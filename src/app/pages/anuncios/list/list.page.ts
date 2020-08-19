import { Component, OnInit, Input } from '@angular/core';
import { DataLocalAnuncioService } from '../../../services/data-local-anuncio.service';
import { Anuncio } from '../../../models/anuncio.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() anuncio :Anuncio;
  

  constructor(public dataLocalAnuncioService: DataLocalAnuncioService) { }

  ngOnInit() {
  }

}
