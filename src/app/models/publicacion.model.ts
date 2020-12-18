import { ArchivoVortexApp } from './archivo-vortex.model';
export class Publicacion{


    public id:number;
    public empresa:number;
    public agenteCreador:number;

    //Todo esto(Abajo) deberia ir dentro del json?
    public manzanaDestino: string;
    public titulo: string
    public descripcion: string;
    public fechaDeCreacion: Date;
    /* public imgs:string[];//data en tipo json */

    public data:ArchivoVortexApp[];

    public precio:number;
    public fechaVence:Date;
    /* public telefono:string; */

    //Todo esto(Arriba) deberia ir dentro del json?
    public tipo:string;//aviso, convocatoria, resolucion, anuncio

    public respuestas:Publicacion[];

    public estatus:boolean;

    constructor(){
        this.fechaDeCreacion = new Date();
        /* this.imgs = new Array(); */
        this.respuestas = new Array();
        this.fechaVence = new Date();
        this.estatus = true;        
        this.data = new Array();
    }
}