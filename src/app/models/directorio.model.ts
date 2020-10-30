import { Direccion } from './direccion.model';
export class Directorio{
    public iddirectorio:number;
    public idempresa: number;
    public nombre:string;
    public apellidoP:string;
    public apellidoM:string;
    public nombrePrivada:string;
    public direccion:Direccion;

    constructor(){
        console.log('in the directorio constructor');        
        this.direccion = new Direccion();

    }
}