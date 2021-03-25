import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaComunReserva, AreaComun } from '../../models/area-comun.model';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { AreaComunService } from '../../services/area-comun.service';
import { UserData } from '../../providers/user-data';
import { CalendarComponent  } from 'ionic2-calendar';
import { CalendarPage } from '../calendar/calendar.page';

@Component({
  selector: 'app-area-comun-reserva',
  templateUrl: './area-comun-reserva.page.html',
  styleUrls: ['./area-comun-reserva.page.scss'],
})
export class AreaComunReservaPage implements OnInit {
//Para el calendario
eventSource = [];
  viewTitle: string;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
//Termina bloque de calendario



  public reservasList:any[]=[];
  areasComunesList: AreaComun[] = [];

  idEmpresa: number;
  filters: any;
  reservaPage: number = 0;

  nombreEtiqueta = "_areas-comunes";
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public areaComunService: AreaComunService,
              private userData:UserData,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();

    this.getReservas(this.reservaPage, 10);
    
  }
  ionViewDidEnter(){
    this.buscarAreasComunes();
  }

  buscarAreasComunes() {
    this.areaComunService.getAllAreasComunesByEmpresa(this.idEmpresa).subscribe((data) => {
      console.log('data: ' + data);
      if (data.status === 200) {
        this.areasComunesList = data.result; this.userData.showToast('recuperados correctamente');
      } else {       
      }
    },
      (err) => { console.log(err);         
        }
    );
  }


  //Metodos de calendario
  
  // Change current month/week/day
  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }
 
  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  // Calendar event was clicked
 /*  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
 
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK'],
    });
    alert.present();
  } */
 
  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
        });
      }
    }
    this.eventSource = events;
  }
 
  removeEvents() {
    this.eventSource = [];
  }

  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalendarPage,
      componentProps:{
        areasComunesList: this.areasComunesList
      },
      cssClass: 'cal-modal',
      backdropDismiss: false
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {

        console.log('recibiendo..', JSON.stringify(result.data.event));
        

        let event = result.data.event;
        
        if (event.allDay) {
          let start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()              
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }else{
          let start = event.startTime;
          
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate(),
              start.getUTCHours()
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate(),
              start.getUTCHours()
            )
          );
        }

        console.log(JSON.stringify(result.data.event));
        
        this.eventSource.push(result.data.event);

        console.log(JSON.stringify(this.eventSource));

        
        this.myCal.loadEvents();
      }
    });
  }

  

  //Termina metodos de calendarii

  
  getReservas(page: number, size: number, eventInfinite?, eventRefresh?) {
    this.areaComunService.getAreaComunReservas(this.idEmpresa, page, size, this.filters)
      .subscribe(
        (data) => {          
          if (data.status === 200) {
            if(eventRefresh){
              this.reservasList = [];
            }
            if (eventInfinite) {
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }
            this.reservasList.push(...data.result.content)            
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
    this.reservaPage ++;
    this.getReservas(this.reservaPage, 10, event);
  }

  doRefresh(event) {
    this.reservaPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getReservas(this.reservaPage, 10, null, event);
  }
  
  buscar(event){
  
  }

}
