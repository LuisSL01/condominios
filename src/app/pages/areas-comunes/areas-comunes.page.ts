import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaComunService } from '../../services/area-comun.service';
import { AreaComun } from '../../models/area-comun.model';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-areas-comunes',
  templateUrl: './areas-comunes.page.html',
  styleUrls: ['./areas-comunes.page.scss'],
})
export class AreasComunesPage implements OnInit {

  textoBuscar = '';


  public areasList: AreaComun[] = [];
  public areasListLocal: AreaComun[] = [];

  idEmpresa: number;
  filters: any;
  areaComunPage: number = 0;

  nombreEtiqueta = "_areas-comunes";

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public areaComunService: AreaComunService,
              private userData: UserData,
              private storage: Storage,) {

  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargaAreasComunesStorage();
    this.cargarAnunciosLocalesStorage(this.idEmpresa);

  }

  async cargaAreasComunesStorage() {
    await this.cargarAnunciosTemporalesStorage(this.idEmpresa);
    if (this.areasList.length == 0) {
      this.getAreasComunes(this.areaComunPage, 10);
    }
  }



  getAreasComunes(page: number, size: number, eventInfinite?, eventRefresh?) {
    this.areaComunService.getAreasComunes(this.idEmpresa, page, size, this.filters)
      .subscribe(
        (data) => {
          if (data.status === 200) {
            if (eventRefresh) {
              this.areasList = [];
            }
            if (eventInfinite) {
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }
            this.areasList.push(...data.result.content);
            this.storage.set(this.idEmpresa + this.nombreEtiqueta, this.areasList);
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

    await this.areaComunService.getAreasComunesLocalFromStorage(idEmpresa);
    console.log('terminando de cargar locales');

    this.areasListLocal = this.areaComunService.areasComunesLocal;
    console.log('this.areasListLocal: ' + this.areasListLocal);

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
}
