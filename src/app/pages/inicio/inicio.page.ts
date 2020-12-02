import { Component, OnInit } from '@angular/core';
import { Componente } from 'src/app/interfaces/interface';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { PublicacionService } from '../../services/publicacion.service';
import { Publicacion } from '../../models/publicacion.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Observable<Componente[]>;

  
  public publicaciones: Publicacion[];

  constructor(private dataService: DataService,
              private menuCtrl: MenuController,
              public publicacionService : PublicacionService) {
                this.componentes = this.dataService.getMenuOpts();
                this.publicaciones = this.publicacionService.publicaciones;
                  console.log('this.publicaciones:'+ this.publicaciones);

      
     }

  ngOnInit() {
  
      
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.publicacionService.cargarPublicaciones();    
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);


    console.log('this.publicaciones:'+ this.publicaciones);
  }


  buscar(){

  }

  toogleMenu(){
    this.menuCtrl.toggle();
  }

}

