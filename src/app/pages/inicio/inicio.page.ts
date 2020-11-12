import { Component, OnInit } from '@angular/core';
import { Componente } from 'src/app/interfaces/interface';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  componentes: Observable<Componente[]>;

  constructor(private dataService: DataService,
    private menuCtrl: MenuController) {

      
     }

  ngOnInit() {
    this.componentes = this.dataService.getMenuOpts();
  }

  toogleMenu(){
    this.menuCtrl.toggle();
  }

}

