import { Component, OnInit, ViewChild } from '@angular/core';

import { ConvocatoriaService } from '../../services/convocatoria.service';
import { Publicacion } from '../../models/publicacion.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Storage } from '@ionic/storage';

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
  resolucionPage: number = 0;
  
  @ViewChild(IonInfiniteScroll) infiniteScroll : IonInfiniteScroll;

  constructor(public convocatoriaService : ConvocatoriaService,
              private userData: UserData, 
              private storage: Storage,) { 
  
  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargarConvocatorias();
  }
  
  async cargarConvocatorias() {
    await this.cargarTemporalesStorage(this.idEmpresa);
    if (this.convocatoriasList.length == 0) {
      this.getDataService(this.resolucionPage, 10);
    }
  }

  getDataService(page: number, size: number, eventInfinite?, eventRefresh?) {
    this.convocatoriaService.getConvocatorias(this.idEmpresa, page, size, this.filters).subscribe((data) => {
          if (data.status === 200) {
            if (eventRefresh) {
              this.convocatoriasList =[];
            }
            if (eventInfinite) {
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }
            this.convocatoriasList.push(...data.result.content);
            this.storage.set(this.idEmpresa + this.convocatoriaService.nombreEtiqueta, this.convocatoriasList);
            this.userData.showToast('recuperados correctamente');
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

  async cargarTemporalesStorage(idEmpresa: number) {
    await this.convocatoriaService.getConvocatoriasFromStorage(this.idEmpresa);
    console.log('terminando de cargar los del storage');
    this.convocatoriasList = this.convocatoriaService.convocatorias;    
  }


  loadData(event) {//Desde el infinite scroll
    this.resolucionPage++;
    this.getDataService(this.resolucionPage, 10, event);
  }

  doRefresh(event) {
    this.resolucionPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getDataService(this.resolucionPage, 10, null, event);
  }
  buscar(event){
  
  }
}
