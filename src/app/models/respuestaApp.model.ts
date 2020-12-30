import { RespuestaPublicacion } from "./respuesta-publicacion.model";

export class RespuestaApp {

    public respuestasPublicacion:RespuestaPublicacion[];

    constructor(){
        this.respuestasPublicacion = new Array();
    }
}