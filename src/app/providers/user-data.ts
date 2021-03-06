import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  empresa_id:number = 0;
  agente_id:number = 0;
  departamento_id:number=0;
  nombreDepartamento:string="";

  nameImageEmpresa ="";
  base64ImageEmpresa ="";
  nombreCompleto:string ="";
  administrador:boolean =false;

  aplicaAreasComunes:boolean = false;

  constructor(
    public storage: Storage,
    private toastCtrl: ToastController
  ) {

    this.setConfigUser();

   }

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  login(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  signup(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }

  recuperaIdEmpresa(){
    this.empresa_id =  JSON.parse(window.localStorage.getItem('empresaData')).id;//Recuperamos el id empresa de empresaData    
  }
  recuperaIdAgente(){
    this.agente_id = JSON.parse(window.localStorage.getItem('userDetails')).id;//Recuperamos el id agente de userDetails      
  }
  recuperaNombreCompleto(){
    this.nombreCompleto = JSON.parse(window.localStorage.getItem('userDetails')).nombreCompleto;//Recuperamos el nombre
  }

  getIdAgente(): number{    
    /* if(this.agente_id === 0){
      this.recuperaIdAgente();
    }
    return this.agente_id = JSON.parse(window.localStorage.getItem('userDetails')).id;; */
    return JSON.parse(window.localStorage.getItem('userDetails')).id;
  }

  getIdEmpresa(): number{
   /*  if(this.empresa_id === 0){
      this.recuperaIdEmpresa();
    } */
    return JSON.parse(window.localStorage.getItem('empresaData')).id;
  }

  

  

  getAplicaTorres():boolean{
    let data = JSON.parse(window.localStorage.getItem('empresaData'));
    if(data){
      return data.configuracionEmpresa?.aplicaTorres;
    }else{
      return false;
    }
    
  }

   getDataDireccionEmpresa():any{
    let empresa = JSON.parse(window.localStorage.getItem('empresaData'));
    if(empresa){
      return empresa.direccion;
    }
  }

  getNombreEmpresa():string{


    
    let empresa = JSON.parse(window.localStorage.getItem('empresaData'));
    if(empresa){
      return empresa.nombre;
    }

  }

  getNombreCompleto():string{
    /* if(this.nombreCompleto.length ===0){
      this.recuperaNombreCompleto();
    }
    return this.nombreCompleto; */
    return JSON.parse(window.localStorage.getItem('userDetails')).nombreCompleto;
  }



 async setConfigUser(){   
  console.log('setConfigUser');
   
  const data = await  this.storage.get('userFull');
    if (data) {
      /* console.log('data', JSON.stringify(data)); */      
      if(data.departamento){       
        if(data.departamento === 'RESIDENTE'){
          this.administrador = false;
        }else{
          this.administrador = true;
        }        
      }
      this.nombreCompleto = data.nombreCompleto;
      console.log("Administrador:->"+this.administrador+"<-");              
    }
  const dataDepto = await this.storage.get('departamentoData');  
  if(dataDepto){
    this.departamento_id = dataDepto.departamento;    
    this.nombreDepartamento = dataDepto.departamentoData.nombre;
  }
  console.log('departamento_id->'+this.departamento_id);
  console.log('nombreDepartamento->'+this.nombreDepartamento);
  

 }

 

 recibeDepartamento(depto:string){
   console.log("recibeDepartamento", depto);

   if(depto === 'RESIDENTE'){
    this.administrador = false;
   }else{
    this.administrador = true;
   }
   
   console.log('this.administrador,'+ this.administrador);
   

 }


  setConfigEmpresa(){
    console.log('setConfigEmpresa');
    this.retrieveBase64ToImageEmpresa();
/* 
    let empresa = JSON.parse(window.localStorage.getItem('empresaData'));
    if(empresa){
      let empresa_id_temp =  empresa.id;//Recuperamos el id empresa de empresaData    
      if(empresa_id_temp === 7) {
        this.nameImageEmpresa = "https://almacenamientonube.s3.us-west-1.amazonaws.com/Config/empresaId_7.png";
      } 
      else if (empresa_id_temp === 12 ) {
        this.nameImageEmpresa = "https://almacenamientonube.s3.us-west-1.amazonaws.com/Config/empresaId_12.png";
      }
    }   
    else {
      this.nameImageEmpresa = "https://almacenamientonube.s3.us-west-1.amazonaws.com/Config/empresaId_12.png";
    }   */

  }

  async retrieveBase64ToImageEmpresa(){    
    let empresa = await JSON.parse(window.localStorage.getItem('empresaData'));
    if(empresa){
      if(empresa.configuracionEmpresa){
        this.base64ImageEmpresa ='https://almacenamientonube.s3.us-west-1.amazonaws.com/'+empresa.configuracionEmpresa.logoFondoClaro.rutaS3;
        this.aplicaAreasComunes = empresa.configuracionEmpresa.aplicaReservarAreas;
      }      
    } 
    console.log('this.aplicaAreasComunes: '+ this.aplicaAreasComunes);
       
  }

  showToast(dataMessage: string, color_str?: string) {
    this.toastCtrl.create({
      message: dataMessage,
      duration: 2000,
      color: color_str ? color_str : null
    }).then((toastData) => {
      toastData.present();
    });
  }

}
