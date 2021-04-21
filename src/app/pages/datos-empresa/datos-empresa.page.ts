import { Component, OnInit } from '@angular/core';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.page.html',
  styleUrls: ['./datos-empresa.page.scss'],
})
export class DatosEmpresaPage implements OnInit {

  empData:any = [];

  createAgente = this.fb.group({//Esto para construir los formularios dinamicamente
    nombreCompleto: ['', [Validators.required, Validators.minLength(4)]],
    apellidoPaterno: ['', null],
    apellidoMaterno: ['', null],
    sexo: ['', Validators.required],
    fechaDeNacimiento: [new Date(), Validators.required],
    ocupacion: ['', Validators.required],
    email: ['', Validators.email],
    telefono: ['', null],    
    departamentoAC:['', null],
    data: this.fb.group({  //Datos de facturacion    
      razonSocialEmpresa: ["",],
      rfcEmpresa: ["",],
      correoEmpresa: ["",],
      usoCFDIEmpresa: ["",],
    })
  });

  empresaDataForm = this.fb.group({
    email: ['', Validators.email],
    telefono: [''],
    rfc: [''],    
    data: this.fb.group({
      banco: [''],
      sucursal: [''],
      cuenta: [''],
      clabeInterbancaria: ['']   
    }),
    configuracionEmpresa: this.fb.group({
      aplicaReservarAreas: [false]      
    }),
  });

  empresaChangesForm: FormGroup;

  admon:boolean;
  constructor(private fb: FormBuilder,
              private userData:UserData,
              private empresaService:EmpresaService,
              
              private storage: Storage,) { 
                console.log('en el constructor');
              }

  ngOnInit() {    
   console.log('en el ngOnInit');
   
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter');
    
  }
  ionViewDidEnter(){
    
    this.recuperaDataEmpresa();
    this.admon = this.userData.administrador;
    console.log('ionViewDidEnter de datos empresa page', this.admon);    
    /* console.log('ionViewDidEnter');     */        
  }

 
  


  async recuperaDataEmpresa(){
    /* console.log('recuperaDataEmpresa');     */
    const data = await this.storage.get('empresaData');
    /* console.log('data',data); */
    if(data){
      this.empData = JSON.parse(data);

      let formData: any;
      let formConfigEmpresaForm:any;
      if(this.empData.data){
        formData = this.fb.group({
          banco: [this.empData.data.banco],
          sucursal: [this.empData.data.sucursal],
          cuenta: [this.empData.data.cuenta],
          clabeInterbancaria: [this.empData.data.clabeInterbancaria]        
        });
      }else{
        formData = this.fb.group({
          banco: [""],
          sucursal: [""],
          cuenta: [""],
          clabeInterbancaria: [""]
        });
      }
      if(this.empData.configuracionEmpresa){
        formConfigEmpresaForm = this.fb.group({
          aplicaTorres: [this.empData.configuracionEmpresa.aplicaTorres],
          aplicaReservarAreas: [this.empData.configuracionEmpresa.aplicaReservarAreas],          
        });
      }else{
        formConfigEmpresaForm = this.fb.group({
          aplicaTorres: [false],
          aplicaReservarAreas: [false],          
        });
      }
      
      this.empresaDataForm = this.fb.group({
        //Armar el formulario para que puedan escribir data de la empresa
        email: [this.empData.email],
        telefono: [this.empData.telefono],
        rfc: [this.empData.rfc],
        data: formData,
        configuracionEmpresa:formConfigEmpresaForm,
      });
    }
    /* console.log(this.empData); */  
    console.log('terminando de construir formulario');
    
    console.log(this.empresaDataForm.value);
    
    
  }
 
  guardar(){

    console.log('e guardar');    
    console.log(this.empresaDataForm.value);
    this.empresaChangesForm = this.fb.group({});
    this.getDirtyFields();
    
    console.log(this.empresaChangesForm.value);
    console.log(this.empData.id);

    
    
    if(!this.isEmpty(this.empresaChangesForm.value)){
      this.empresaService.updateEmpresa(this.empData.id, this.empresaChangesForm.value).subscribe(data => {
        if (data.status === 200) {
          this.userData.showToast('Actualizado correctamente, para ver los cambios cierre e inicio sesión nuevamente');          
        } else {
          this.userData.showToast('Error al actualizar');
        }
      }, err => {
        this.userData.showToast('Error en el servicio intente más tarde');
        console.log(err);
      }, () => { });
    }else{
      this.userData.showToast('No hay cambios por actualizar');
    }
    
  }

  isEmpty(obj) {
    for (var o in obj)
      if (o) return false;
    return true;
  }

  getDirtyFields() {

    Object.keys(this.empresaDataForm['controls']).forEach(key => {            
      if (this.empresaDataForm.get(key).dirty) {                      
          this.empresaChangesForm.addControl(key, this.empresaDataForm.get(key));        
      }
    });

    /* Object.keys(this.empresaDataForm['controls'].data['controls']).forEach(key => {
      if (this.empresaDataForm.get('data').get(key).dirty) {
        console.log('value viene dentro de data');
        
        this.empresaChangesForm.addControl(key, this.empresaDataForm.get('data').get(key));
      }
    }); */
  }

}
