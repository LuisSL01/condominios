import { ArchivoVortexApp } from "./archivo-vortex.model";

export class PagosComprobantes{
    public id:number;
    public empresa:number;
    public agenteCreador:number;
    public status:number;//aqui el estatus podra ser cambiaodo por el usuario que autorize los pagos

    /* public anioPago:Date;
    public mesPago:string;//se agrega de esta manera para que pueda ser listada desde la vista    
    public fechaAplicarPago:Date;//Se crea este campo en base de datos para sustituir anioPago y mesPago; */

    /* public fechaAutorizo:Date;//
    public idagenteAutorizo:number; */


    /* public formaPago:string;
    public importeOriginal:number;
    public importePagado:number;
    public recargos:number; */

    public files:ArchivoVortexApp;
    public adeudo:number;
    public fechaAutorizo:Date;
    public agenteAutoriza:number;

    //variables apoyo
    public nombreAgenteAdeudo:string ;
	public cantidadAdeudo:number;
	public nombreEstatus:string;
    public data: any;
    public infoAdeudo: any;
    public infoDepartamento: any;
    public nombreConceptoAdeudo:string;
    

    constructor(){
        this.files = new ArchivoVortexApp();
        console.log('In the constructor ot Pagos comprobantes');

        /* this.imgs = Array(); */
    }


}