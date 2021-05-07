import { ArchivoVortexApp } from './archivo-vortex.model';
export class Publicidad{
    public id:number;
    public empresa:number;
    public estatus:Boolean;
    public files:ArchivoVortexApp;
    public data:any;    

    constructor(){
        this.files = new ArchivoVortexApp();
    }
}