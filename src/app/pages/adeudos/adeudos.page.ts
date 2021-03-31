import { Component, OnInit, ViewChild } from '@angular/core';
import { AdeudoPago } from '../../models/adeudo-pago.model';
import { AdeudoService } from '../../services/adeudo.service';
import { UserData } from '../../providers/user-data';
import { IonInfiniteScroll } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adeudos',
  templateUrl: './adeudos.page.html',
  styleUrls: ['./adeudos.page.scss'],
})
export class AdeudosPage implements OnInit {

  textoBuscar ="";
  public adeudos: AdeudoPago[] =[];

  idEmpresa: number;
  idAgente: number;
  filters: any;
  adeudoPage: number = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public camposFiltros:string[]=new Array();

  constructor(public adeudoService: AdeudoService,
              private userData:UserData,
              public activatedRoute: ActivatedRoute,
              private storage: Storage,) { 
    
  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();    
    this.cargaFiltrosTabla();
  }

  cargaFiltrosTabla(){
    this.camposFiltros.push("data_concepto");
    this.camposFiltros.push("data_descripcion");
    this.camposFiltros.push("data_cantidad");
  }


  ionViewDidEnter(){
    console.log('uno ionViewDidEnter de visitas  PAGE');
    let value:boolean = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    if(value != null){
      this.adeudoPage = 0;
      this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
      this.getAdeudos(this.adeudoPage, 10, null, null);      
    }else{
      this.cargaData();
    }
  }

  
  async cargaData(){
    /* await this.cargarDataTemporalStorage(this.idEmpresa);
    if (this.adeudos.length == 0) { */
      this.getAdeudos(this.adeudoPage, 10);
    /* } */
  }

  async cargarDataTemporalStorage(idEmpresa: number) {
    await this.adeudoService.getAdeudosFromStorage(idEmpresa);
    this.adeudos = this.adeudoService.adeudos;    
  }

  getAdeudos(page: number, size: number, eventInfinite?, eventRefresh?) {
    console.log('getAdeudos');
    if(this.userData.administrador){//Si es administrador puede ver todos los adeudos
      this.adeudoService.getAdeudos(this.idEmpresa, page, size, this.filters)
        .subscribe((data) => {
          console.log(data);        
            if (data.status === 200) {
              if (eventInfinite) {
                this.adeudos.push(...data.result.content);
                if (data.result.content.length === 0) {
                  eventInfinite.target.disabled = true;
                  eventInfinite.target.complete();
                  return;
                }
              }else{                      
                this.adeudos = data.result.content;
              }
              this.storage.set(this.idEmpresa + this.adeudoService.nombreEtiqueta, this.adeudos);            
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
    }else{
      this.adeudoService.getAdeudosPorAgente(this.idEmpresa, this.idAgente, page, size, this.filters)
      .subscribe((data) => {
        console.log(data);        
          if (data.status === 200) {
            if (eventInfinite) {
              this.adeudos.push(...data.result.content);
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }else{                      
              this.adeudos = data.result.content;
            }
            this.storage.set(this.idEmpresa + this.adeudoService.nombreEtiqueta, this.adeudos);            
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
    this.adeudoPage ++;
    this.getAdeudos(this.adeudoPage, 10, event);
  }

  doRefresh(event) {
    this.adeudoPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getAdeudos(this.adeudoPage, 10, null, event);
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
    this.adeudoPage = 0;
    this.infiniteScroll.disabled = false;
    this.getAdeudos(this.adeudoPage, 10, null, null);
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }


}
