import { Component, OnInit } from '@angular/core';
import { DataLocalService } from 'src/app/services/data-local.service';
import { DataLocalDirectorioService } from '../../../services/data-local-directorio.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  constructor(public dataLocalDirectorioService:DataLocalDirectorioService) { }

  ngOnInit() {
  }

}
