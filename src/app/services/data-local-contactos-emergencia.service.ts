import { Injectable } from '@angular/core';
import { ContactosEmergencia } from '../models/contactos-emergencia.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalContactosEmergenciaService {

  contactosEmergencia: ContactosEmergencia[] = [];
  nombreEtiquetaJson = "contactosemergencia";


  constructor(private dataLocalService: DataLocalService,
              private storage: Storage) {
    
                
    this.cargarContactosEmergencia();
    this.cargarContactosDefault();


  }

  cargarContactosDefault(){

    console.log('cargando contactos default...');
    
    /* let contac = new ContactosEmergencia();
    contac.nombre ='Emergencias';
    contac.celular ='911'; */

    this.contactosEmergencia.push(this.addContactoDefault('Emergencias','911'));
    this.contactosEmergencia.push(this.addContactoDefault('Capufe','074'));
    this.contactosEmergencia.push(this.addContactoDefault('Ángeles Verdes','078'));
    this.contactosEmergencia.push(this.addContactoDefault('Cruz Roja','53 95 11 11'));
    this.contactosEmergencia.push(this.addContactoDefault('LOCATEL','56 58 11 11'));
    this.contactosEmergencia.push(this.addContactoDefault('Protección Civil','56 83 22 22'));
    this.contactosEmergencia.push(this.addContactoDefault('Denuncia Anónima','089'));
    this.contactosEmergencia.push(this.addContactoDefault('Incendios Forestales','55 54 06 12'));
    this.contactosEmergencia.push(this.addContactoDefault('Policía Federal','088'));
    this.contactosEmergencia.push(this.addContactoDefault('Fuga de agua','56 54 32 10'));
    this.contactosEmergencia.push(this.addContactoDefault('Fuga de gas','53 53 57 63'));



  }

  addContactoDefault(nombre:string, numero:string):any
  {
    let contac = new ContactosEmergencia();
    contac.idcontacoEmergencia = this.dataLocalService.getNumeroNegativo() * -1;
    contac.nombre =nombre;
    
    contac.telefono = numero;
    return contac;

  }

  construyeNombreEtiqueta(){
    return this.nombreEtiquetaJson = this.dataLocalService.idempresa + "_contactosemergencia";
  }



  guardarContactoEmergencia(contactoEmergencia: ContactosEmergencia) {
    const existe = this.contactosEmergencia.find( con => con.idcontacoEmergencia === contactoEmergencia.idcontacoEmergencia );
    if(! existe ){
      contactoEmergencia.idcontacoEmergencia = this.dataLocalService.getNumeroNegativo() * -1;
      this.contactosEmergencia.unshift(contactoEmergencia);
      this.storage.set(this.construyeNombreEtiqueta(), this.contactosEmergencia);
      this.dataLocalService.presentToast('Contacto agregado.')

    }
  }

  borrarContactoEmergencia(contactoEmergencia: ContactosEmergencia){
    this.contactosEmergencia = this.contactosEmergencia.filter(con => con.idcontacoEmergencia !== contactoEmergencia.idcontacoEmergencia);
    this.storage.set(this.construyeNombreEtiqueta(), this.contactosEmergencia);
    this.dataLocalService.presentToast('Contacto borrado');
  }

  async cargarContactosEmergencia() {
    const contacts = await this.storage.get(this.construyeNombreEtiqueta());
    if (contacts) {
      this.contactosEmergencia = contacts;
    }
  }

}
