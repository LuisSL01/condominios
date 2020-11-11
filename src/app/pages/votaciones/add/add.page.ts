import { Component, OnInit } from '@angular/core';
import { Votacion, VotacionPregunta, VotacionPreguntaOpcion } from '../../../models/votaciones.model';
import { DataLocalVotacionesService } from '../../../services/data-local-votaciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  votacion:Votacion = new Votacion();
  

  
  //se debe declarar un arreglo de preguntas
  //se debe declarar un arreglo de opciones
  votacionPreguntaArr:VotacionPregunta[];
  votacionPreguntaOpcionArr:VotacionPreguntaOpcion[];


  votacionPregunta:VotacionPregunta = new VotacionPregunta;
  votacionPreguntaOpcion:VotacionPreguntaOpcion = new VotacionPreguntaOpcion;



  constructor(private dataLocalVotacionesService: DataLocalVotacionesService,
              private router:Router) { }

  ngOnInit() {

    console.log('Inicializando los arreglos');
    
    this.votacionPreguntaArr = Array(2);
    this.votacionPreguntaOpcionArr= Array(2);

    console.log(this.votacionPreguntaArr);  
    console.log(this.votacionPreguntaOpcionArr);
  
  
  }


  cambioFecha(event){
    console.log('cambio fecha-->');
    this.votacion.fechaTermina = new Date(event.detail.value);    
  }

  cambioHora(event){
    console.log('cambio hora-->');
    this.votacion.horaTermina = new Date(event.detail.value);    
  }

  save(){

    console.log('save a new Votacion..');
    console.log(this.votacion);
    
    this.dataLocalVotacionesService.guardarVotacion(this.votacion);
    this.router.navigate(['/votaciones']);

  }

  addNewPregunta(){
    console.log('addNewPregunta()');
    
  }
  addNewOpcion(){
    console.log('addNewOpcion()');
  }

}
