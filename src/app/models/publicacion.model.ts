import { ArchivoVortexApp } from './archivo-vortex.model';
import { RespuestaPublicacion } from './respuesta-publicacion.model';
import { RespuestaApp} from './respuestaApp.model';
export class Publicacion{


    public id:number;
    public empresa:number;
    public agenteCreador:number;

    //Todo esto(Abajo) deberia ir dentro del json?
    public destinatario: string;
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

    public respuestas:RespuestaApp;

    public estatus:boolean;

    constructor(){
        this.fechaDeCreacion = new Date();
        /* this.imgs = new Array(); */        
        this.fechaVence = new Date();
        this.estatus = true;        
        this.data = new Array();
    }
}