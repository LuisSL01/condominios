import { Component, OnInit, ViewChild } from '@angular/core';
import { AdeudoPago } from '../../models/adeudo-pago.model';
import { AdeudoService } from '../../services/adeudo.service';
import { UserData } from '../../providers/user-data';
import { IonInfiniteScroll } from '@ionic/angular';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-adeudos',
  templateUrl: './adeudos.page.html',
  styleUrls: ['./adeudos.page.scss'],
})
export class AdeudosPage implements OnInit {

  textoBuscar ="";
  public adeudos: AdeudoPago[] =[];

  idEmpresa: number;
  filters: any;
  adeudoPage: number = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public adeudoService: AdeudoService,
              private userData:UserData,
              private storage: Storage,) { 
    
  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargaData();
  }

  
  async cargaData(){
    await this.cargarDataTemporalStorage(this.idEmpresa);
    if (this.adeudos.length == 0) {
      this.getAdeudos(this.adeudoPage, 10);
    }
  }

  async cargarDataTemporalStorage(idEmpresa: number) {
    await this.adeudoService.getAdeudosFromStorage(idEmpresa);
    this.adeudos = this.adeudoService.adeudos;    
  }

  getAdeudos(page: number, size: number, eventInfinite?, eventRefresh?) {
    console.log('getAdeudos');
    
    this.adeudoService.getAdeudos(this.idEmpresa, page, size, this.filters)
      .subscribe((data) => {
        console.log(data);
        
          if (data.status === 200) {
            if(eventRefresh){
              this.adeudos = [];
            }
            if (eventInfinite) {
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }
            this.adeudos.push(...data.result.content)
            this.storage.set(this.idEmpresa + this.adeudoService.nombreEtiqueta, this.adeudos);
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
    this.adeudoPage ++;
    this.getAdeudos(this.adeudoPage, 10, event);
  }

  doRefresh(event) {
    this.adeudoPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getAdeudos(this.adeudoPage, 10, null, event);
  }

  buscar( event ){    
  }


}
