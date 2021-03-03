import { ArchivoVortexApp } from "./archivo-vortex.model";

export class AreaComun{
    public id:number;
    public empresa:number;
    public nombre:string;
    public descripcion:string;
    public clasificacion:string;
    public costo:number;
    public codigoColor:string;
    public disponibleTodosDias:Boolean;
    public disponibleTodasHoras:Boolean;
    public horaInicia:Date;
    public horaTermina:Date;


    /* public imgs:string[]; */
    public data:ArchivoVortexApp;

    public diasDisponibles:number[];//Sunday is 0, Monday is 1, and so on.
    
        
    constructor(){
        console.log('im in constructor new area comun');
        this.disponibleTodosDias = true;
        this.disponibleTodasHoras = true;
        this.horaInicia = new Date();
        this.horaTermina = new Date();
        /* this.imgs = Array(); */
        this.diasDisponibles = new Array();
        this.data = new ArchivoVortexApp();
    }
}

export class AreaComunReserva{
    public id:number;
    public empresa:number;
    public areaComun:number;
    public nombre:string;

    public autorizado:boolean;
    
    public reserva:Reserva[];
    public nombreAreaComun:string;
    public nombreAgenteCreador:string;
    
    constructor(){
        this.reserva = new Array();
    }
}

export class Reserva{

    public fecha:Date;
    public diaCompleto:boolean;
    public horaInicia:string;
    public horaTermina:string;

    constructor(){
        console.log('inicilzando fechas de reserva');                
    }

}