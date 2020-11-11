export class Votacion{
    public idvotacion:number;
    public idempresa:number;
    public idagenteCreo:number;
    public fechaCreacion:Date;
    public titulo:string;
    public mensaje:string;
    public fechaTermina:Date;
    public horaTermina:Date;
    public isOpen:boolean;
    public aplicaOpcionesSI_NO:boolean;

    public preguntas: VotacionPregunta[];//Se crea en base de datos como jsonb

    constructor(){
        console.log('Iam in the constrictor of votaciones');
        this.fechaCreacion = new Date();
        this.aplicaOpcionesSI_NO = true;
        this.fechaTermina = new Date();
        this.horaTermina = new Date();   
        this.preguntas = new Array();
    } 
}

export class VotacionPregunta{

    public pregunta:string;    
    public opciones: VotacionPreguntaOpcion[];
    constructor(){
        console.log('I am in constructor of votacion pregunta');
        this.opciones = new Array();
    }

}

export class VotacionPreguntaOpcion{

    public opcion:string;
    constructor(){
        console.log('I am in constructor of votacion pregunta opcion');        
    }

}


