import { Component, OnInit, ViewChild } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto.model';
import { UserData } from '../../providers/user-data';
import { Storage } from '@ionic/storage';
import { IonInfiniteScroll, NavController } from '@ionic/angular';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
})
export class GastosPage implements OnInit {

  textoBuscar = '';
  public gastos: Gasto[] = [];
  public gastosLocales: Gasto[] = [];

  idEmpresa: number;
  filters: any;
  gastosPage: number = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public gastoService: GastoService,
              private userData: UserData,
              private storage:Storage ,
              public navCtrl: NavController) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargarGastosLocalesStorage();
    this.cargaGastosStorage();
  }

  async cargaGastosStorage(){
    await this.cargarGastosTemporalesStorage(this.idEmpresa);
    if(this.gastos.length == 0){
      await this.getGastos(this.gastosPage, 10);
    }
  }

  getGastos(page: number, size: number, eventInfinite?, eventRefresh?) {     
    this.gastoService.getGastos(this.idEmpresa, page, size, this.filters).subscribe((data) => {
        console.log(data);        
          if (data.status === 200) {
            if(eventRefresh) this.gastos = [];
            if (eventInfinite) {
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }
            this.gastos.push(...data.result.content)
            this.storage.set(this.idEmpresa + "_gastos", this.gastos);
            this.userData.showToast('Gastos recuperados correctamente');
            this.completeEvent(eventInfinite, eventRefresh);            
          } else {
            this.userData.showToast('Error al recuperar los registros');
            console.log(data.status);
            this.completeEvent(eventInfinite, eventRefresh);            
          }
        },
        (err) => {
          this.userData.showToast('Error al recuperar los registros');
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

  async cargarGastosTemporalesStorage(idEmpresa: number) {
    const data = await this.storage.get(idEmpresa + "_gastos");
    if (data) {
      this.gastos = data;
    } else {
      this.gastos = [];
    }
  }

  async cargarGastosLocalesStorage() {
    const gasl = await this.storage.get(this.userData.getIdEmpresa() + "_gastos_local");
    if (gasl) {
      this.gastosLocales = gasl;
    } else {
      this.gastosLocales = [];
    }
  }

  loadData(event) {//Desde el infinite scroll
    /* console.log("load data"); */
    this.gastosPage ++;
    this.getGastos(this.gastosPage, 10, event);
  }

  doRefresh(event) {    
    this.gastosPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getGastos(this.gastosPage, 10, null, event);
  }

  buscar( event ){
    console.log('gasto.buscar()');    
    this.textoBuscar = event.detail.value;
    this.gastos = this.gastoService.gastos;

    if(this.textoBuscar === ''){
      return ;
    } else{
      this.textoBuscar = this.textoBuscar.toLowerCase();  
      this.gastos = this.gastos.filter(item => {
        return (
          (item.tipoDeGasto.toLowerCase().includes(this.textoBuscar))
          );
      });
      console.log('despues de terminar el filter gasto');
    }
  }

}
