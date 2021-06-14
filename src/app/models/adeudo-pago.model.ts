export class AdeudoPago{
    public id:number;
    public empresa:number;
    public agenteCreador:number;
    
    public agenteAdeuda:number;
    public data:any;
    public dataDepartamento:any;

    public todos:number;
    public nombreAgenteAdeuda:string ;//para mostrarlo en el List
    public nombreConcepto:string ;//para mostrarlo en el List
    public nombreStatus:string ;//para mostrarlo en el List
    public conceptoAdeudo:number;
    public fechaCubrir:Date;
    
    constructor(){
/*
        this.concepto ='Mantenimiento';
        this.fechaCreacion = new Date();
        this.fechaCubrir = new Date();
        this.descripcion='';
 */
    }
}