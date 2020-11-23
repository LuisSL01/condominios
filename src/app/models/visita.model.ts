export class Visita{
    public idvisita:number;
    public idempresa:number;
    public nombre:string;
    public idagenteCreo:number;
    public fechaCreacion:Date;
    public tipoVisita:number;
    public duracion:string;
    public fechaInicio:Date;
    public fechaTermina:Date;
    public conAcompaniantes:Boolean;
    public visitaDiaria:Boolean;
    public pathQR:string;

    public diasVisitaSemana:number[];//Sunday is 0, Monday is 1, and so on.

    constructor(){
        this.fechaCreacion = new Date();
        this.conAcompaniantes = true;
        this.visitaDiaria = true;
        this.fechaInicio = new Date();
        this.fechaTermina = new Date();
        this.diasVisitaSemana = new Array();

        console.log('I am in constructor of votacion pregunta');
    }

}