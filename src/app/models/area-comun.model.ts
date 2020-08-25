export class AreaComun{
    public idareaComun:number;
    public idempresa:number;
    public nombre:string;
    public descripcion:string;
    public costo:number;
    public color:string;
    public todosLosDias:Boolean;
    public todasLasHoras:Boolean;
    public horaInicia:Date;
    public horaTermina:Date;
    public imgs:string[];

    constructor(){
        console.log('im in constructor new area comun');
        

        this.todosLosDias = true;
        this.todasLasHoras = true;
        this.horaInicia = new Date();
        this.horaTermina = new Date();
        this.imgs = Array();
        
        
    }


}