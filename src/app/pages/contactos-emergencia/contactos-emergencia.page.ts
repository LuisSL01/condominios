import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactosEmergenciaService } from '../../services/contactos-emergencia.service';
import { ContactosEmergencia } from '../../models/contactos-emergencia.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contactos-emergencia',
  templateUrl: './contactos-emergencia.page.html',
  styleUrls: ['./contactos-emergencia.page.scss'],
})
export class ContactosEmergenciaPage implements OnInit {

  textoBuscar ='';
  public contactos: ContactosEmergencia[] =[];
  
  idEmpresa: number;
  filters: any;
  contactoPage: number = 0;

  public contactos_default: ContactosEmergencia[] =[];

  idNegativo = -1;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public camposFiltros:string[]=new Array();

  constructor( public contactoService : ContactosEmergenciaService,
               public userData: UserData,
               public activatedRoute: ActivatedRoute,
               private storage:Storage ) {
   }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargaData();
    this.cargaFiltrosTabla();    

    this.contactoService.contactoListener.subscribe(elm => {
      if(this.contactos){
        var index = this.contactos.indexOf(elm);
        if (index > -1) {
          this.contactos.splice(index, 1);          
          this.storage.set(this.idEmpresa + this.contactoService.nombreEtiqueta, this.contactos);
        }
      }
    });
  }

  cargaFiltrosTabla(){
    this.camposFiltros.push("data_titulo");
    this.camposFiltros.push("data_nombreCompleto");
    this.camposFiltros.push("data_celular");
    this.camposFiltros.push("data_telefono1");
    this.camposFiltros.push("data_telefono2");
    
  }

  ionViewDidEnter(){
    console.log('uno ionViewDidEnter de visitas  PAGE');
    let value:boolean = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    if(value != null){
      this.contactoPage = 0;
      this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
      this.getContactos(this.contactoPage, 10, null, null);
    }
  }

  
  async cargaData(){
    await this.cargarDataTemporalStorage(this.idEmpresa);
    if (this.contactos.length == 0) {
      this.getContactos(this.contactoPage, 10);
    }
  }

  cargarDataDefault(){  
    
    this.contactos_default = [];
    this.contactos_default.push(this.addContactoDefault('Emergencias','911'));
    this.contactos_default.push(this.addContactoDefault('Capufe','074'));
    this.contactos_default.push(this.addContactoDefault('Ángeles Verdes','078'));
    this.contactos_default.push(this.addContactoDefault('Cruz Roja','53 95 11 11'));
    this.contactos_default.push(this.addContactoDefault('LOCATEL','56 58 11 11'));
    this.contactos_default.push(this.addContactoDefault('Protección Civil','56 83 22 22'));
    this.contactos_default.push(this.addContactoDefault('Denuncia Anónima','089'));
    this.contactos_default.push(this.addContactoDefault('Incendios Forestales','55 54 06 12'));
    this.contactos_default.push(this.addContactoDefault('Policía Federal','088'));
    this.contactos_default.push(this.addContactoDefault('Fuga de agua','56 54 32 10'));
    this.contactos_default.push(this.addContactoDefault('Fuga de gas','53 53 57 63'));
  }
  addContactoDefault(nombre:string, numero:string):any{
     let contac = new ContactosEmergencia();
     let dataMapContacto: any = {};
    contac.id = this.idNegativo --;
    contac.nombreCompleto = nombre;    
    dataMapContacto.celular = numero;
    contac.data = dataMapContacto;
    return contac; 
  }

  async cargarDataTemporalStorage(idEmpresa: number) {
    await this.contactoService.getContactosFromStorage(this.idEmpresa);
    this.contactos = this.contactoService.contactos;
  }

  getContactos(page: number, size: number, eventInfinite?, eventRefresh?) {
    console.log('getContactos');    
    this.contactoService.getContactos(this.idEmpresa, page, size, this.filters).subscribe((data) => {
        console.log(data);        
          if (data.status === 200) {
            if (eventInfinite) {
              this.contactos.push(...data.result.content);
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }              
            }else{
              this.contactos = data.result.content;
            }
            this.storage.set(this.idEmpresa + this.contactoService.nombreEtiqueta, this.contactos);
            this.completeEvent(eventInfinite, eventRefresh);            
          } else {
            this.userData.showToast('error al recuperar registros');            
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
    this.contactoPage ++;
    this.getContactos(this.contactoPage, 10, event);
  }

  doRefresh(event) {
    this.contactoPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getContactos(this.contactoPage, 10, null, event);
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
    this.contactoPage = 0;
    this.infiniteScroll.disabled = false;
    this.getContactos(this.contactoPage,10,null, null);    
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }

}
