import { ArchivoVortexApp } from "./archivo-vortex.model";

export class AreaComun{
    public id:number;
    public empresa:number;
    public nombre:string;
    public data:any;
    public files:ArchivoVortexApp;
    public diasDisponibles:number[];//Sunday is 0, Monday is 1, and so on.

    public tiemposFijos:any[];
        
    constructor(){
        this.diasDisponibles = new Array();
        this.files = new ArchivoVortexApp();
        this.tiemposFijos = new Array();
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