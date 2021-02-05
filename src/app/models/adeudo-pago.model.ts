export class AdeudoPago{
    public id:number;
    public idempresa:number;
    public idagenteCreo:number;
    public fechaCreacion:Date;
    public idagenteAdeudo:number;
    
    public concepto:string;
    public descripcion:string;
    public cantidad:number;    
    public fechaCubrir:Date;//Solo se deben mostrar mes y año en la vista    
    

    public todos:number;    
    public nombreAgenteAdeuda:string ;//para mostrarlo en el List

    
    constructor(){
        this.concepto ='Mantenimiento';
        this.fechaCreacion = new Date();
        this.fechaCubrir = new Date();
        this.descripcion='';
    }
}