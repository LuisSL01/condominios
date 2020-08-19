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
    this.contactosEmergencia.unshift(contactoEmergencia);
    this.storage.set('contactosemergencia', this.contactosEmergencia);
    this.dataLocalService.presentToast('Contacto de emergencia agregaado.')
  }

  async cargarContactosEmergencia() {
    const contacts = await this.storage.get('contactosemergencia')
    if (contacts) {
      this.contactosEmergencia = contacts;
    }
  }

}
