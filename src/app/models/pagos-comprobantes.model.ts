export class PagosComprobantes{
    public idpagocomprobante:number;
    public idempresa:number;
    public idagenteCreo:number;
    public idstatus:number;//aqui el estatus podra ser cambiaodo por el usuario que autorize los pagos
    public fechaCreacion:Date;

    public anioPago:Date;
    public mesPago:string;//se agrega de esta manera para que pueda ser listada desde la vista

    
    public fechaAplicarPago:Date;//Se crea este campo en base de datos para sustituir anioPago y mesPago;

    public fechaAutorizo:Date;//
    public idagenteAutorizo:number;
    

    public formaPago:string;
    public montoOriginal:number;
    public montoPagado:number;
    public recargos:number;
    public imgs:string[];


    
    constructor(){
        console.log('In the constructor ot Pagos comprobantes');
        this.fechaCreacion = new Date();
        this.imgs = Array();
    }


}