export class Visita{
    public id:number;
    public empresa:number;
    public agenteCreador:number;    
    public fechaDeCreacion;

/*
    public nombreCompleto:string;        
    public tipoDeVisita:number;
    public duracionDeVisita:string;
    public fechaInicio:Date;
    public fechaTermino:Date;
    public conAcompaniantes:Boolean;
    public visitaDiaria:Boolean;
    public pathQR:string;    
    public diasVisita:number[];//Sunday is 0, Monday is 1, and so on.

*/ 
    public data:any;
    public uuid:string;
    public nombreAgenteCreador:string;

    constructor(){        
        /*
        this.conAcompaniantes = true;
        this.visitaDiaria = true;
        this.fechaInicio = new Date();
        this.fechaTermino = new Date();        
        this.diasVisita = new Array();
        */ 
        this.fechaDeCreacion = new Date();        
    }

}