import { Component, OnInit, ViewChild } from '@angular/core';
import { BitacoraVisita } from '../../models/bitacora-visitas.model';
import { BitacoraVisitaService } from '../../services/bitacora-visita.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-bitacora-visitas',
  templateUrl: './bitacora-visitas.page.html',
  styleUrls: ['./bitacora-visitas.page.scss'],
})
export class BitacoraVisitasPage implements OnInit {

  textoBuscar = "";

  public bitacoraRegistrosList:BitacoraVisita[] = [];
  idEmpresa: number;
  filters: any;
  registrosVisitaPage: number = 0;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public camposFiltros:string[]=new Array();

  constructor(public bitacoraVisitaService : BitacoraVisitaService,
              private userData: UserData,
              public activatedRoute: ActivatedRoute,
              private storage: Storage,) {
    console.log('en el constructor de bitacora visitas 1');
   }

  ngOnInit() {

    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargarData();    
    this.cargaFiltrosTabla();    

    this.bitacoraVisitaService.bitacoraListener.subscribe(noti => {
      if(this.bitacoraRegistrosList){
        var index = this.bitacoraRegistrosList.indexOf(noti);
        if (index > -1) {
          this.bitacoraRegistrosList.splice(index, 1);
          this.storage.set(this.idEmpresa + this.bitacoraVisitaService.nombreEtiqueta, this.bitacoraRegistrosList);
        }
      }
    });
  }

  cargaFiltrosTabla(){
    this.camposFiltros.push("data_nombreCompleto");
    this.camposFiltros.push("data_placa");
    this.camposFiltros.push("data_personasIngresan");
    this.camposFiltros.push("data_observaciones");
  }

  ionViewDidEnter(){    
    let value:boolean = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    if(value != null){
      this.registrosVisitaPage = 0;
      this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
      this.getRegistrosVisita(this.registrosVisitaPage, 10, null, null);
    }
  }

  async cargarData() {
    await this.cargarDataTemporalStorage(this.idEmpresa);
    if (this.bitacoraRegistrosList.length == 0) {
      this.getRegistrosVisita(this.registrosVisitaPage, 10);
    }
  }

  async cargarDataTemporalStorage(idEmpresa: number) {
    await this.bitacoraVisitaService.getBitacoraVisitasFromStorage(idEmpresa);//esperamos a que termine de cargar    
    this.bitacoraRegistrosList = this.bitacoraVisitaService.bitacoraVisitas;    
  }

  getRegistrosVisita(page: number, size: number, eventInfinite?, eventRefresh?) {
    this.bitacoraVisitaService.getBitacoraVisitas(this.idEmpresa, page, size, this.filters).subscribe((data) => {
          if (data.status === 200) {

            if (eventInfinite) {
              this.bitacoraRegistrosList.push(...data.result.content);
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }              
            }else{                  
              this.bitacoraRegistrosList = data.result.content;
            }
            this.storage.set(this.idEmpresa + this.bitacoraVisitaService.nombreEtiqueta, this.bitacoraRegistrosList);            
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
  
  loadData(event) {//Desde el infinite scroll
    this.registrosVisitaPage++;
    this.getRegistrosVisita(this.registrosVisitaPage, 10, event);
  }

  doRefresh(event) {
    this.registrosVisitaPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getRegistrosVisita(this.registrosVisitaPage, 10, null, event);
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
    this.registrosVisitaPage = 0;
    this.infiniteScroll.disabled = false;
    this.getRegistrosVisita(this.registrosVisitaPage, 10, null, null);    
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }
}
