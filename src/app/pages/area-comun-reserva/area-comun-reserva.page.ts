import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaComunReserva } from '../../models/area-comun.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { AreaComunService } from '../../services/area-comun.service';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-area-comun-reserva',
  templateUrl: './area-comun-reserva.page.html',
  styleUrls: ['./area-comun-reserva.page.scss'],
})
export class AreaComunReservaPage implements OnInit {


  public reservasList:any[]=[];

  idEmpresa: number;
  filters: any;
  reservaPage: number = 0;

  nombreEtiqueta = "_areas-comunes";
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public areaComunService: AreaComunService,
              private userData:UserData) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();

    this.getReservas(this.reservaPage, 10);
  }

  
  getReservas(page: number, size: number, eventInfinite?, eventRefresh?) {
    this.areaComunService.getAreaComunReservas(this.idEmpresa, page, size, this.filters)
      .subscribe(
        (data) => {          
          if (data.status === 200) {
            if(eventRefresh){
              this.reservasList = [];
            }
            if (eventInfinite) {
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }
            this.reservasList.push(...data.result.content)            
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
    this.getReservas(this.reservaPage, 10, event);
  }

  doRefresh(event) {
    this.reservaPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getReservas(this.reservaPage, 10, null, event);
  }

}
