import { Component, OnInit } from '@angular/core';
import { Encuesta } from '../../../models/votaciones.model';
import { VotacionesService } from '../../../services/votaciones.service';
import { Router } from '@angular/router';
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


  constructor(private votacionService: VotacionesService,
    private router: Router,
    private userData: UserData) {

  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
    this.rellenaTime();
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
    let fechaTerminaEncuesta = new Date();
    console.log(fechaTerminaEncuesta);
    fechaTerminaEncuesta.setDate(fechaTerminaEncuesta.getDate() + this.diaSelected);
    fechaTerminaEncuesta.setHours(fechaTerminaEncuesta.getHours() + this.horaSelected);
    fechaTerminaEncuesta.setMinutes(fechaTerminaEncuesta.getMinutes() + this.minSelected);

    let dateStr = fechaTerminaEncuesta.getFullYear() + '-' + (fechaTerminaEncuesta.getMonth() + 1) + '-' + fechaTerminaEncuesta.getDate() + ' ' + fechaTerminaEncuesta.getHours() + ':' + fechaTerminaEncuesta.getMinutes();
    console.log(dateStr);

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
        this.userData.showToast('anuncio registrado correctamente');
        this.router.navigate(["/votaciones"]);
      } else this.userData.showToast('error al registrar encuesta');
    },
      (err) => {
        this.userData.showToast("Error: " + err);
      }, () => { }
    );

    /* this.dataLocalVotacionesService.guardarVotacion(this.encuesta);
    this.router.navigate(['/asambleas/votaciones']); */

  }
}
