import { Component, OnInit, ViewChild } from "@angular/core";
import { AnuncioService } from "src/app/services/anuncio.service";
import { Publicacion } from "../../models/publicacion.model";
import { Storage } from "@ionic/storage";
import { UserData } from "../../providers/user-data";
import { IonInfiniteScroll, ToastController } from '@ionic/angular';
import { isEmpty } from "rxjs/operators";
/* import { NetworkService } from '../../services/network.service'; */
import { ActivatedRoute } from '@angular/router';



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
  filters: string = "";
  anunciosPage: number = 0;
  totalPages:number = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public fieldFilters:string[]=new Array();

  constructor(
    public anuncioService: AnuncioService,
    private userData: UserData,
    private storage: Storage,
    private toastCtrl: ToastController,
    public activatedRoute: ActivatedRoute,
    /* private networkService: NetworkService */
  ) {
    this.idEmpresa = this.userData.getIdEmpresa();
  }

  ngOnInit() {
    this.cargarAnunciosLocalesStorage();
    this.cargaAnunciosStorage();
    this.cargaFiltrosTabla();    
  }

  ionViewDidEnter(){
    console.log('uno ionViewDidEnter de ANUNCIOS  PAGE');
    let ann:Publicacion = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    console.log('ann creado', JSON.stringify(ann));
    if(ann != null){
      console.log('antes', JSON.stringify(this.anunciosList));      
      this.anunciosList.unshift(ann);
      this.storage.set(this.idEmpresa + "_anuncios", this.anunciosList);
      console.log('despues', JSON.stringify(this.anunciosList));      
    }
  }


  cargaFiltrosTabla(){

    this.fieldFilters.push("data_descripcion");
    this.fieldFilters.push("data_titulo");
    this.fieldFilters.push("data_clasificacion");
    /* this.fieldFilters.push("estatus"); */

      
  }


  ionViewWillEnter(){    

    console.log('se ejecuta dos');  

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
    this.anuncioService.getAnuncios(this.idEmpresa, page, size, this.filters).subscribe(
        (data) => {
          console.log(data);
          
          if (data.status === 200) {      
            this.totalPages = data.result.totalPages;
            /* this.anunciosList.push(...data.result.content); */
            if (eventInfinite) {   
              console.log('event infinite');
              this.anunciosList.push(...data.result.content);            
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
              
            }else{
              console.log('else infinite');
              
              this.anunciosList = data.result.content;
            }
           
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

    console.log("load data");
    this.anunciosPage++;
    console.log(this.totalPages, "->", this.anunciosPage);
    if (this.anunciosPage < this.totalPages)
      this.getAnuncios(this.anunciosPage, 10, event);
    else { //Significa que ya no hay datos por recuperar 
      event.target.disabled = true;
      event.target.complete();
      return;
    } 
  }

  doRefresh(event) {    
    this.anunciosPage = 0;
    this.totalPages = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getAnuncios(this.anunciosPage, 10, null, event);
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }

  buscar(event){

    console.log('buscar, '+ event.detail.value);

   if( ! this.isEmpty(event.detail.value)){

     console.log(JSON.stringify(this.fieldFilters));
     this.filters = "";
     this.fieldFilters.forEach(item => this.filters += ''+item+':*'+ event.detail.value + '*,');
     if(this.filters.endsWith(",")){
       this.filters = this.filters.substring(0, this.filters.length -1 );
     }    
    }else{
      console.log('la cadena viene vacia');
      this.filters = "";
    }
    this.anunciosPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getAnuncios(this.anunciosPage, 10, null, null);
  }
}
