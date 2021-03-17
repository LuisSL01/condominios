import { Component, OnInit, ViewChild } from '@angular/core';
import { VisitaService } from '../../services/visita.service';
import { Visita } from '../../models/visita.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.page.html',
  styleUrls: ['./visitas.page.scss'],
})
export class VisitasPage implements OnInit {
  textoBuscar='';
  public visitasList:Visita[]=[];
  idEmpresa: number;
  filters: any;
  visitaPage: number = 0;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public camposFiltros:string[]=new Array();

  constructor(public visitaService: VisitaService,
              private userData:UserData,
              public activatedRoute: ActivatedRoute,
              private storage: Storage,) { 
    /* this.visitasList = this.dataLocalVisitaService.visitas; */
  }

  ngOnInit() {      
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargaData();
    this.cargaFiltrosTabla();    
  }

  cargaFiltrosTabla(){
    this.camposFiltros.push("data_tipoDeVisita");
    this.camposFiltros.push("data_nombreCompleto");
    this.camposFiltros.push("data_duracionDeVisita");    
  }

  ionViewWillEnter(){
    console.log('uno ionViewWillEnter de visitas  PAGE');
    
  }

  ionViewDidEnter(){
    console.log('uno ionViewDidEnter de visitas  PAGE');
    let value:boolean = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    if(value != null){
      this.visitaPage = 0;
      this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
      this.getVisitas(this.visitaPage, 10, null, null);
    }
  }

  async cargaData(){
    await this.cargarDataTemporalesStorage(this.idEmpresa);
    if (this.visitasList.length == 0) {
      this.getVisitas(this.visitaPage, 10);
    }
  }
  
  
  async cargarDataTemporalesStorage(idEmpresa: number) {
    await this.visitaService.getVisitasFromStorage(idEmpresa);    
    this.visitasList = this.visitaService.visitas;    
  }

  getVisitas(page: number, size: number, eventInfinite?, eventRefresh?) {
    this.visitaService.getVisitas(this.idEmpresa, page, size, this.filters)
      .subscribe((data) => {          
          if (data.status === 200) {            
            if (eventInfinite) {
              this.visitasList.push(...data.result.content);
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }              
            }else{
              console.log('else infinite');              
              this.visitasList = data.result.content;
            }           
            /* console.log("this.anunciosList", this.anunciosList); */
            this.storage.set(this.idEmpresa + this.visitaService.nombreEtiqueta, this.visitasList);            
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
    this.visitaPage ++;
    this.getVisitas(this.visitaPage, 10, event);
  }

  doRefresh(event) {
    this.visitaPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getVisitas(this.visitaPage, 10, null, event);
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
    this.visitaPage = 0;
    this.infiniteScroll.disabled = false;
    this.getVisitas(this.visitaPage, 10, null, null);
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }

}
