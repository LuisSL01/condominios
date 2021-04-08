import { Component, OnInit } from '@angular/core';

import { ConvocatoriaService } from '../../../services/convocatoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Publicacion } from '../../../models/publicacion.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AgenteService } from '../../../services/agente.service';
import { UserData } from '../../../providers/user-data';
import { Platform } from '@ionic/angular';
import { IOSFilePicker } from '@ionic-native/file-picker/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Archivo } from '../../../models/archivo-vortex.model';
import { FileChooser } from '@ionic-native/file-chooser/ngx';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  convocatoria:Publicacion = new Publicacion();
  manzanas: any[] =  [];
  files: Archivo[] = new Array();
  createConvocatoria = this.fb.group({

    data: this.fb.group({
      destinatario: ["todos", [Validators.required]],
      titulo: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      fecha: [new Date()],
    }),  

    tipo: ["CONVOCATORIA"],
  });

  idEmpresa: number;
  idAgente: number;
  edit:boolean = false;
  convocatoriaChangesForm: FormGroup;
  
  constructor(private convocatoriaService : ConvocatoriaService,
              private agenteService: AgenteService,
              private router:Router,
              private fb: FormBuilder,
              private filePicker: IOSFilePicker,
              private platform: Platform,
              private filePath: FilePath,
              public activatedRoute: ActivatedRoute,
              private base64: Base64,
              private fileChooser: FileChooser,
              private userData: UserData) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
    /* this.buscarManzanas(); */

    this.convocatoria = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));    
    if(this.convocatoria != null) this.prepareEdit();
    else this.convocatoria = new Publicacion();
  }

  prepareEdit(){
    console.log('prepareEdit');
    this.edit = true;
    this.createConvocatoria = this.fb.group({
      data: this.fb.group({
        destinatario: ["todos"],
        titulo: [this.convocatoria.data.titulo],
        descripcion: [this.convocatoria.data.descripcion],
        fecha: [this.convocatoria.data.fecha],
      }),
      tipo: ["CONVOCATORIA"],
    });
  }

  cargarPdf(){
    
    if (this.platform.is('ios')) {
      this.filePicker.pickFile()
        .then((uri) => {
          this.filePath.resolveNativePath(uri)
          .then(filePath => {
            this.base64.encodeFile(filePath).then((base64File: string) => {
              base64File = base64File.substring(base64File.lastIndexOf(',') + 1, base64File.length)              
              this.files.push(new Archivo(base64File, "convocatoria_" + this.idEmpresa + ".pdf"));
              this.userData.showToast("procesado correctamente...");
            }, (err) => {
              alert("Error E: " + err);
            });
          })
          .catch(err => alert(err));
        })
        .catch(err => alert('Error F' + err));
    } else {
      console.log('is in android');
      this.fileChooser.open({ "mime": "application/pdf" })
        .then((uri) =>{
          this.filePath.resolveNativePath(uri)
          .then(filePath => {
            this.base64.encodeFile(filePath).then((base64File: string) => {
              base64File = base64File.substring(base64File.lastIndexOf(',') + 1, base64File.length)              
              this.files.push(new Archivo(base64File, "convocatoria_" + this.idEmpresa + ".pdf"));
              this.userData.showToast("procesado correctamente...");                  
            }, (err) => {
              alert("Error E: " + err);
            });
          })
          .catch(err => alert(err));
          }, (err) => {}
        ).catch(e => alert('Error F' + e));
    }
  }

  buscarManzanas(){  
    this.agenteService.getManzanas(this.idEmpresa).subscribe((data) => {
        if (data.status === 200) {
          this.userData.showToast('Manzanas recuperadas correctamente');       
          this.manzanas = data.result;
        } else this.userData.showToast('Error al recuperar manzanas');              
      },
      (err) => {
        console.log(err);
      }
    );
    }
  save(){
    if(this.edit) this.editar();
    else this.nuevo();   
  }

  nuevo(){    
    const resolucionObj ={
      empresa:this.idEmpresa,
      agenteCreador:this.idAgente,
      data: this.createConvocatoria.value.data,
      tipo: this.createConvocatoria.value.tipo,
      files: {
        archivos: [],
      }      
    };
    /* console.log('files',JSON.stringify(this.files)); */
    const formData = new FormData(); 
    formData.append("data", JSON.stringify(resolucionObj));
    formData.append("file", JSON.stringify(this.files));
    

    this.convocatoriaService.saveWithPDF(formData).subscribe((data) => {
        if (data.status === 200) {
          this.createConvocatoria.reset();
          this.userData.showToast('convocatoria creada correctamente');                    
          this.router.navigate(['/convocatorias', { item: true}]);
          
        } else this.userData.showToast('error al guardar');
      },
      (err) => {
        console.log(err);
        this.userData.showToast('error al guardar');       
      },() => {}
    );
  }
  editar(){

    console.log('editar()...');    
    this.convocatoriaChangesForm = this.fb.group({});
    this.getDirtyFields();
    console.log('convocatoriaChangesForm', JSON.stringify(this.convocatoriaChangesForm.value));

    this.convocatoriaService.update(this.convocatoria.id, this.convocatoriaChangesForm.value).subscribe(data => {
      if (data.status === 200) {
        this.createConvocatoria.reset();           
        this.router.navigate(['/convocatorias', { item: true}]);
      } else {
        this.userData.showToast('Error al editar registro, llego otro status');
      }
    }, err => {
      console.log(err);this.userData.showToast("Error: "+ err);
    },
      () => {
      });
  }

  getDirtyFields() {
    
    Object.keys(this.createConvocatoria['controls'].data['controls']).forEach(key => {
      if (this.createConvocatoria.get('data').get(key).dirty) {
        this.convocatoriaChangesForm.addControl(key, this.createConvocatoria.get('data').get(key));
      }
    });
  }

  cancel(){
    this.router.navigate(['/convocatorias']);
  }

}
