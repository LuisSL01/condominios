import { Component, OnInit, ViewChild } from '@angular/core';
import { VotacionesService } from '../../services/votaciones.service';
import { Encuesta } from '../../models/votaciones.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";


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
  reservaPage: number = 0;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public votacionesService: VotacionesService,
              private userData:UserData,
              private storage: Storage,) {
   }

  ngOnInit() {      
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargaData();
  }

  async cargaData(){
    await this.cargarVotacionesTemporalesStorage(this.idEmpresa);
    if (this.votacionesList.length == 0) {
      this.getVotaciones(this.reservaPage, 10);
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
            if(eventRefresh){
              this.votacionesList = [];              
            }
            if (eventInfinite) {
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }
            this.votacionesList.push(...data.result.content)
            this.storage.set(this.idEmpresa + this.votacionesService.nombreEtiqueta, this.votacionesList);
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
    this.reservaPage ++;
    this.getVotaciones(this.reservaPage, 10, event);
  }

  doRefresh(event) {
    this.reservaPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getVotaciones(this.reservaPage, 10, null, event);
  }

  
  async buscar( event ){
  }

}
