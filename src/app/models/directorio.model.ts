import { Direccion } from './direccion.model';
export class Directorio{
    public iddirectorio:number;
    public idempresa: number;

    public nombreCompleto:string;//Va a sustituir el nombre, apellido p y apellido m


    public nombre:string;
    public apellidoP:string;
    public apellidoM:string;

    /* public nombrePrivada:string; */
    public nombreManzana:string;//Sera ocupado por los avisos

    /* Todo esto se guardara */

    public direccion:string;
    public codigoPostal:string;
    public estadoProvinciaRegion:string;
    public ciudad:string;
    public colonia:string;
    public numeroTelefono:string;





    /* public direccion:Direccion;//Se guardara en BD como json */

    

    constructor(){
        console.log('in the directorio constructor');        
        /* this.direccion = new Direccion(); */

    }
}