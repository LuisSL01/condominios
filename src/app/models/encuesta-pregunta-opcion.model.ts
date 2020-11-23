
export class EncuestaPreguntaOpcion{

    public idopcion:number;
    public opcion:string;
    
    constructor(){  
        this.idopcion = this.getNumeroRandom() * -1;        
    }

    getNumeroRandom() {
        return Math.floor((Math.random() * (10000-1))+1);//NUmero entre 1 y 10000
    }

}