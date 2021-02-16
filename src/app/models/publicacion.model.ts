import { ArchivoVortexApp } from './archivo-vortex.model';
import { RespuestaPublicacion } from './respuesta-publicacion.model';
import { RespuestaApp} from './respuestaApp.model';
export class Publicacion{


    public id:number;
    public empresa:number;
    public agenteCreador:number;
    public fechaDeCreacion: Date;
/*   se mete denrto de tipo json 
    public destinatario: string;
    public titulo: string
    public descripcion: string;    
    public precio:number;
    public fechaVence:Date;
 */
    public files:ArchivoVortexApp[];
    public data:any;    
    public tipo:string;//aviso, convocatoria, resolucion, anuncio    
    public respuestas:RespuestaApp;

    constructor(){
        this.fechaDeCreacion = new Date();        
        this.files = new Array();
    }
}