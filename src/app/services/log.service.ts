import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response.model';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/index';
import { environment } from 'src/environments/environment';
import { UserData } from '../providers/user-data';
import { Base64 } from '@ionic-native/base64/ngx';
import { Archivo } from '../models/archivo-vortex.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  
  
  nameFile = 'log.txt';
  nameFolder = "ArmoniaResidencial/LOG/";
  archivoListo:boolean;
  baseUrl: string = environment.coreServiceBaseUrl;
  logContext: string = "/log"

  constructor(private file: File,
              private datePipe: DatePipe,
              private platform: Platform,              
              private http: HttpClient,
              private userData: UserData,
              private base64: Base64) { }

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
    
    const formattedDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    if (this.platform.is('android')) {
      if(this.archivoListo){
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
    } else {
      this.file.writeFile(this.file.documentsDirectory, this.nameFile, "["+formattedDate+"] ->" + mensaje + "\n",  {append: true, replace: false})
      .then(res=>{
        console.log('log registrado correctamente 1: ' + res);
      })
      .catch(err=>{
        console.log('catch, vamos a crear el file: ' + err);
        this.file.createFile(this.file.documentsDirectory, this.nameFile, true)
        .then(res=>{
          console.log('se ha creado el log.txt correctamente 1');
          this.file.writeFile(this.file.documentsDirectory, this.nameFile, "["+formattedDate+"] ->" + mensaje + "\n",  {append: true, replace: false})
          .then(res=>{
            console.log('log registrado correctamente 2: ' + res);
          })
          .catch(err=>{
            console.log('error al escribir log: ' + err);
          })          
        })  
        .catch(err=>{
          console.log('error al crear archivo txt 1: ' + err);
        })
      })
    }
  }

  compartirLog(){
    
    const nf = this.userData.getIdAgente() + "_" + this.userData.getNombreCompleto() + '_' + this.userData.getIdEmpresa() + '__' + this.datePipe.transform(new Date(), 'dd_MM_yyyy_HH_mm_ss') + '.txt';
    
    var path;
    if (this.platform.is('android')) {
      path = this.file.externalRootDirectory + '/' + this.nameFolder;
    } else {
      path = this.file.documentsDirectory + '/';
    }

    path += this.nameFile

    
    this.base64.encodeFile(path).then((base64File: string) => {
      base64File = base64File.substring(base64File.lastIndexOf(',') + 1, base64File.length)
      const files: Archivo[] = new Array();
      files.push(new Archivo(base64File, nf));
      const formData = new FormData();
      formData.append("file", JSON.stringify(files));
      this.saveLog(formData).subscribe(
        (data) => {
          console.log(data);
          if(data.status === 200){              
            this.reiniciarLog()
            alert('El Log se ha cargado correctamente.')      
          } else {
            alert('Problema al cargar el log.' + data.status)   
          }
        }, (err) =>{
          this.userData.showToast("Error C: " + err);
        }, () => {}
      );
    }, (err) => {
      alert("Error E: " + err);
    });
    
    /*
    this.file.readAsText(path, this.nameFile)
    .then((data) => {
      this.saveLog(data, nf).subscribe(
        (data) => {
          if(data.status === 200){              
            this.reiniciarLog()
            alert('El Log se ha cargado correctamente.')      
          } else {
            alert('Problema al cargar el log.' + data.status)   
          }
        }, (err) =>{
          alert("Error C: " + err);
        }, () => {}
      );

    }).catch((err) => {
      alert('no archivo: ' + err);
    }); 
    */

  }

  reiniciarLog(){
    if (this.platform.is('android')) {
      if(this.archivoListo){
        this.file.writeFile(this.file.externalRootDirectory, this.nameFolder + this.nameFile, "",  {replace: true})
        .then(res=>{ })
        .catch(err=>{
          this.creaCarpeta();      
        })  
      }
    } else {
      this.file.writeFile(this.file.documentsDirectory, this.nameFile, "",  {replace: true})
      .then(res=>{ })
      .catch(err=>{
        this.file.createFile(this.file.documentsDirectory, this.nameFile, true)
        .then(res=>{ })  
        .catch(err=>{ })
      })
    }
  }

  saveLog(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + this.logContext, data).pipe(share());
  }


}
