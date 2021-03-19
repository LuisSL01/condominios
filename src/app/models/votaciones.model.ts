import { IterableDiffers } from '@angular/core';
import { EncuestaPreguntaOpcion } from './encuesta-pregunta-opcion.model';
import { EncuestaPregunta } from './encuesta-pregunta.model';
export class Encuesta{
    public id:number;
    public empresa:number;
    public agenteCreador:number;
    public fechaCreacion:Date;
    public titulo:string;
    public mensaje:string;
    public fechaTermina:Date;
    public horaTermina:Date;
    public abierto:boolean;
    public aplicaOpcionesSI_NO:boolean;

    public preguntas: EncuestaPregunta[];//Se crea en base de datos como jsonb

    pregunta = new EncuestaPregunta();

    public countRespuestas;


    
    
    
    constructor(){
        console.log('Iam in the constrictor of votaciones');
        this.fechaCreacion = new Date();
        this.aplicaOpcionesSI_NO = true;
        this.fechaTermina = new Date();
        this.horaTermina = new Date(); 
        
        this.preguntas = Array();
        this.pregunta.opciones = Array();
        this.pregunta.opciones.push(new EncuestaPreguntaOpcion());
        this.pregunta.opciones.push(new EncuestaPreguntaOpcion());

        this.preguntas.push(this.pregunta);

        console.log('terminando el cosntructor');


        


        
        
        
        
    } 
}



