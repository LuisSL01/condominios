export class Gasto{
    public idempresa:number;
    public tipoGasto:string;
    public cantidad:number;
    public descripcion:string;
    public formaPago:string;
    public fechaGasto:Date;
    public idagenteCrea:number;

    constructor(){
        console.log('In the constructor of gasto');
        this.fechaGasto = new Date();
        
    }
}