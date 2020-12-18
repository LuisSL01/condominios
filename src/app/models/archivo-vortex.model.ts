export class ArchivoVortexApp{


    public path:string;
    public nombre:string;
    public rutaS3:string;
    public base64:string;
    
 
    constructor(_base64:string, _nombre:string){
        this.base64 = _base64;
        this.nombre = _nombre;
    }

}