import { Injectable } from '@angular/core';
import { ContactosEmergencia } from '../models/contactos-emergencia.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class ContactosEmergenciaService {

  contactos: ContactosEmergencia[] = [];
  baseUrl: string = environment.coreServiceBaseUrl;
  contactoContext: string = environment.coreApiBaseContactoOperation;  
  nombreEtiqueta = "_contactos";


  constructor(private storage: Storage,
              private http: HttpClient) {
    /* this.cargarContactosEmergencia();
    this.cargarContactosDefault(); */
  }

  save(contactoData: any): Observable<ApiResponse> {
    console.log('save contacto:'+this.baseUrl + this.contactoContext);
    return this.http.post<ApiResponse>(this.baseUrl + this.contactoContext, contactoData).pipe(share());
  }

  delete(idContacto: number) : Observable<ApiResponse> {
    console.log('borrando registro: ',this.baseUrl + this.contactoContext +environment.coreApiBaseDeleteOperation + "/" + idContacto );    
    return this.http.delete<ApiResponse>(this.baseUrl + this.contactoContext + environment.coreApiBaseDeleteOperation + "/" + idContacto).pipe(share());
  }

  getContactos(idEmpresa: number, page: number, size: number, filters: string){
    console.log(this.baseUrl + this.contactoContext+ environment.coreApiGetContactoListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):''));
    return this.http.get<ApiResponse>(this.baseUrl + this.contactoContext+ environment.coreApiGetContactoListOperation +"/"+idEmpresa+"?page="+page+"&size="+size+(filters ? ('&filters=' + filters):'')).pipe(share());
  }



  cargarContactosDefault(){
    console.log('cargando contactos default...');
    this.contactos.push(this.addContactoDefault('Emergencias','911'));
    this.contactos.push(this.addContactoDefault('Capufe','074'));
    this.contactos.push(this.addContactoDefault('Ángeles Verdes','078'));
    this.contactos.push(this.addContactoDefault('Cruz Roja','53 95 11 11'));
    this.contactos.push(this.addContactoDefault('LOCATEL','56 58 11 11'));
    this.contactos.push(this.addContactoDefault('Protección Civil','56 83 22 22'));
    this.contactos.push(this.addContactoDefault('Denuncia Anónima','089'));
    this.contactos.push(this.addContactoDefault('Incendios Forestales','55 54 06 12'));
    this.contactos.push(this.addContactoDefault('Policía Federal','088'));
    this.contactos.push(this.addContactoDefault('Fuga de agua','56 54 32 10'));
    this.contactos.push(this.addContactoDefault('Fuga de gas','53 53 57 63'));
  }

  addContactoDefault(nombre:string, numero:string):any{

    /* let contac = new ContactosEmergencia();
    contac.id = this.dataLocalService.getNumeroNegativo() * -1;
    contac.nombreCompleto =nombre;    
    contac.telefono = numero;
    return contac; */

  }

/*   construyeNombreEtiqueta(){
    return this.nombreEtiqueta = this.dataLocalService.idempresa+'_adeudo';    
  } */



/*   guardarContactoEmergencia(contactoEmergencia: ContactosEmergencia) {
    const existe = this.contactosEmergencia.find( con => con.id === contactoEmergencia.id );
    if(! existe ){
      contactoEmergencia.id = this.dataLocalService.getNumeroNegativo() * -1;
      this.contactosEmergencia.unshift(contactoEmergencia);
      this.storage.set(this.construyeNombreEtiqueta(), this.contactosEmergencia);
      this.dataLocalService.presentToast('Contacto agregado.')

    }
  } */
/* 
  borrarContactoEmergencia(contactoEmergencia: ContactosEmergencia){
    this.contactosEmergencia = this.contactosEmergencia.filter(con => con.id !== contactoEmergencia.id);
    this.storage.set(this.construyeNombreEtiqueta(), this.contactosEmergencia);
    this.dataLocalService.presentToast('Contacto borrado');
  } */

  async getContactosFromStorage(idEmpresa:number) {
    const contacts = await this.storage.get(idEmpresa+this.nombreEtiqueta);
    if (contacts) this.contactos = contacts;
    else this.contactos =[];    
  }

}
