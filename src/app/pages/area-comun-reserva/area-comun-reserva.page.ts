import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { AreaComunReserva, AreaComun } from '../../models/area-comun.model';
import { IonInfiniteScroll, ModalController, AlertController } from '@ionic/angular';
import { AreaComunService } from '../../services/area-comun.service';
import { UserData } from '../../providers/user-data';
import { CalendarComponent  } from 'ionic2-calendar';
import { CalendarPage } from '../calendar/calendar.page';
import { formatDate, DatePipe } from '@angular/common';
import { LoginPage } from '../login/login.page';

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

  areaComunSelected:number;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public areaComunService: AreaComunService,
              public userData:UserData,
              private datePipe: DatePipe,
              private alertCtrl: AlertController,
              @Inject(LOCALE_ID) private locale: string,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();

    /* this.getReservas(this.reservaPage, 10); */
    
  }
  ionViewDidEnter(){
    this.buscarAreasComunes();
  }

  cambioAreaComun(event){

    console.log('cambioAreaComun');
    console.log('event', event);
    this.areaComunSelected = event.detail.value;
    console.log('cambioAreaComun');
    this.reservasList =[];
    this.removeEvents();
    this.getReservasPorArea();
    console.log('Termino de recuperar los registros');    

    
  }
  procesaResultados(){
    console.log('procesaResultados');
    if (this.reservasList.length > 0 ) {
      for (let index = 0; index < this.reservasList.length; index++) {        
        let item = this.reservasList[index];        
        this.dibujaEnCalendario(item);
    }
      this.myCal.loadEvents();
    }
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
    console.log('onViewTitleChanged');
    
    this.viewTitle = title;
  }
 
  // Calendar event was clicked
  async onEventSelected(event) {
    
    // Use Angular date pipe for conversion

    const start  = this.datePipe.transform(event.startTime, 'h:mm a');
    const end  = this.datePipe.transform(event.endTime, 'h:mm a');
    /* let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale); */

    let btnsss:any=[];
    
    if(this.userData.administrador){
      btnsss = [{
        text: 'Volver',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, 
      {
        text: (event.autorizado?'Desautorizar':'Autorizar'),
        cssClass: 'primary',
        handler: () => {
          console.log('event.autorizado'+ event.autorizado);
          this.updateStatusRegistro(event.id, !event.autorizado);
        }
      },
      {
        text: 'Eliminar',        
        cssClass: 'primary',
        handler: () => {          
          this.deleteRegistro(event.id);          
        }
      }]

 
    }else{
      btnsss = [{
        text: 'Volver',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }]
    }
    const alert = await this.alertCtrl.create({
      header: "Titulo: " + event.title,
      subHeader: "Descripción: " + event.desc,
      message: event.nombreAgenteCreador +' Ha solicitado una reserva de: ' + start + '<br> A: ' + end,
      buttons: btnsss
    });
    alert.present();
  }

  async updateStatusRegistro(id, estatus){

    console.log('autorizarRegistro');
    const formData = new FormData();
    formData.append("id", JSON.stringify(id));
    formData.append("status", JSON.stringify(estatus));
    this.areaComunService.updateStatusReserva(formData).subscribe(
      (data) => {
        if (data.status === 200){
          this.userData.showToast('Estatus actualizado correctamente');
          this.reservasList =[];
          this.removeEvents();
          this.getReservasPorArea();
        } 
        else this.userData.showToast('Error al actualizar estatus');
      },
      (err) => {
        console.log("Error al actualizar agente" + err);
        this.userData.showToast('Error al actualizar estatus');
      }
    );

  }

  async deleteRegistro(id){
    console.log('delete registro..');    
    if(id){
      this.areaComunService.deleteReserva(id).subscribe(
        (data) => {
          if (data.status === 200) {
            this.userData.showToast('Registro eliminado correctamente');
            this.reservasList =[];
            this.removeEvents();
            this.getReservasPorArea();
          }
          else this.userData.showToast("Error al eliminar registro");
        },
        (err) => {
          console.log(err); this.userData.showToast("Error al eliminar registro");
        }
      );
    }
  }
 
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
    console.log('removiendo elementos');
    
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

      

      /* this.dibujaEnCalendario(result); */
      if (result.data && result.data.event) {
        this.reservasList =[];
        this.removeEvents();
        this.getReservasPorArea();
      } 
      
      /* this.dibujaEnCalendario(result);
      if (result.data && result.data.event) {
        this.myCal.loadEvents();
      }  */     
    });
  }

  dibujaEnCalendario(result){
    if (result.data && result.data.event) {
      /* console.log(result.data.event);         */
      let event = result.data.event;       
      //Datos de apoto para identificar el evento en el caledario     
      event.id = result.id;
      event.autorizado = result.autorizado;
      event.nombreAgenteCreador = result.nombreAgenteCreador;
      event.areaComun = result.areaComun;
      //Termina datos de apoyo

      if (event.allDay) {
        let start = new Date(event.startTime);//Se agrega para retransformar string a fecha

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
        let start = new Date(event.startTime);//Se agrega para retransformar string a fecha
        let end = new Date(event.endTime);//Se agrega para retransformar string a fecha
        
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
            end.getUTCFullYear(),
            end.getUTCMonth(),
            end.getUTCDate(),
            end.getUTCHours()
          )
        );
      }
      /* console.log(JSON.stringify(result.data.event));     */    
      this.eventSource.push(result.data.event);
      /* console.log(JSON.stringify(this.eventSource)); */
      
    }
  }

  

  //Termina metodos de calendarii
  async getReservasPorArea() {
    this.userData.showToast('buscando registros');
    await this.areaComunService.getReservasByAreaComun(this.areaComunSelected).subscribe((data) => {          
          console.log(data);        
          if (data.status === 200) {
             this.reservasList = data.result;            
            if(this.reservasList.length ===0){
              this.userData.showToast('No se encontraron registros del área seleccionada');
            }else{
              this.userData.showToast('se encontraron: '+ this.reservasList.length+' registros');
              this.procesaResultados();
            }
             
          } else {
            this.userData.showToast('error al recuperar registros del area seleccionada');  
          }
        },
        (err) => {
          this.userData.showToast('error al recuperar registros'+ err);
          console.log(err);          
        }
      );
  }

  
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
