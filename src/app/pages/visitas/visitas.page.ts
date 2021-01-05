import { Component, OnInit, ViewChild } from '@angular/core';
import { VisitaService } from '../../services/visita.service';
import { Visita } from '../../models/visita.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";

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

  constructor(public visitaService: VisitaService,
              private userData:UserData,
              private storage: Storage,) { 
    /* this.visitasList = this.dataLocalVisitaService.visitas; */
  }

  ngOnInit() {      
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargaData();
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
            if(eventRefresh){
              this.visitasList = [];              
            }
            if (eventInfinite) {
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }
            this.visitasList.push(...data.result.content)
            this.storage.set(this.idEmpresa + this.visitaService.nombreEtiqueta, this.visitasList);
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
    this.visitaPage ++;
    this.getVisitas(this.visitaPage, 10, event);
  }

  doRefresh(event) {
    this.visitaPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getVisitas(this.visitaPage, 10, null, event);
  }
  buscar(event){
/*     this.textoBuscar = event.detail.value;
    this.visitasList = this.dataLocalVisitaService.visitas;

    if(this.textoBuscar === ''){
      return ;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();  
      this.visitasList = this.visitasList.filter(item => {
        return (
          (item.nombreCompleto.toLowerCase().includes(this.textoBuscar))
         || (item.duracionDeVisita.toLowerCase().includes(this.textoBuscar))
          );
      }    
      );
    } */
  }

}
