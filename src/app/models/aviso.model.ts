export class Aviso{
    public idaviso:number;
    public idempresa:number;
    public idagenteCreo:number;
    /* public idagenteDestino:number; */
    public idAvisoOriginal:number;//guardar solo id
    public manzanaDestino: string;
    public titulo: string
    public mensaje: string;    
    public fechaCreacion: Date;
    public imgs:string[];//data

    public avisosRespuestaList:Aviso[];

    constructor(){

        console.log('Inicializando el arraryy');
        

        this.fechaCreacion = new Date();
        this.imgs = new Array();
        this.avisosRespuestaList = new Array();

    }
}