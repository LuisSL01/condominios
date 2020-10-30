export class Gasto{
    public idgasto:number;
    public idempresa:number;
    public tipoGasto:string;
    public cantidad:number;
    public descripcion:string;
    public formaPago:string;
    public fechaGasto:Date;
    public idagenteCrea:number;
    public imgs:string[];

    constructor(){
        console.log('In the constructor of gasto');
        this.fechaGasto = new Date();
        this.imgs = Array();
    }
}