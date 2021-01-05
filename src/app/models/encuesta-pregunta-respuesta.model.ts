
export class EncuestaPreguntaRespuesta {
  public id:number;  
  public idAgente: number;
  public idPregunta:number;
  public idOpcion: number;
  

  constructor() {
    this.id = this.getNumeroRandom();    
    
  }

  getNumeroRandom() {
    return Math.floor((Math.random() * (100000 - 1)) + 1);//NUmero entre 1 y 10000
  }

}
