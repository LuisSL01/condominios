import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Componente } from 'src/app/interfaces/interface';
import { Observable } from 'rxjs';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  componentes: Observable<Componente[]>;
  pathImage:string;
  idEmpresa:number;
  constructor(private dataService:DataService, public userData: UserData) { }

  ngOnInit() {
    this.componentes = this.dataService.getMenuOpts();
  }

}
