export class Visita{
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

    constructor(){
        this.fechaCreacion = new Date();
        this.conAcompaniantes = true;
        this.visitaDiaria = false;
        this.fechaInicio = new Date();
        this.fechaTermina = new Date();

        console.log('I am in constructor of votacion pregunta');
    }

}