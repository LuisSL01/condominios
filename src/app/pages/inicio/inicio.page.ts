import { Component, OnInit, ViewChild } from '@angular/core';
import { Componente } from 'src/app/interfaces/interface';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { IonInfiniteScroll, MenuController } from '@ionic/angular';
import { PublicacionService } from '../../services/publicacion.service';
import { Publicacion } from '../../models/publicacion.model';
import { AnuncioService } from '../../services/anuncio.service';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";
import { DatosInteresService } from '../../services/datos-interes.service';
import { ModalController } from "@ionic/angular";
import { DatosInteresPage } from '../datos-interes/datos-interes.page';
import { Router } from '@angular/router';

import { AngularFireAnalytics } from '@angular/fire/analytics';
/* import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx'; */


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Observable<Componente[]>;

  idEmpresa: number;  
  filters: any;

  public anunciosList : Publicacion[];
  public anunciosListLocal : Publicacion[];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  anunciosPage:number=0;

  


  pathS3:string ="https://almacenamientonube.s3.us-west-1.amazonaws.com/";
  pathBase64:string ="data:image/jpeg;base64,";

  climaData:any;
  direccion:any;
  nombreEmpresa:string;

  public fieldFilters:string[]=new Array();
  totalPages:number = 0;
  myDate:Date = new Date();

  mostrarDataInteres:boolean=true;

  constructor(private dataService: DataService,
              private menuCtrl: MenuController,
              public publicacionService : PublicacionService,
              private anuncioService : AnuncioService,
              private storage: Storage,
              private router: Router,
              private userData:UserData,
              private datosInteresService:DatosInteresService,
              private modalCtrl: ModalController,
              private analytics: AngularFireAnalytics
              
              /* private firebaseAnalytics: FirebaseAnalytics */
              ) { 
                try{
                  this.componentes = this.dataService.getMenuOpts();                
                  this.analytics.setCurrentScreen('Inicio');
                  this.analytics.logEvent('Ventana inicio');                  
                } catch (error) {
                  console.log('error'+ error);
                  this.userData.showToast('Error en recuperar componentes/analytics-> '+ error,'danger');
                  this.router.navigate(['/home']);//se redireccione al home para que inicie sesion
                } 
     }

 
  ngOnInit() {      
    this.cargaFiltrosTabla();    
    this.anuncioService.anuncioListener.subscribe(elm => {
      if(this.anunciosList){
        var index = this.anunciosList.indexOf(elm);
        if (index > -1) {
          this.anunciosList.splice(index, 1);
          this.storage.set(this.idEmpresa + "_anuncios", this.anunciosList);
        }
      }
    }); 
  }

  async verificaExisteDatosSesion(){  
    try {
      const dt = await this.storage.get('userDetails');
      if (dt) {
        this.direccion = this.userData.getDataDireccionEmpresa();
        this.nombreEmpresa = this.userData.getNombreEmpresa();    
        this.idEmpresa = this.userData.getIdEmpresa();
        this.cargarDatosInteres();
        this.cargaAnunciosStorage();
      }else{
        this.router.navigate(['/home']);//se redireccione al home para que inicie sesion
      }
    } catch (error) {
      console.log('error'+ error);
      this.userData.showToast('Error en verificaExisteDatosSesion-> '+ error,'danger');
      this.router.navigate(['/home']);//se redireccione al home para que inicie sesion
    }   
   }

  ionViewWillEnter(){    
    this.verificaExisteDatosSesion();
  }
  async cargarDatosInteres(){ 
    if( ! this.climaData){//que solo recupere cuanto no hayan datos
      await this.cargarDataClima();    
    }
  }



  cargarDataClima(){
    if(this.direccion && this.direccion.asentamiento){
      this.datosInteresService.getClimaByCoordenadas(this.direccion.asentamiento.codigoPostal).subscribe((data) => {    
            if (data.cod === 200) {
              this.climaData = data;
               /* this.presentModalDatosInteres();  */
            } else {
              console.log('Llego otro estatus al recupera clima');              
            }
          },
          (err) => {
            console.log(err);
            console.log('Llego otro estatus al recupera clima');
          }
        );
    }else{
      console.log('No se pudo recuperar los datos de empresa');      
    }    
  }

  async presentModalDatosInteres() {
    const modal = await this.modalCtrl.create({
      component: DatosInteresPage,
      componentProps: {
        climaData: this.climaData,
        direccionData: this.direccion,
        nombreEmpresa: this.nombreEmpresa        
      },
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }

  async cargaAnunciosStorage(){ 
    if(this.userData.administrador){
      await this.cargarAnunciosTemporalesStorage(this.idEmpresa);      
      if(this.anunciosList.length == 0){        
        await this.getAnuncios(this.anunciosPage, 10);
      }     
    }else{
      await this.getAnuncios(this.anunciosPage, 10);
    }     
      
  }

  getAnuncios(page: number, size: number, eventInfinite?, eventRefresh?) {
    /* this.anuncioService.getDataAnuncios(this.idEmpresa, this.anunciosPage, size, this.filters);     */
    this.anuncioService
      .getAnuncios(this.idEmpresa, page, size, this.filters)
      .subscribe(
        (data) => {
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
    /* console.log('cargarAnunciosLocalesStorage');     */
    const anncios = await this.storage.get(this.userData.getIdEmpresa() + "_anuncios_local");
    console.log(this.userData.getIdEmpresa() + "_anuncios_local");
    /* console.log("anunciosListLocal: ", anncios); */
    if (anncios) {
      this.anunciosListLocal = anncios;
    } else {
      this.anunciosListLocal = [];
    }
  }

  loadData(event) {//Desde el infinite scroll
    /* console.log("load data"); */
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

  toogleMenu(){
    this.menuCtrl.toggle();
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }
  cargaFiltrosTabla(){

    this.fieldFilters.push("data_descripcion");
    this.fieldFilters.push("data_titulo");
    this.fieldFilters.push("data_clasificacion");
    /* this.fieldFilters.push("estatus"); */

      
  }

  buscar(event){

    if( ! this.isEmpty(event.detail.value)){
      this.mostrarDataInteres = false;

      console.log(JSON.stringify(this.fieldFilters));
      this.filters = "";
      this.fieldFilters.forEach(item => this.filters += ''+item+':*'+ event.detail.value + '*,');
      if(this.filters.endsWith(",")){
        this.filters = this.filters.substring(0, this.filters.length -1 );
      }    
     }else{
      this.mostrarDataInteres = true;
       console.log('la cadena viene vacia');
       this.filters = "";
     }
     this.anunciosPage = 0;
     this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
     this.getAnuncios(this.anunciosPage, 10, null, null);
  
  }

}

