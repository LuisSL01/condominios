import { Injectable } from '@angular/core';
import { ContactosEmergencia } from '../models/contactos-emergencia.model';
import { DataLocalService } from './data-local.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalContactosEmergenciaService {

  contactosEmergencia: ContactosEmergencia[] = [];

  constructor(private dataLocalService: DataLocalService,
              private storage: Storage) {
    this.cargarContactosEmergencia();
  }



  guardarContactoEmergencia(contactoEmergencia: ContactosEmergencia) {
    const existe = this.contactosEmergencia.find( con => con.idcontacoEmergencia === contactoEmergencia.idcontacoEmergencia );
    if(! existe ){
      contactoEmergencia.idcontacoEmergencia = this.dataLocalService.getNumeroNegativo() * -1;
      this.contactosEmergencia.unshift(contactoEmergencia);
      this.storage.set('contactosemergencia', this.contactosEmergencia);
      this.dataLocalService.presentToast('Contacto agregado.')

    }
  }

  borrarContactoEmergencia(contactoEmergencia: ContactosEmergencia){
    this.contactosEmergencia = this.contactosEmergencia.filter(con => con.idcontacoEmergencia !== contactoEmergencia.idcontacoEmergencia);
    this.storage.set('contactosemergencia', this.contactosEmergencia);
    this.dataLocalService.presentToast('Contacto borrado');
  }

  async cargarContactosEmergencia() {
    const contacts = await this.storage.get('contactosemergencia')
    if (contacts) {
      this.contactosEmergencia = contacts;
    }
  }

}
