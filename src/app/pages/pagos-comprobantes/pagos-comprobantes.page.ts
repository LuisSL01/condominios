import { Component, OnInit, ViewChild } from '@angular/core';
import { PagosComprobantesService } from 'src/app/services/pagos-comprobantes.service';
import { PagosComprobantes } from '../../models/pagos-comprobantes.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";
import { ActivatedRoute } from '@angular/router';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-pagos-comprobantes',
  templateUrl: './pagos-comprobantes.page.html',
  styleUrls: ['./pagos-comprobantes.page.scss'],
})
export class PagosComprobantesPage implements OnInit {

  textoBuscar ='';

  public pagoComprobanteList : PagosComprobantes[] =[];
  
  idEmpresa: number;
  idAgente: number;
  idDepartamento:number;
  filters: any;
  pagoComprobantePage: number = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public camposFiltros:string[]=new Array();
  constructor(public pagosComprobantesService: PagosComprobantesService,
              private userData:UserData,
              public activatedRoute: ActivatedRoute,
              private ui:UiServiceService,
              private storage: Storage,) {

    
  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();    
    this.idDepartamento = this.userData.departamento_id;
    this.cargaFiltrosTabla();

    this.pagosComprobantesService.pagoListener.subscribe(noti => {
      if(this.pagoComprobanteList){
        var index = this.pagoComprobanteList.indexOf(noti);
        if (index > -1) {
          this.pagoComprobanteList.splice(index, 1);
          this.storage.set(this.idEmpresa + this.pagosComprobantesService.nombreEtiqueta, this.pagoComprobanteList);
        }
      }
    });
  }

  cargaFiltrosTabla(){
    this.camposFiltros.push("data_formaPago");
    
  }
  
  ionViewDidEnter(){
    console.log('uno ionViewDidEnter de visitas  PAGE');
    let value:boolean = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    if(value != null){
      this.pagoComprobantePage = 0;
      this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll      
      this.getPagosComprobantes(this.pagoComprobantePage, 10, null, null);
    }else{
      this.cargaData();
    }
  }

  async cargaData(){
    console.log('cargaData()');    
    if(this.userData.administrador){
      await this.cargarDataTemporalStorage(this.idEmpresa);
      if (this.pagoComprobanteList.length == 0) {
        this.getPagosComprobantes(this.pagoComprobantePage, 10);
      }
    }else{
      this.getPagosComprobantes(this.pagoComprobantePage, 10);
    }
  }

  async cargarDataTemporalStorage(idEmpresa: number) {
    await this.pagosComprobantesService.getPagosComprobatesFromStorage(this.idEmpresa);
    this.pagoComprobanteList = this.pagosComprobantesService.pagosComprobantes;
  }

  getPagosComprobantes(page: number, size: number, eventInfinite?, eventRefresh?) {

    this.userData.showToast('Buscando registros');
    this.ui.presentLoading();
    if(this.userData.administrador){//Si es administrador puede ver todos los adeudos
          this.pagosComprobantesService.getPagosComprobantes(this.idEmpresa, page, size, this.filters).subscribe((data) => {
                this.ui.dismissLoading();
                if (data.status === 200) {
                  if (eventInfinite) {
                    this.pagoComprobanteList.push(...data.result.content);
                    if (data.result.content.length === 0) {
                      eventInfinite.target.disabled = true;
                      eventInfinite.target.complete();
                      return;
                    }
                  }else{                      
                    this.pagoComprobanteList = data.result.content;
                  }                        
                  this.storage.set(this.idEmpresa + this.pagosComprobantesService.nombreEtiqueta, this.pagoComprobanteList);
                  this.completeEvent(eventInfinite, eventRefresh);
                } else {
                  this.userData.showToast('error al recuperar registros');
                  console.log(data.status);
                  this.completeEvent(eventInfinite, eventRefresh);            
                }
              },
              (err) => {
                this.ui.dismissLoading();
                this.userData.showToast('error al recuperar registros');
                console.log(err);
                this.completeEvent(eventInfinite, eventRefresh);
              }
            );
    }else{
      //this.pagosComprobantesService.getPagosComprobantesPorAgente(this.idEmpresa, this.idAgente, page, size, this.filters).subscribe((data) => {
        this.pagosComprobantesService.getPagosComprobantesPorDepartamento(this.idEmpresa, this.idDepartamento, page, size, this.filters).subscribe((data) => {
        this.ui.dismissLoading();
        if (data.status === 200) {
          if (eventInfinite) {
            this.pagoComprobanteList.push(...data.result.content);
            if (data.result.content.length === 0) {
              eventInfinite.target.disabled = true;
              eventInfinite.target.complete();
              return;
            }
          }else{                      
            this.pagoComprobanteList = data.result.content;
          }                        
          this.storage.set(this.idEmpresa + this.pagosComprobantesService.nombreEtiqueta, this.pagoComprobanteList);            
          this.completeEvent(eventInfinite, eventRefresh);
        } else {
          this.userData.showToast('error al recuperar registros');
          console.log(data.status);
          this.completeEvent(eventInfinite, eventRefresh);            
        }
      },
      (err) => {
        this.ui.dismissLoading();
        this.userData.showToast('error al recuperar registros');
        console.log(err);
        this.completeEvent(eventInfinite, eventRefresh);
      }
    );
    }

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
    this.pagoComprobantePage = 0;
    this.infiniteScroll.disabled = false;
    this.getPagosComprobantes(this.pagoComprobantePage, 10, null, null);
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }
}
