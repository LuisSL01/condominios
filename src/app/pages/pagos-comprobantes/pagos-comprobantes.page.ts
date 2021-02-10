import { Component, OnInit, ViewChild } from '@angular/core';
import { PagosComprobantesService } from 'src/app/services/pagos-comprobantes.service';
import { PagosComprobantes } from '../../models/pagos-comprobantes.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-pagos-comprobantes',
  templateUrl: './pagos-comprobantes.page.html',
  styleUrls: ['./pagos-comprobantes.page.scss'],
})
export class PagosComprobantesPage implements OnInit {

  textoBuscar ='';

  public pagoComprobanteList : PagosComprobantes[] =[];
  
  idEmpresa: number;
  filters: any;
  pagoComprobantePage: number = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public pagosComprobantesService: PagosComprobantesService,
              private userData:UserData,
              private storage: Storage,) {

    
  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargaData();
  }

  async cargaData(){
    console.log('cargaData()');
    
    await this.cargarDataTemporalStorage(this.idEmpresa);
    if (this.pagoComprobanteList.length == 0) {
      this.getPagosComprobantes(this.pagoComprobantePage, 10);
    }
  }

  async cargarDataTemporalStorage(idEmpresa: number) {
    await this.pagosComprobantesService.getPagosComprobatesFromStorage(this.idEmpresa);
    this.pagoComprobanteList = this.pagosComprobantesService.pagosComprobantes;
  }

  getPagosComprobantes(page: number, size: number, eventInfinite?, eventRefresh?) {
    this.pagosComprobantesService.getPagosComprobantes(this.idEmpresa, page, size, this.filters).subscribe((data) => {
          if (data.status === 200) {
            if(eventRefresh) this.pagoComprobanteList = [];
            if (eventInfinite) {
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }
            this.pagoComprobanteList.push(...data.result.content)
            this.storage.set(this.idEmpresa + this.pagosComprobantesService.nombreEtiqueta, this.pagoComprobanteList);
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
    this.pagoComprobantePage ++;
    this.getPagosComprobantes(this.pagoComprobantePage, 10, event);
  }

  doRefresh(event) {
    this.pagoComprobantePage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getPagosComprobantes(this.pagoComprobantePage, 10, null, event);
  }


  buscar( event ){

    /* console.log('pagos comprobantes.buscar()');
    this.textoBuscar = event.detail.value;
    this.pagoComprobanteList = this.dataLocalPagosComprobantesService.pagosComprobantes;

    if(this.textoBuscar === ''){
      return ;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();  
      this.pagoComprobanteList = this.pagoComprobanteList.filter(item => {
        return (
          (item.mesPago.toLowerCase().includes(this.textoBuscar))
         || (item.formaPago.toLowerCase().includes(this.textoBuscar))
          );
      }    
      );
      console.log('despues de terminar el filter');
    } */
    
  }

}
