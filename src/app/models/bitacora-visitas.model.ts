import { ArchivoVortexApp } from './archivo-vortex.model';
export class BitacoraVisita{
    
    public id:number;
    public empresa:number;
    public agenteCreo:number;
    public fechaDeCreacion:Date;
    public visita:number;//Puede tener un id visita por que puede o no ser programada
    public nombreCompleto:string;
    public conAuto:boolean;
    public placa:string;
    public personasIngresan:number;
    public observaciones:string;
    public visitaProgramada:boolean;
    public imgs:string[];//data

    public files:ArchivoVortexApp;
    public data:any;

    public nombreAgenteVisita:string;
    
    constructor(){
        this.fechaDeCreacion = new Date();
        this.conAuto = false;
        this.visitaProgramada = true;
        this.imgs = new Array();
        this.files = new ArchivoVortexApp();
    }
    
}