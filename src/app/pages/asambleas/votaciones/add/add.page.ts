import { Component, OnInit } from '@angular/core';
import { Encuesta } from '../../../../models/votaciones.model';
import { DataLocalVotacionesService } from '../../../../services/data-local-votaciones.service';
import { Router } from '@angular/router';
import { EncuestaPregunta } from '../../../../models/encuesta-pregunta.model';
import { EncuestaPreguntaOpcion } from '../../../../models/encuesta-pregunta-opcion.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  encuesta:Encuesta = new Encuesta();  

  constructor(private dataLocalVotacionesService: DataLocalVotacionesService,
              private router:Router) {

               }

  ngOnInit() {

  }

  agregarNuevaOpcion(){
    console.log('agregarNuevaOpcion');
    
    //Se añade una nueva opcion a la ultima pregunta
    this.encuesta.preguntas[ this.encuesta.preguntas.length - 1 ].opciones.push(new EncuestaPreguntaOpcion());
  }
  agregarNuevaPregunta(){
    console.log('agregarNuevaPregunta');
    let preguntaTemp:EncuestaPregunta=new EncuestaPregunta();
    preguntaTemp.opciones = Array();
    preguntaTemp.opciones.push(new EncuestaPreguntaOpcion());
    preguntaTemp.opciones.push(new EncuestaPreguntaOpcion()); 
    this.encuesta.preguntas.push(preguntaTemp);
  }
  eliminarOpcion(pregunta: EncuestaPregunta, encuestaPreguntaOpcion: EncuestaPreguntaOpcion){

    console.log('eliminarOpcion');
    pregunta.opciones = pregunta.opciones.filter(op => op.idopcion !== encuestaPreguntaOpcion.idopcion);
    console.log('opcion eliminada');
    
    

  }
  eliminarPregunta(pregunta: EncuestaPregunta){
    console.log('eliminarPregunta', pregunta);    
    this.encuesta.preguntas = this.encuesta.preguntas.filter(pre => pre.idpregunta !== pregunta.idpregunta);
    console.log('pregunta eliminada');
  }
  cambioFecha(event){
    this.encuesta.fechaTermina = new Date(event.detail.value);    
  }

  cambioHora(event){
    this.encuesta.horaTermina = new Date(event.detail.value);    
  }

  save(){    
    this.dataLocalVotacionesService.guardarVotacion(this.encuesta);
    this.router.navigate(['/asambleas/votaciones']);
    
  }
}
