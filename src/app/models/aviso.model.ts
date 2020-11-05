export class Aviso{
    public idaviso:number;
    public idempresa:number;
    public idagenteCreo:number;
    public idagenteDestino:number;
    public idAvisoOriginal:number;//guardar solo id
    public destinatario: string;
    public titulo: string
    public mensaje: string;    
    public fechaCreacion: Date;
    public imgs:string[];

    public avisosRespuesta:Aviso[];

    constructor(){

        console.log('Inicializando el arraryy');
        

        this.fechaCreacion = new Date();
        this.imgs = new Array();
        this.avisosRespuesta = new Array();

    }
}