import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactosEmergenciaService } from '../../services/contactos-emergencia.service';
import { ContactosEmergencia } from '../../models/contactos-emergencia.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Storage } from '@ionic/storage';

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

  constructor( public contactoService : ContactosEmergenciaService,
               private userData: UserData,
               private storage:Storage ) {
   }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargaData();
    this.cargarDataDefault();
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
            if(eventRefresh) this.contactos = [];            
            if (eventInfinite) {
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }
            this.contactos.push(...data.result.content)
            this.storage.set(this.idEmpresa + this.contactoService.nombreEtiqueta, this.contactos);
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
    this.contactoPage ++;
    this.getContactos(this.contactoPage, 10, event);
  }

  doRefresh(event) {
    this.contactoPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getContactos(this.contactoPage, 10, null, event);
  }


  buscar( event ){
/*     console.log('contactoEmergencia.buscar()');    
    this.textoBuscar = event.detail.value;

    this.contactosList = this.dataLocalContactosEmergenciaService.contactos;

    if(this.textoBuscar === ''){
      return ;
    }else{
      this.textoBuscar = this.textoBuscar.toLowerCase();  
      this.contactosList = this.contactosList.filter(item => {
        return (
          (item.titulo.toLowerCase().includes(this.textoBuscar))
         || (item.nombreCompleto.toLowerCase().includes(this.textoBuscar))
          );
      }    
      );
      console.log('despues de terminar el filter');
    } */
  }

}
