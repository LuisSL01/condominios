
export class EncuestaPreguntaRespuesta {
  public idrespuesta:number;  
  public idagente: number;
  public idopcion: number;
  public fechaCreacion:Date;

  constructor() {
    this.idrespuesta = this.getNumeroRandom() * -1;    
    this.fechaCreacion = new Date();
  }

  getNumeroRandom() {
    return Math.floor((Math.random() * (10000 - 1)) + 1);//NUmero entre 1 y 10000
  }

}
