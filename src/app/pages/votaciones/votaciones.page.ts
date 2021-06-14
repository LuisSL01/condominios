import { Component, OnInit, ViewChild } from '@angular/core';
import { VotacionesService } from '../../services/votaciones.service';
import { Encuesta } from '../../models/votaciones.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.page.html',
  styleUrls: ['./votaciones.page.scss'],
})
export class VotacionesPage implements OnInit {
  textoBuscar ='';
  public votacionesList : Encuesta[]=[];
  idEmpresa: number;
  filters: any;
  votacionPage: number = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public camposFiltros:string[]=new Array();

  constructor(public votacionesService: VotacionesService,
              private userData:UserData,
              public activatedRoute: ActivatedRoute,
              private storage: Storage,) {
   }

  ngOnInit() {      
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargaData();
    this.cargaFiltrosTabla();

    this.votacionesService.votacionListener.subscribe(elm => {
      if(this.votacionesList){
        var index = this.votacionesList.indexOf(elm);
        if (index > -1) {
          this.votacionesList.splice(index, 1);
          this.storage.set(this.idEmpresa + this.votacionesService.nombreEtiqueta, this.votacionesList);
        }
      }
    });

    this.votacionesService.respuestaListener.subscribe(elm =>{
      this.votacionPage = 0;
      this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
      this.getVotaciones(this.votacionPage, 10, null, null);    
    }
    );
  }
  
  cargaFiltrosTabla(){
    this.camposFiltros.push("root_titulo");
    this.camposFiltros.push("root_mensaje");
  }

  ionViewDidEnter(){
    console.log('uno ionViewDidEnter de votaciones');
    let value:boolean = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    if(value != null){
      this.votacionPage = 0;
      this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
      this.getVotaciones(this.votacionPage, 10, null, null);
    }
  }

  async cargaData(){
    await this.cargarVotacionesTemporalesStorage(this.idEmpresa);
    if (this.votacionesList.length == 0) {
      this.getVotaciones(this.votacionPage, 10);
    }
  }
  
  
  async cargarVotacionesTemporalesStorage(idEmpresa: number) {
    await this.votacionesService.getVotacionesFromStorage(idEmpresa);    
    this.votacionesList = this.votacionesService.votaciones;    
  }

  getVotaciones(page: number, size: number, eventInfinite?, eventRefresh?) {
    this.votacionesService.getVotaciones(this.idEmpresa, page, size, this.filters)
      .subscribe((data) => {
          if (data.status === 200) {
            if (eventInfinite) {
              this.votacionesList.push(...data.result.content);
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }              
            }else{           
              this.votacionesList = data.result.content;
            }
            this.storage.set(this.idEmpresa + this.votacionesService.nombreEtiqueta, this.votacionesList);
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
    this.votacionPage ++;
    this.getVotaciones(this.votacionPage, 10, event);
  }

  doRefresh(event) {
    this.votacionPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getVotaciones(this.votacionPage, 10, null, event);
  }

  
  buscar( event ){
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
    this.votacionPage = 0;
    this.infiniteScroll.disabled = false;
    this.getVotaciones(this.votacionPage, 10, null, null);
    
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }

}
