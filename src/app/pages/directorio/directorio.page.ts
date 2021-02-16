import { Component, OnInit, ViewChild } from '@angular/core';
import { DirectorioService } from 'src/app/services/directorio.service';
import { Directorio } from '../../models/directorio.model';
import { UserData } from '../../providers/user-data';
import { Storage } from '@ionic/storage';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.page.html',
  styleUrls: ['./directorio.page.scss'],
})

export class DirectorioPage implements OnInit {

  textoBuscar ='';

  public directorios: Directorio[] = []; 
  idEmpresa: number;
  filters: any;
  contactoPage: number = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  constructor(public directorioService:DirectorioService,
              private userData: UserData,
              private storage:Storage ,
              public navCtrl: NavController,
              private router: Router,) { 
  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargaData();
  }

  async cargaData(){
    await this.cargarDataTemporalStorage(this.idEmpresa);
    if (this.directorios.length == 0) {
      this.getDirectorios(this.contactoPage, 10);
    }
  }
  
  async cargarDataTemporalStorage(idEmpresa: number) {
    await this.directorioService.getDirectoriosFromStorage(this.idEmpresa);
    this.directorios = this.directorioService.directorios;
  } 

  getDirectorios(page: number, size: number, eventInfinite?, eventRefresh?) {     
    this.directorioService.getDirectorios(this.idEmpresa, page, size, this.filters).subscribe((data) => {
        console.log(data);        
          if (data.status === 200) {
            if(eventRefresh) this.directorios = [];
            if (eventInfinite) {
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }
            this.directorios.push(...data.result.content)
            this.storage.set(this.idEmpresa + this.directorioService.nombreEtiqueta, this.directorios);
            this.userData.showToast('recuperados correctamente');
            this.completeEvent(eventInfinite, eventRefresh);            
          } else {
            this.userData.showToast('error al recuperar registros');
            console.log(data.status);
            this.completeEvent(eventInfinite, eventRefresh);            
          }
        },
        (err) => {
          this.userData.showToast('error al recuperar registros');
          console.log(err);
          this.completeEvent(eventInfinite, eventRefresh);
        }
      );
  }

  completeEvent(eventInfinite?, eventRefresh?){
    if (eventInfinite) {
      eventInfinite.target.complete();
    }
    if(eventRefresh){
      eventRefresh.target.complete();
    }
  }

  
  loadData(event) {//Desde el infinite scroll
    this.contactoPage ++;
    this.getDirectorios(this.contactoPage, 10, event);
  }

  doRefresh(event) {
    this.contactoPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getDirectorios(this.contactoPage, 10, null, event);
  }

  buscar( event ){   

  }

}
