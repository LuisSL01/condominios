import { EncuestaPreguntaOpcion } from './encuesta-pregunta-opcion.model';
import { EncuestaPreguntaRespuesta } from './encuesta-pregunta-respuesta.model';

export class EncuestaPregunta {
  public id: number;
  public pregunta: string;
  public opciones: EncuestaPreguntaOpcion[];
  public respuestas:EncuestaPreguntaRespuesta[];



  constructor() {
    this.id = this.getNumeroRandom();
    this.pregunta = '';
    this.opciones = Array();
    this.respuestas = Array();
  }

  getNumeroRandom() {
    return Math.floor((Math.random() * (100000 - 1)) + 1);//NUmero entre 1 y 10000
  }

}
