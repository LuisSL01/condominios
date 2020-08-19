export class Anuncio{
    public idempresa:number;
    public idagenteCreo:number;
    public titulo:string;
    public descripcion:string;
    public precio:string;
    public telefono:string;
    public fechaVence:Date;
    
    public estatus:boolean;
    


    constructor(){
        
        
        console.log('in the constructor of anuncio');
        this.estatus = false;
        this.fechaVence = new Date(); //es necesario inic    ializarlo ya que si no arroja una excepcion       
        /* this.fechaVence = this.momentjs().format('YYYY-MM-DD HH:mm:ss ZZ').toDate(); */
        /* this.fechaVence = this.momentjs().toDate(); */
        /* this.fechaVence = moment; */
    }

}