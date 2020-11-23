export class BitacoraVisita{
    public idbitacoraVisita:number;
    public idempresa:number;
    public idagenteCreo:number;
    public fechaCreacion:Date;
    public idvisita:number;//Puede tener un id visita por que puede o no ser programada
    public nombreCompleto:string;
    public conAuto:boolean;
    public placa:string;
    public personasQueIngresan:number;
    public observaciones:string;
    public visitaProgramada:boolean;
    public imgs:string[];//data
    
    constructor(){
        this.fechaCreacion = new Date();
        this.conAuto = false;
        this.visitaProgramada = true;
        this.imgs = new Array();
    }
    
}