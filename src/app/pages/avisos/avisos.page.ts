import { Component, OnInit, ViewChild } from '@angular/core';
import { AvisoService } from 'src/app/services/aviso.service';

import { IonInfiniteScroll } from '@ionic/angular';
import { Publicacion } from '../../models/publicacion.model';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.page.html',
  styleUrls: ['./avisos.page.scss'],
})
export class AvisosPage implements OnInit {

  textoBuscar = '';
  public notificacionesList: Publicacion[] =[];
  public notificacionesListLocal: Publicacion[] =[];

  
  idEmpresa: number;
  filters: any;
  notificacionesPage: number = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll : IonInfiniteScroll;
  //Con esto recuperamos el componente de la vista y al estar tipado obtenemos la ayuda de typescript
  public camposFiltros:string[]=new Array();                                 

  constructor(public notificacionService: AvisoService,
              private userData: UserData, 
              public activatedRoute: ActivatedRoute,
              private storage: Storage) {    
  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    /* this.cargarNotificacionesLocalesStorage(); */
    this.cargaNotificacionesStorage();
    this.cargaFiltrosTabla();

    this.notificacionService.avisoListener.subscribe(noti => {
      if(this.notificacionesList){
        var index = this.notificacionesList.indexOf(noti);
        if (index > -1) {
          this.notificacionesList.splice(index, 1);
          this.storage.set(this.idEmpresa + "_notificaciones", this.notificacionesList);
        }
      }
    });

  }
  cargaFiltrosTabla(){
    this.camposFiltros.push("data_titulo");
    this.camposFiltros.push("data_descripcion");    
  }

  ionViewDidEnter(){
    let value:boolean = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    if(value != null){
      this.notificacionesPage = 0;
      this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
      this.getNotificaciones(this.notificacionesPage,10,null,null);
    }
  }


  
  async cargaNotificacionesStorage(){
    await this.cargarNotificacionesTemporalesStorage(this.idEmpresa);
    if(this.notificacionesList.length == 0){
      await this.getNotificaciones(this.notificacionesPage, 10);
    }
}

getNotificaciones(page: number, size: number, eventInfinite?, eventRefresh?) {
  /* this.anuncioService.getDataAnuncios(this.idEmpresa, this.anunciosPage, size, this.filters);     */
  this.notificacionService
    .getNotificaciones(this.idEmpresa, page, size, this.filters)
    .subscribe(
      (data) => {
        if (data.status === 200) {
          if (eventInfinite) {
            this.notificacionesList.push(...data.result.content);
            if (data.result.content.length === 0) {
              eventInfinite.target.disabled = true;
              eventInfinite.target.complete();
              return;
            }
          }else{                      
            this.notificacionesList = data.result.content;
          }         
          this.storage.set(this.idEmpresa + "_notificaciones", this.notificacionesList);
          this.completeEvent(eventInfinite, eventRefresh);
        } else {
          console.log(data.status);            
          this.completeEvent(eventInfinite, eventRefresh);
        }
      },
      (err) => {
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

async cargarNotificacionesTemporalesStorage(idEmpresa: number) {
  const data = await this.storage.get(idEmpresa + "_notificaciones");
  if (data) {
    this.notificacionesList = data;
  } else {
    this.notificacionesList = [];
  }
}

async cargarNotificacionesLocalesStorage() {
  const noti = await this.storage.get(this.userData.getIdEmpresa() + "_notificaciones_local");
  if (noti) {
    this.notificacionesListLocal = noti;
  } else {
    this.notificacionesListLocal = [];
  }
}

loadData(event) {//Desde el infinite scroll
  /* console.log("load data"); */
  this.notificacionesPage ++;
  this.getNotificaciones(this.notificacionesPage, 10, event);
}

doRefresh(event) {    
  this.notificacionesPage = 0;
  this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
  this.getNotificaciones(this.notificacionesPage, 10, null, event);
}

buscar(event){
  if (!this.isEmpty(event.detail.value)) {
    console.log('campos buscar-->', JSON.stringify(this.camposFiltros));
    this.filters = "";
    this.camposFiltros.forEach(item => this.filters += '' + item + ':*' + event.detail.value + '*,');
    if (this.filters.endsWith(",")) {
      this.filters = this.filters.substring(0, this.filters.length - 1);
    }
  } else {
    this.filters = "";
  }
  this.notificacionesPage = 0;
  this.infiniteScroll.disabled = false;
  this.getNotificaciones(this.notificacionesPage, 10, null, null);
}

isEmpty(str) {
  return (!str || 0 === str.length);
}
}
