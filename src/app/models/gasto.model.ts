import { ArchivoVortexApp } from './archivo-vortex.model';

export class Gasto{
    public id:number;
    public empresa:number;
    public tipoDeGasto:string;

    /*
    public cantidad:number;
    public descripcion:string;
    public formaPago:string;
    */
    public data: any;
    public files: ArchivoVortexApp[];

    public fechaDeCreacion:Date;
    public agenteCreador:number;

    constructor(){
        console.log('In the constructor of gasto');
        this.fechaDeCreacion = new Date();
    }
}