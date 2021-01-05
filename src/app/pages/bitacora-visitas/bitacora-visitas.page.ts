import { Component, OnInit, ViewChild } from '@angular/core';
import { BitacoraVisita } from '../../models/bitacora-visitas.model';
import { BitacoraVisitaService } from '../../services/bitacora-visita.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";


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

  constructor(public bitacoraVisitaService : BitacoraVisitaService,
              private userData: UserData,
              private storage: Storage,) {
    console.log('en el constructor de bitacora visitas 1');
   }

  ngOnInit() {

    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargarData();    
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
            if (eventRefresh) {
              this.bitacoraRegistrosList = [];
            }
            if (eventInfinite) {
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }
            this.bitacoraRegistrosList.push(...data.result.content);
            this.storage.set(this.idEmpresa + this.bitacoraVisitaService.nombreEtiqueta, this.bitacoraRegistrosList);
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
    /* console.log('bitacoraAvisos.buscar()');
    this.textoBuscar = event.detail.value;
    this.bitacoraRegistrosList = this.dataLocalBitacoraVisitaService.bitacoraVisitas;

    if(this.textoBuscar === ''){
      return ;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();
      this.bitacoraRegistrosList = this.bitacoraRegistrosList.filter(item => {
        return (
          (item.nombreCompleto.toLowerCase().includes(this.textoBuscar))
          || (item.observaciones.toLowerCase().includes(this.textoBuscar))
          );
      }    
      );      
    }     */
  }
}
