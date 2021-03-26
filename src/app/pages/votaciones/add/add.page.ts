import { Component, OnInit } from '@angular/core';
import { Encuesta } from '../../../models/votaciones.model';
import { VotacionesService } from '../../../services/votaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EncuestaPregunta } from '../../../models/encuesta-pregunta.model';
import { EncuestaPreguntaOpcion } from '../../../models/encuesta-pregunta-opcion.model';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  encuesta: Encuesta = new Encuesta();

  dias: number[] = [];
  horas: number[] = [];
  minutos: number[] = [];

  diaSelected: number = 1;
  horaSelected: number = 0;
  minSelected: number = 0 ;

  idEmpresa: number;
  idAgente: number;
  edit:boolean = false;


  constructor(private votacionService: VotacionesService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private userData: UserData) {

  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();

    this.encuesta = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));    
    if(this.encuesta != null) this.prepareEdit();
    else this.encuesta = new Encuesta();
    this.rellenaTime();
  }

  prepareEdit(){
    console.log('prepareEdit');
    this.edit = true;
  }

  rellenaTime() {
    for (let index = 1; index < 8; index++) {
      this.dias.push(index);
    }
    for (let index = 0; index < 24; index++) {
      this.horas.push(index);
    }
    for (let index = 0; index < 60; index++) {
      this.minutos.push(index);
    }
  }

  agregarNuevaOpcion() {
    console.log('agregarNuevaOpcion');

    //Se añade una nueva opcion a la ultima pregunta
    this.encuesta.preguntas[this.encuesta.preguntas.length - 1].opciones.push(new EncuestaPreguntaOpcion());
  }
  agregarNuevaPregunta() {
    console.log('agregarNuevaPregunta');
    let preguntaTemp: EncuestaPregunta = new EncuestaPregunta();
    preguntaTemp.opciones = Array();
    preguntaTemp.opciones.push(new EncuestaPreguntaOpcion());
    preguntaTemp.opciones.push(new EncuestaPreguntaOpcion());
    this.encuesta.preguntas.push(preguntaTemp);
  }
  eliminarOpcion(pregunta: EncuestaPregunta, encuestaPreguntaOpcion: EncuestaPreguntaOpcion) {

    console.log('eliminarOpcion');
    pregunta.opciones = pregunta.opciones.filter(op => op.id !== encuestaPreguntaOpcion.id);
    console.log('opcion eliminada');



  }
  eliminarPregunta(pregunta: EncuestaPregunta) {
    console.log('eliminarPregunta', pregunta);
    this.encuesta.preguntas = this.encuesta.preguntas.filter(pre => pre.id !== pregunta.id);
    console.log('pregunta eliminada');
  }
  cambioFecha(event) {
    this.encuesta.fechaTermina = new Date(event.detail.value);
  }

  cambioHora(event) {
    this.encuesta.horaTermina = new Date(event.detail.value);
  }

  cambioDiaDuracion(event) {
    this.diaSelected = event.detail.value;
  }
  cambioHoraDuracion(event) {
    this.horaSelected = event.detail.value;
  }
  cambioMinDuracion(event) {
    this.minSelected = event.detail.value;
  }

  save() {
    if(this.edit) this.editar();
    else this.nuevo();
  }

  nuevo(){

    let fechaTerminaEncuesta = new Date();
    console.log(fechaTerminaEncuesta);
    fechaTerminaEncuesta.setDate(fechaTerminaEncuesta.getDate() + this.diaSelected);
    fechaTerminaEncuesta.setHours(fechaTerminaEncuesta.getHours() + this.horaSelected);
    fechaTerminaEncuesta.setMinutes(fechaTerminaEncuesta.getMinutes() + this.minSelected);
    let numMes:string = "0";
    if(fechaTerminaEncuesta.getMonth() < 10){
      numMes = "0"+(fechaTerminaEncuesta.getMonth()+1); 
    }else{
      numMes = ""+(fechaTerminaEncuesta.getMonth()+1);
    }
    let dateStr = fechaTerminaEncuesta.getFullYear() + '-' + numMes + '-' + fechaTerminaEncuesta.getDate() + ' ' + fechaTerminaEncuesta.getHours() + ':' + fechaTerminaEncuesta.getMinutes();
    
    const votacionObj = {
      empresa: this.idEmpresa,
      agenteCreador: this.idAgente,
      titulo: this.encuesta.titulo,
      mensaje: this.encuesta.mensaje,
      horaTermina: '00:30',
      fechaTermina: dateStr,
      preguntas:this.encuesta.preguntas
    };
    console.log('objeto enviado: ' + JSON.stringify(votacionObj));
    this.votacionService.save(votacionObj).subscribe((data) => {
      console.log(data);
      if (data.status === 200) {
        this.router.navigate(['/votaciones', { item: true}]); 
      } else this.userData.showToast('error al registrar encuesta');
    },
      (err) => {
        this.userData.showToast("Error: " + err);
      }, () => { }
    );
  }
  editar(){
      
    let fechaTerminaEncuesta = new Date();    
    fechaTerminaEncuesta.setDate(fechaTerminaEncuesta.getDate() + this.diaSelected);
    fechaTerminaEncuesta.setHours(fechaTerminaEncuesta.getHours() + this.horaSelected);
    fechaTerminaEncuesta.setMinutes(fechaTerminaEncuesta.getMinutes() + this.minSelected);
    let numMes:string = "0";
    if(fechaTerminaEncuesta.getMonth() < 10){
      numMes = "0"+(fechaTerminaEncuesta.getMonth()+1); 
    }else{
      numMes = ""+(fechaTerminaEncuesta.getMonth()+1);
    }
    let dateStr = fechaTerminaEncuesta.getFullYear() + '-' + numMes + '-' + fechaTerminaEncuesta.getDate() + ' ' + fechaTerminaEncuesta.getHours() + ':' + fechaTerminaEncuesta.getMinutes();
    console.log(dateStr);

    const votacionObj = {
      titulo: this.encuesta.titulo,
      mensaje: this.encuesta.mensaje,      
      fechaTermina: dateStr
    };
    console.log('objeto enviado: ' + JSON.stringify(votacionObj));
    this.votacionService.update(this.encuesta.id, votacionObj).subscribe((data) => {
      console.log(data);
      if (data.status === 200) {
        this.router.navigate(['/votaciones', { item: true}]); 
      } else this.userData.showToast('error al editar encuesta');
    },
      (err) => {
        this.userData.showToast("Error: " + err);
      }, () => { }
    );
  }
}
