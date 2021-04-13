import { Component, OnInit, ViewChild } from '@angular/core';

import { ConvocatoriaService } from '../../services/convocatoria.service';
import { Publicacion } from '../../models/publicacion.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-convocatorias',
  templateUrl: './convocatorias.page.html',
  styleUrls: ['./convocatorias.page.scss'],
})
export class ConvocatoriasPage implements OnInit {
  textoBuscar ='';
  public convocatoriasList:Publicacion[]=[]; 
  
  idEmpresa: number;
  filters: any;
  convocatoriaPage: number = 0;
  
  @ViewChild(IonInfiniteScroll) infiniteScroll : IonInfiniteScroll;
  public camposFiltros:string[]=new Array();
  constructor(public convocatoriaService : ConvocatoriaService,
              private userData: UserData, 
              public activatedRoute: ActivatedRoute,
              private storage: Storage,) { 
  
  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargarConvocatorias();
    this.cargaFiltrosTabla();

    this.convocatoriaService.convocatoriaListener.subscribe(elm => {
      if(this.convocatoriasList){
        var index = this.convocatoriasList.indexOf(elm);
        if (index > -1) {
          this.convocatoriasList.splice(index, 1);
          this.storage.set(this.idEmpresa + this.convocatoriaService.nombreEtiqueta, this.convocatoriasList);
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
      this.convocatoriaPage = 0;
      this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
      this.getDataService(this.convocatoriaPage,10,null,null);
    }
  }
  
  async cargarConvocatorias() {
    await this.cargarTemporalesStorage(this.idEmpresa);
    if (this.convocatoriasList.length == 0) {
      this.getDataService(this.convocatoriaPage, 10);
    }
  }

  getDataService(page: number, size: number, eventInfinite?, eventRefresh?) {
    this.convocatoriaService.getConvocatorias(this.idEmpresa, page, size, this.filters).subscribe((data) => {
          if (data.status === 200) {
            if (eventInfinite) {
              this.convocatoriasList.push(...data.result.content);
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }else{                      
              this.convocatoriasList = data.result.content;
            }
            this.storage.set(this.idEmpresa + this.convocatoriaService.nombreEtiqueta, this.convocatoriasList);            
            this.completeEvent(eventInfinite, eventRefresh);
          } else {
            this.userData.showToast('error 1 al recuperar registros');
            console.log(data);
            this.completeEvent(eventInfinite, eventRefresh);
          }
        },
        (err) => {
          this.userData.showToast('error 2 al recuperar registros');
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

  async cargarTemporalesStorage(idEmpresa: number) {
    await this.convocatoriaService.getConvocatoriasFromStorage(this.idEmpresa);
    console.log('terminando de cargar los del storage');
    this.convocatoriasList = this.convocatoriaService.convocatorias;    
  }


  loadData(event) {//Desde el infinite scroll
    this.convocatoriaPage++;
    this.getDataService(this.convocatoriaPage, 10, event);
  }

  doRefresh(event) {
    this.convocatoriaPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getDataService(this.convocatoriaPage, 10, null, event);
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
    this.convocatoriaPage = 0;
    this.infiniteScroll.disabled = false;
    this.getDataService(this.convocatoriaPage, 10, null, null);
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }
}
