
export class EncuestaPreguntaOpcion{

    public id:number;
    public opcion:string;
    
    constructor(){  
        this.id = this.getNumeroRandom();        
    }

    getNumeroRandom() {
        return Math.floor((Math.random() * (100000-1))+1);//NUmero entre 1 y 10000
    }

}