import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AreaComun } from '../../models/area-comun.model';
import { AreaComunService } from '../../services/area-comun.service';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  fechaSelected:Date;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  viewTitle: string;
  
  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: '',
    allDay: true
  };
 
  modalReady = false;
  idEmpresa: number;
  idAgente: number;
  idAreaSelected:number;
  //Para mis reservas
  @Input() areasComunesList: AreaComun[] = [];
  constructor(private modalCtrl: ModalController, 
              private areaComunService: AreaComunService,
              private userData: UserData) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
  }
 
 async save() {    
/*     console.log('this.fecha selected, '+ this.fechaSelected);


    let fechaIniciaR = new Date(this.fechaSelected);
    
    fechaIniciaR.setDate(this.fechaSelected.getDate() );
    fechaIniciaR.setHours(this.fechaSelected.getHours() + 3); */
    
    /* let numMes:string = "0";
    if(fechaTerminaEncuesta.getMonth() < 10){
      numMes = "0"+(fechaTerminaEncuesta.getMonth()+1); 
    }else{
      numMes = ""+(fechaTerminaEncuesta.getMonth()+1);
    }
    let dateStr = fechaTerminaEncuesta.getFullYear() + '-' + numMes + '-' + fechaTerminaEncuesta.getDate() + ' ' + fechaTerminaEncuesta.getHours() + ':' + fechaTerminaEncuesta.getMinutes();
    

    console.log('Antes de guardar',JSON.stringify(this.event.startTime));
    
    let fechaInicia = new Date(Date.parse(this.event.startTime));
    console.log('antes',fechaInicia); */
   /*  fechaInicia = new Date(
      Date.UTC(
        fechaInicia.getUTCFullYear(),
        fechaInicia.getUTCMonth(),
        fechaInicia.getUTCDate(),
        fechaInicia.getUTCHours()
      )
    ); */

  /*   console.log('despues',fechaIniciaR); */
    
    /* 
    fechaInicia.setUTCHours(fechaInicia.getHours() + 3 ); */

   /*  this.event.startTime = new Date(fechaIniciaR);

     */
    await this.crearRegistroReserva();
    this.modalCtrl.dismiss({event: this.event})
  }

  crearRegistroReserva(){

    let objData={
      event : this.event
    };
    
    const reservaAreaObj={
      empresa : this.idEmpresa,
      agenteCreador:this.idAgente,
      areaComun: this.idAreaSelected,      
      data:objData
    };

    console.log('objeto enviado: '+  JSON.stringify(reservaAreaObj));

    this.areaComunService.saveReserva(reservaAreaObj).subscribe(
      (data) => {
        console.log(data);
        if (data.status === 200) { 
          this.userData.showToast('guardado correctamente');          
        } else {          
          this.userData.showToast('No se logro guardar');
        }
      },
      (err) => {
        console.log(err);
        this.userData.showToast("Error: "+ err);       
      },
      () => {}
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
