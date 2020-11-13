import { Component, OnInit } from '@angular/core';
import { Encuesta } from '../../../models/votaciones.model';
import { DataLocalVotacionesService } from '../../../services/data-local-votaciones.service';
import { Router } from '@angular/router';
import { EncuestaPregunta } from '../../../models/encuesta-pregunta.model';
import { EncuestaPreguntaOpcion } from '../../../models/encuesta-pregunta-opcion.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  encuesta:Encuesta = new Encuesta();
  
  preguntas:EncuestaPregunta[];
  opciones:EncuestaPreguntaOpcion[]; 
 

  pregunta:EncuestaPregunta;


  constructor(private dataLocalVotacionesService: DataLocalVotacionesService,
              private router:Router) {

                console.log('estoy en el constructor de addd page');
              
                
               }

  ngOnInit() {


    console.log('Inicializando los arreglos');
    this.pregunta = new EncuestaPregunta();
/* 
    this.encuesta.preguntas = Array();
    this.encuesta.preguntas.push(this.pregunta); */

    this.preguntas = Array();
    this.preguntas.push(this.pregunta);

    this.opciones= Array();
    this.opciones.push(new EncuestaPreguntaOpcion());
    this.opciones.push(new EncuestaPreguntaOpcion());

    console.log('this.encuestaspreguntas: '+this.preguntas);

    
  /*   this.pregunta.opciones.push(new EncuestaPreguntaOpcion());
    this.pregunta.opciones.push(new EncuestaPreguntaOpcion()); */

    console.log('terminando de añadir las opciones a las preguntas');
    
 
  }

  agregarNuevaOpcion(){
/* 
    console.log('agregarNuevaOpcion');
    let opcion = new EncuestaPreguntaOpcion();
    console.log('opcion: '+ opcion); */
    this.opciones.push(new EncuestaPreguntaOpcion());
 /*    this.pregunta.opciones.push(new EncuestaPreguntaOpcion()); */
  /*   console.log('despues de agregar opcion: '+ this.opciones); */
  }
  agregarNuevaPregunta(){
    console.log('agregarNuevaPregunta');
    /* this.pregunta = new EncuestaPregunta();
    
    this.preguntas.push(this.pregunta);

    console.log('inicizalizando la new pregunta');

    this.opciones= Array();
    this.opciones.push(new EncuestaPreguntaOpcion());
    this.opciones.push(new EncuestaPreguntaOpcion()); */

    let preguntaTemp:EncuestaPregunta=new EncuestaPregunta();
    preguntaTemp.opciones = Array();
    preguntaTemp.opciones.push(new EncuestaPreguntaOpcion());
    preguntaTemp.opciones.push(new EncuestaPreguntaOpcion()); 
    this.encuesta.preguntas.push(preguntaTemp);


  }

  

  cambioFecha(event){
    console.log('cambio fecha-->');
    this.encuesta.fechaTermina = new Date(event.detail.value);    
  }

  cambioHora(event){
    console.log('cambio hora-->');
    this.encuesta.horaTermina = new Date(event.detail.value);    
  }

  save(){

    console.log('save a new Votacion..');
    console.log(this.encuesta);
    
    this.dataLocalVotacionesService.guardarVotacion(this.encuesta);
    this.router.navigate(['/votaciones']);

  }


}
