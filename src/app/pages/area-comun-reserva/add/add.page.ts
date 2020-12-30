import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserData } from '../../../providers/user-data';
import { AreaComunService } from '../../../services/area-comun.service';
import { Router } from '@angular/router';
import { AreaComun, AreaComunReserva, Reserva } from '../../../models/area-comun.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  createReserva= this.fb.group({    
    areaSelected: ["",[Validators.required]],
    fecha: [new Date()],
    diaCompleto:[true],
    horaInicia: ['08:00'],
    horaTermina: ['22:00'],
  });

  idEmpresa: number;
  idAgente: number;

  areaReserva:AreaComunReserva = new AreaComunReserva();

  reservaObj:Reserva = new Reserva();

  areasComunesList: AreaComun[] = [];

  constructor(  private fb: FormBuilder,
                private userData: UserData,
                private areaComunService: AreaComunService,
                private router: Router,) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
    console.log("this.idEmpresa: " + this.idEmpresa);
    console.log("this.idAgente: " + this.idAgente);
    this.buscarAreasComunes();    
  }
  

  buscarAreasComunes() {
    this.areaComunService.getAllAreasComunesByEmpresa(this.idEmpresa).subscribe((data) => {
      console.log('data: ' + data);
      if (data.status === 200) {
        this.areasComunesList = data.result; this.userData.showToast('recuperados correctamente');
      } else { this.recuperaRegistrosLocales(); }
    },
      (err) => { console.log(err); this.recuperaRegistrosLocales(); }
    );
  }

  async recuperaRegistrosLocales(){
    await this.areaComunService.getAreasComunesFromStorage(this.idEmpresa);                            
    this.areasComunesList = this.areaComunService.areasComunes;
    if(this.areasComunesList.length > 0){
      this.userData.showToast('Se recuperaron localmente');
      console.log('Se recuperaron localmente');
      
    }else{
      console.log('error al recuperar registros');      
      this.userData.showToast('error al recuperar registros');
    }
  }

  cambioFecha(event) {
    console.log("cambio fecha: ", event);
    this.reservaObj.fecha = new Date(event.detail.value);
  }

  cambioHoraInicia(event) {
    console.log("cambio hora inicia: ", event);
    /* this.reservaObj.horaInicia = new Date(event.detail.value); */
  }
  cambioHoraTermina(event) {
    console.log("cambio hora termina: ", event);
    /* this.reservaObj.horaTermina = new Date(event.detail.value); */
  }

  save() {
    console.log(this.createReserva.value);      

    console.log(this.reservaObj);


    let res:Reserva = new Reserva();
    res.fecha = this.createReserva.value.fecha;
    res.horaInicia = this.createReserva.value.horaInicia;
    res.horaTermina = this.createReserva.value.horaTermina;
    res.diaCompleto = this.createReserva.value.diaCompleto;
    console.log('res: '+ JSON.stringify(res));
    
    const reservaAreaObj={
      empresa : this.idEmpresa,
      agenteCreador:this.idAgente,
      areaComun: this.createReserva.value.areaSelected,
      reserva: [res]
    };

    console.log('objeto enviado: '+  JSON.stringify(reservaAreaObj));

    this.areaComunService.saveReserva(reservaAreaObj).subscribe(
      (data) => {
        console.log(data);
        if (data.status === 200) { 
          this.userData.showToast('anuncio registrado correctamente');
          this.router.navigate(["/area-comun-reserva"]);
        } else {          
          this.router.navigate(["/area-comun-reserva"]);
        }
      },
      (err) => {
        console.log(err);
        this.userData.showToast("Error: "+ err);
        
        this.router.navigate(["/area-comun-reserva"]);
       
      },
      () => {}
    );
  }

}
