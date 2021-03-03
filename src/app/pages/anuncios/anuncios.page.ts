import { Component, OnInit, ViewChild } from "@angular/core";
import { AnuncioService } from "src/app/services/anuncio.service";
import { Publicacion } from "../../models/publicacion.model";
import { Storage } from "@ionic/storage";
import { UserData } from "../../providers/user-data";
import { IonInfiniteScroll, ToastController } from '@ionic/angular';
/* import { NetworkService } from '../../services/network.service'; */


@Component({
  selector: "app-anuncios",
  templateUrl: "./anuncios.page.html",
  styleUrls: ["./anuncios.page.scss"],
})
export class AnunciosPage implements OnInit {
  textoBuscar = "";
  public anunciosList: Publicacion[] = [];
  public anunciosListLocal: Publicacion[];

  idEmpresa: number;
  filters: any;
  anunciosPage: number = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    public anuncioService: AnuncioService,
    private userData: UserData,
    private storage: Storage,
    private toastCtrl: ToastController
    /* private networkService: NetworkService */
  ) {
    this.idEmpresa = this.userData.getIdEmpresa();
  }

  ngOnInit() {
    this.cargarAnunciosLocalesStorage();
    this.cargaAnunciosStorage();
  }

  ionViewWillEnter(){    
    
    this.showToastAlert("Nota: Los anuncios son responsabilidad de quien lo crea.");
  
  }

  showToastAlert(dataMessage: string){
    this.toastCtrl.create({
      message: dataMessage,
      color:"warning",
      duration: 2000
    }).then((toastData) => {
      toastData.present();
    });
  }



  async cargaAnunciosStorage(){
    /* console.log('this.networkService.getCurrentNetworkStatus(): ',this.networkService.getCurrentNetworkStatus()); */
    
      /* console.log('recuperaAnunciosLocalStorage');     */
      await this.cargarAnunciosTemporalesStorage(this.idEmpresa);
      /* console.log('termino de buscar en storage'); */
      if(this.anunciosList.length == 0){
        /* console.log('recuperando los del server');    */     
        await this.getAnuncios(this.anunciosPage, 10);
        /* console.log('terminando de recuperar data');     */    
      }
      /* console.log('dataRecuperada: ', this.anunciosList);   */    
  }

  getAnuncios(page: number, size: number, eventInfinite?, eventRefresh?) {
    /* this.anuncioService.getDataAnuncios(this.idEmpresa, this.anunciosPage, size, this.filters);     */
    this.anuncioService
      .getAnuncios(this.idEmpresa, page, size, this.filters)
      .subscribe(
        (data) => {
          if (data.status === 200) {
            if(eventRefresh){
              this.anunciosList = [];
            }            
            console.log("data.result.content: ", data.result.content);
            /* this.anunciosList.push(...data.result.content); */
            if (eventInfinite) {
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }
            this.anunciosList.push(...data.result.content);
            /* console.log("this.anunciosList", this.anunciosList); */
            this.storage.set(this.idEmpresa + "_anuncios", this.anunciosList);
            this.completeEvent(eventInfinite, eventRefresh);
          } else {
            console.log(data.status);            
            this.completeEvent(eventInfinite, eventRefresh);
          }
        },
        (err) => {
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

  async cargarAnunciosTemporalesStorage(idEmpresa: number) {
    /* console.log("cargarAnunciosTemporalesStorage: ", idEmpresa + "_anuncios"); */
    const ann = await this.storage.get(idEmpresa + "_anuncios");
    /* console.log(idEmpresa+"_anuncios:"  + ann); */
    if (ann) {
      this.anunciosList = ann;
    } else {
      this.anunciosList = [];
    }
  }

  async cargarAnunciosLocalesStorage() {
    /* console.log('cargarAnunciosLocalesStorage');   */  
    const anncios = await this.storage.get(this.userData.getIdEmpresa() + "_anuncios_local");
    /* console.log(this.userData.getIdEmpresa() + "_anuncios_local");
    console.log("anunciosListLocal: ", anncios); */
    if (anncios) {
      this.anunciosListLocal = anncios;
    } else {
      this.anunciosListLocal = [];
    }
  }

  loadData(event) {//Desde el infinite scroll
    /* console.log("load data"); */
    this.anunciosPage++;
    this.getAnuncios(this.anunciosPage, 10, event);
  }

  doRefresh(event) {    
    this.anunciosPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getAnuncios(this.anunciosPage, 10, null, event);
  }
  buscar(event){
  
  }
}
