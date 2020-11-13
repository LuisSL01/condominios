import { EncuestaPreguntaOpcion } from './encuesta-pregunta-opcion.model';

export class EncuestaPregunta{
    public idpregunta:number;
    public pregunta:string;    
    public opciones: EncuestaPreguntaOpcion[];


    constructor(){
        console.log('I am in constructor of votacion pregunta');
        this.pregunta ='';
        //La primera pregunta se inicializa con dos posibles opciones
        this.opciones = Array();
      /*   this.opciones.push(new EncuestaPreguntaOpcion());
        this.opciones.push(new EncuestaPreguntaOpcion());
        console.log('inicializando opciones: '+ this.opciones.length); */
        
    }

}
