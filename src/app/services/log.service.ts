import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  
  
  nameFile = 'log.txt';
  nameFolder = "ArmoniaResidencial/LOG/";
  archivoListo:boolean;

  constructor(private file: File,
              private datePipe: DatePipe,
              private platform: Platform) {

                

               }
  async creaCarpeta(){
    try {      
      if (this.platform.is('android')) {      
          await this.file.checkDir(this.file.externalRootDirectory, this.nameFolder)
           .then(
             _ => this.file.checkFile(this.file.externalRootDirectory, this.nameFolder + this.nameFile)
               .then(_ => {     
                 this.archivoListo = true; 
                 /* this.file.writeFile(this.file.externalRootDirectory, this.nameFolder + this.nameFile, "Hola\n",  {append: true, replace: false}); */
               })          
               .catch(err =>
                 {
                   /* console.log("Entro en el catch");           */  
                   this.file.createFile(this.file.externalRootDirectory, this.nameFolder + this.nameFile, true).then(res=>{console.log('se ha creado el log.txt correctamente');
                   this.archivoListo = true;
                  }
                   
                   ).catch(err=>{
                    
                     /* console.log('error al crear archivo txt');  */
                   })   
                   //Ya podemos escribir sobre el archivo creado
                   //this.file.writeFile(this.file.externalRootDirectory, this.nameFolder + this.nameFile, "Hola\n",  {append: true, replace: false});
                 }
               )
               )
           .catch(
             err => this.file.createDir(this.file.externalRootDirectory, this.nameFolder, false)
               .then(response => {
                 /* console.log("El folder se ha creado correctamente");             */
                 this.file.createFile(this.file.externalRootDirectory, this.nameFolder + this.nameFile, true).then(res=>{console.log('se ha creado el log.txt correctamente');
                 this.archivoListo = true;
                }
                 ).catch(err=>{
                   /* console.log('error al crear archivo txt');  */
                 })  
                 //Ya podemos escribir sobre el archivo creado
               //this.file.writeFile(this.file.externalRootDirectory, this.nameFolder + this.nameFile, "Hola\n",  {append: true, replace: false});
               }).catch(err => {      
                 /* console.log('No fue posible crear el archivo ' + this.nameFolder + '. Err: ' + err.message); */
               })
           );
        
      }    
    } catch (error) {
      
    }
  }             

  escribeLog(mensaje:any){
    /* console.log('escribeLog '+ mensaje);
    console.log('escribeLogen  '+ mensaje); */
    if (this.platform.is('android')) {
      if(this.archivoListo){

        const formattedDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
        this.file.writeFile(this.file.externalRootDirectory, this.nameFolder + this.nameFile,"["+formattedDate+"] ->" + mensaje+"\n",  {append: true, replace: false}).
        then(res=>{
          /* console.log('log registrado correctamente'); */
        }
        ).catch(err=>{
          this.creaCarpeta();
          this.file.writeFile(this.file.externalRootDirectory, this.nameFolder + this.nameFile,"["+formattedDate+"] ->" + mensaje+"\n",  {append: true, replace: false}).
          then(res=>{
            /* console.log('log registrado correctamente'); */
          }
          ).catch(err=>{
            /* console.log('error al escribir log');           */   
          })          
        })  
      }
    }
  }
}
