import { Component, OnInit, ViewChild } from '@angular/core';
import { PagosComprobantes } from '../../models/pagos-comprobantes.model';
import { PagosComprobantesService } from '../../services/pagos-comprobantes.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";
import { PagosComprobantesPage } from '../pagos-comprobantes/pagos-comprobantes.page';

@Component({
  selector: 'app-validar-comprobantes',
  templateUrl: './validar-comprobantes.page.html',
  styleUrls: ['./validar-comprobantes.page.scss'],
})
export class ValidarComprobantesPage implements OnInit {

  textoBuscar ='';
  public comprobantesValidarList: PagosComprobantes[]=[];
  
  idEmpresa: number;
  filters: any;
  pagoComprobanteValidarPage: number = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public pagosComprobantesService : PagosComprobantesService ,
              private userData:UserData,
              private storage: Storage,
              ) { 
    
  }

  ngOnInit() {
    console.log('on init');
    
    this.idEmpresa = this.userData.getIdEmpresa();
    
    this.cargaData();
    
  }
  async cargaData(){
    console.log('cargaData()');    
    await this.cargarDataTemporalStorage(this.idEmpresa);
    if (this.comprobantesValidarList.length == 0) {
      this.getPagosComprobantesValidar(this.pagoComprobanteValidarPage, 10);
    }
  }

  async cargarDataTemporalStorage(idEmpresa: number) {
    await this.pagosComprobantesService.getPagosComprobatesValidarFromStorage(this.idEmpresa);
    this.comprobantesValidarList = this.pagosComprobantesService.pagosComprobantesValidar;
  }

  getPagosComprobantesValidar(page: number, size: number, eventInfinite?, eventRefresh?) {
    this.pagosComprobantesService.getPagosComprobantes(this.idEmpresa, page, size, this.filters).subscribe((data) => {
          if (data.status === 200) {
            if(eventRefresh) this.comprobantesValidarList = [];
            if (eventInfinite) {
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }
            this.comprobantesValidarList.push(...data.result.content)
            this.storage.set(this.idEmpresa + this.pagosComprobantesService.nombreEtiquetaValidar, this.comprobantesValidarList);
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
    this.pagoComprobanteValidarPage ++;
    this.getPagosComprobantesValidar(this.pagoComprobanteValidarPage, 10, event);
  }

  doRefresh(event) {
    this.pagoComprobanteValidarPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getPagosComprobantesValidar(this.pagoComprobanteValidarPage, 10, null, event);
  }

  buscar( event ){
    
/*     this.textoBuscar = event.detail.value;
    this.comprobantesValidarList = this.pagosComprobantesService.pagosComprobantes;

    if(this.textoBuscar === ''){
      return ;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();  
      this.comprobantesValidarList = this.comprobantesValidarList.filter(item => {
        return (
         (item.formaPago.toLowerCase().includes(this.textoBuscar))
          );
      }    
      );
    } */
    
  }


}
