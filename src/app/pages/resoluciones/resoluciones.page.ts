import { Component, OnInit, ViewChild } from '@angular/core';

import { ResolucionService } from '../../services/resolucion.service';
import { Publicacion } from '../../models/publicacion.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resoluciones',
  templateUrl: './resoluciones.page.html',
  styleUrls: ['./resoluciones.page.scss'],
})
export class ResolucionesPage implements OnInit {
  textoBuscar ='';


  public resolucionesList:Publicacion[] = []; 
  
  idEmpresa: number;
  filters: any;
  resolucionPage: number = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll : IonInfiniteScroll;
  public camposFiltros:string[]=new Array();
  constructor(public resolucionService: ResolucionService,
              private userData: UserData, 
              public activatedRoute: ActivatedRoute,
              private storage: Storage,
              ) {
    console.log('en el constructor re resoluciones page');    
   }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargarResoluciones();    
    this.cargaFiltrosTabla();
  }
  ionViewDidEnter(){    
    let value:boolean = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    if(value != null){
      this.resolucionPage = 0;
      this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
      this.getResoluciones(this.resolucionPage,10,null,null);
    }
  }

  cargaFiltrosTabla(){
    this.camposFiltros.push("data_titulo");
    this.camposFiltros.push("data_descripcion");    
  }

  async cargarResoluciones() {
    await this.cargarResolucionesTemporalesStorage(this.idEmpresa);
    if (this.resolucionesList.length == 0) {
      this.getResoluciones(this.resolucionPage, 10);
    }
  }

  getResoluciones(page: number, size: number, eventInfinite?, eventRefresh?) {
    this.resolucionService.getResoluciones(this.idEmpresa, page, size, this.filters).subscribe((data) => {
          if (data.status === 200) {
            if (eventInfinite) {
              this.resolucionesList.push(...data.result.content);
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }else{                      
              this.resolucionesList = data.result.content;
            }
            this.storage.set(this.idEmpresa + this.resolucionService.nombreEtiqueta, this.resolucionesList);            
            this.completeEvent(eventInfinite, eventRefresh);
          } else {
            this.userData.showToast('error al recuperar registros');
            console.log(data);
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


  completeEvent(eventInfinite?, eventRefresh?) {
    if (eventInfinite) {
      eventInfinite.target.complete();
    }
    if (eventRefresh) {
      eventRefresh.target.complete();
    }
  }

  async cargarResolucionesTemporalesStorage(idEmpresa: number) {
    await this.resolucionService.getResolucionesFromStorage(this.idEmpresa);
    console.log('terminando de cargar los del storage');
    this.resolucionesList = this.resolucionService.resoluciones;    
  }


  loadData(event) {//Desde el infinite scroll
    this.resolucionPage++;
    this.getResoluciones(this.resolucionPage, 10, event);
  }

  doRefresh(event) {
    this.resolucionPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getResoluciones(this.resolucionPage, 10, null, event);
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
    this.resolucionPage = 0;
    this.infiniteScroll.disabled = false;
    this.getResoluciones(this.resolucionPage, 10, null, null);
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }

}
