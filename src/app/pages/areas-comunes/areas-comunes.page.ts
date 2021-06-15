import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaComunService } from '../../services/area-comun.service';
import { AreaComun } from '../../models/area-comun.model';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";
import { IonInfiniteScroll } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-areas-comunes',
  templateUrl: './areas-comunes.page.html',
  styleUrls: ['./areas-comunes.page.scss'],
})
export class AreasComunesPage implements OnInit {

  textoBuscar = '';


  public areasList: AreaComun[] = [];
  

  idEmpresa: number;
  filters: any;
  areaComunPage: number = 0;

  nombreEtiqueta = "_areas-comunes";
  totalPages:number = 0; 

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public fieldFilters:string[]=new Array();

  constructor(public areaComunService: AreaComunService,
              public userData: UserData,
              public activatedRoute: ActivatedRoute,
              private ui:UiServiceService,
              private storage: Storage,) {

  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargaAreasComunesStorage();
    this.cargaFiltrosTabla();    
    /* this.cargarAnunciosLocalesStorage(this.idEmpresa); */

    this.areaComunService.areaComunListener.subscribe(noti => {
      if(this.areasList){
        var index = this.areasList.indexOf(noti);
        if (index > -1) {
          this.areasList.splice(index, 1);
          this.storage.set(this.idEmpresa + this.areaComunService.nombreEtiqueta, this.areasList);
        }
      }
    });

  }

  ionViewDidEnter(){
    console.log('uno ionViewDidEnter de ANUNCIOS  PAGE'); 
    let value:boolean = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    if(value != null){
      this.areaComunPage = 0;
      this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
      this.getAreasComunes(this.areaComunPage, 10, null, null);
    }
  }
  
  cargaFiltrosTabla(){

    this.fieldFilters.push("data_clasificacion");
    this.fieldFilters.push("data_comentarios");
    this.fieldFilters.push("data_descripcion");
    this.fieldFilters.push("data_nombre");

  }


  async cargaAreasComunesStorage() {
    console.log('cargaAreasComunesStorage: ', this.idEmpresa);    
    await this.cargarAnunciosTemporalesStorage(this.idEmpresa);
    console.log('this.areasList.length: '+this.areasList.length);
    
    if (this.areasList.length == 0) {
      this.getAreasComunes(this.areaComunPage, 10);
    }
  }

  getAreasComunes(page: number, size: number, eventInfinite?, eventRefresh?) {
    this.ui.presentLoading();
    this.areaComunService.getAreasComunes(this.idEmpresa, page, size, this.filters).subscribe((data) => {
        this.ui.dismissLoading();
          if (data.status === 200) {
            this.totalPages = data.result.totalPages;
            if (eventInfinite) {   
              this.areasList.push(...data.result.content);            
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }else{              
              this.areasList = data.result.content;
            }
           
            /* console.log("this.anunciosList", this.anunciosList); */
            this.storage.set(this.idEmpresa + this.nombreEtiqueta, this.areasList);
            this.completeEvent(eventInfinite, eventRefresh);
          } else {
            this.userData.showToast('error al recuperar registros');
            console.log(data.status);
            this.completeEvent(eventInfinite, eventRefresh);
          }
        },
        (err) => {
          this.ui.dismissLoading();
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

  async cargarAnunciosTemporalesStorage(idEmpresa: number) {
    await this.areaComunService.getAreasComunesFromStorage(idEmpresa);//esperamos a que termine de cargar
    console.log('terminando de cargar los del storage');
    this.areasList = this.areaComunService.areasComunes;
    console.log('areasList: ' + this.areasList);
  }

  async cargarAnunciosLocalesStorage(idEmpresa: number) {
/* 
    await this.areaComunService.getAreasComunesLocalFromStorage(idEmpresa);
    console.log('terminando de cargar locales');

    this.areasListLocal = this.areaComunService.areasComunesLocal;
    console.log('this.areasListLocal: ' + this.areasListLocal);
*/
  }

  loadData(event) {//Desde el infinite scroll
    this.areaComunPage++;
    this.getAreasComunes(this.areaComunPage, 10, event);
  }

  doRefresh(event) {
    this.areaComunPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getAreasComunes(this.areaComunPage, 10, null, event);
  }


  isEmpty(str) {
    return (!str || 0 === str.length);
  }

  buscar(event){
   if( ! this.isEmpty(event.detail.value)){
    console.log('campos buscar-->',JSON.stringify(this.fieldFilters));
    this.filters = "";
    this.fieldFilters.forEach(item => this.filters += ''+item+':*'+ event.detail.value + '*,');
    if(this.filters.endsWith(",")){
      this.filters = this.filters.substring(0, this.filters.length -1 );
    }    
   }else{
     this.filters = "";
   }
   this.areaComunPage = 0;
   this.infiniteScroll.disabled = false;
   this.getAreasComunes(this.areaComunPage, 10, null, null);
  
  }
}
