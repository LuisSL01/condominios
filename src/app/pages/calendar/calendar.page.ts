import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AreaComun } from '../../models/area-comun.model';
import { AreaComunService } from '../../services/area-comun.service';
import { UserData } from '../../providers/user-data';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  fechaSelected: Date;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  viewTitle: string;

  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: null,
    allDay: false
  };

  eventHelp = {
    horaInicia: null,
    horaTermina: null
  }

  modalReady = false;
  idEmpresa: number;
  idAgente: number;
  idAreaSelected: number;
  //Para mis reservas
  @Input() areasComunesList: AreaComun[] = [];

  areaComunSelected:AreaComun;
  mostrarOpcionesTiempo:boolean = false;
  tiempoFijoSelected:any;

  constructor(private modalCtrl: ModalController,
    private areaComunService: AreaComunService,
    private ui:UiServiceService,
    private userData: UserData) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
  }

  cambioAreaComun(event){    
    this.areaComunSelected = event.detail.value;    
    this.idAreaSelected = this.areaComunSelected.id;
    if(this.areaComunSelected.tiemposFijos){
      this.mostrarOpcionesTiempo = (this.areaComunSelected.tiemposFijos.length > 0);    
    }else
      this.mostrarOpcionesTiempo = false;
    
  }

  cambioTiempoSelected(event){    
    this.tiempoFijoSelected = event.detail.value;
    this.cambioHoraInicia();
  }

  cambioHoraInicia(){
    if(this.mostrarOpcionesTiempo){
      if(this.eventHelp.horaInicia){
          console.log(this.eventHelp.horaInicia);    
          console.log('debo sumar las horas que estan seleccionadas en la opcion');
          let fechaTermina: Date = new Date(this.eventHelp.horaInicia);        
          fechaTermina.setHours(new Date(this.eventHelp.horaInicia).getHours() + this.tiempoFijoSelected.horas);
          fechaTermina.setMinutes(new Date(this.eventHelp.horaInicia).getMinutes() + this.tiempoFijoSelected.minutos);  
          console.log('fechaTermina', fechaTermina);

          this.eventHelp.horaTermina = (new Date(fechaTermina)).toISOString();

      }
    }    
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;
    }, 0);
  }



  async save() {
    console.log('en save');

    console.log(this.event);
    console.log(this.eventHelp);

    let fechaIni: Date = new Date(this.event.startTime);    
    fechaIni.setHours(new Date(this.eventHelp.horaInicia).getHours());
    fechaIni.setMinutes(new Date(this.eventHelp.horaInicia).getMinutes());
    
    let fechaTermina: Date = new Date(this.event.startTime);    
    fechaTermina.setHours(new Date(this.eventHelp.horaTermina).getHours());
    fechaTermina.setMinutes(new Date(this.eventHelp.horaTermina).getMinutes());

    
    this.event.startTime = fechaIni;
    this.event.endTime = fechaTermina;
    await this.crearRegistroReserva();

  }

  crearRegistroReserva() {
    if (this.idAreaSelected > 0) {

    } else {
      this.userData.showToast("Debe seleccionar el área a reservar");
      return;
    }

    let objData = {
      event: this.event
    };

    const reservaAreaObj = {
      empresa: this.idEmpresa,
      agenteCreador: this.idAgente,
      areaComun: this.idAreaSelected,
      autorizado: false,
      data: objData
    };

    console.log('objeto enviado: ' + JSON.stringify(reservaAreaObj));
    this.ui.presentLoading();
    this.areaComunService.saveReserva(reservaAreaObj).subscribe(
      (data) => {
        this.ui.dismissLoading();
        console.log(data);
        if (data.status === 200) {
          this.userData.showToast('guardado correctamente');
          this.modalCtrl.dismiss({ event: this.event });
        } else {
          this.userData.showToast('No se logro guardar');
        }
      },
      (err) => {
        console.log(err);
        this.ui.dismissLoading();
        this.userData.showToast("Error: " + err);
      },
      () => { }
    );
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    console.log('ev', ev);
    this.fechaSelected = ev.selectedTime;
    this.event.startTime = new Date(ev.selectedTime);
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
