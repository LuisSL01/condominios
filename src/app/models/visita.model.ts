export class Visita{
    public id:number;
    public empresa:number;
    public nombreCompleto:string;
    public idagenteCreo:number;    
    public tipoDeVisita:number;
    public duracionDeVisita:string;
    public fechaInicio:Date;
    public fechaTermino:Date;
    public conAcompaniantes:Boolean;
    public visitaDiaria:Boolean;
    public pathQR:string;
    public fechaDeCreacion;

    public diasVisita:number[];//Sunday is 0, Monday is 1, and so on.

    constructor(){        
        this.conAcompaniantes = true;
        this.visitaDiaria = true;
        this.fechaInicio = new Date();
        this.fechaTermino = new Date();
        this.fechaDeCreacion = new Date();
        this.diasVisita = new Array();
        console.log('I am in constructor of votacion pregunta');
    }

}