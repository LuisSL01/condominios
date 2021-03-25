import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data';
import { ToastController } from '@ionic/angular';
import { AgenteService } from '../../services/agente.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  //Se inyecta en el constructor para armar los formularios reactivos..
  constructor(private fb: FormBuilder,
    private router:Router,
    private storage: Storage,
    private userData: UserData,
    private agenteService: AgenteService,
    private toastr: ToastController,
    private datePipe: DatePipe) {
      
  }

  createAgente = this.fb.group({//Esto para construir los formularios dinamicamente
    nombreCompleto: ['', [Validators.required, Validators.minLength(4)]],
    apellidoPaterno: ['', null],
    apellidoMaterno: ['', null],
    sexo: ['', Validators.required],
    fechaDeNacimiento: [new Date(), Validators.required],
    ocupacion: ['', Validators.required],
    email: ['', Validators.email],
    telefono: ['', null] 
  });

  agenteChangesForm: FormGroup; 
    
  ngOnInit() {      
  }

  ionViewDidEnter(){
    console.log('uno ionViewDidEnter de Perfil'); 
    this.getUsuario();
  }

  traerAgente(){
    console.log('prepareEdit');
    this.createAgente = this.fb.group({
      nombreCompleto: ["nombreCompleto"],
      apellidoPaterno: ["apellidoPaterno"],  
      apellidoMaterno: ["apellidoMaterno"],
      sexo: ["Masculino"],
      fechaDeNacimiento: [new Date()],
      ocupacion: ["Pro"],
      email: ["e@a"],    
      telefono: ["555"]    
    });
  }

  async getUsuario() {
    console.log('getUsuario');
    console.log("this.idAgente: " + this.userData.getIdAgente());
    await this.agenteService.getUserById(this.userData.getIdAgente()).subscribe( data => {
      console.log(data);
      if (data.status === 200) {

        if( ! data.result.fechaDeNacimiento){
          data.result.fechaDeNacimiento = new Date();
        }
      /*     const fechaNac = new Date(data.result.fechaDeNacimiento);
          console.log(fechaNac);

          if (fechaNac.getFullYear() === null || fechaNac.getMonth() === null || fechaNac.getDate() === null){
            data.result.fechaDeNacimiento = new Date();
          } else {
            data.result.fechaDeNacimiento = fechaNac;
          }
 */
          console.log(data.result.fechaDeNacimiento);
            
          const formattedDate  = this.datePipe.transform(data.result.fechaDeNacimiento, 'yyyy-MM-dd ');
          console.log('transform', formattedDate);

          this.createAgente = this.fb.group({
            nombreCompleto: [data.result.nombreCompleto],
            apellidoPaterno: [data.result.apellidoPaterno],  
            apellidoMaterno: [data.result.apellidoMaterno],
            sexo: [data.result.sexo],
            fechaDeNacimiento: [formattedDate],
            ocupacion: [data.result.ocupacion],
            email: [data.result.email],    
            telefono: [data.result.telefono]    
          });
          
      } else {
        this.showToast('No se lograron recuperar tus datos en este momento');
        this.router.navigate(['/inicio']); 
      }
    });
  }


  guardarDatos() {
    console.log('editar()...');
    this.agenteChangesForm = this.fb.group({});
    
    console.log('getDirtyFields');
    Object.keys(this.createAgente['controls']).forEach(key => {
      if (this.createAgente.get(key).dirty) {
        this.agenteChangesForm.addControl(key, this.createAgente.get(key));
      }
    });
    console.log('agenteChangesForm', JSON.stringify(this.agenteChangesForm.value));

    let formData = this.agenteChangesForm.value;
    if (formData.fechaDeNacimiento) {
      this.agenteChangesForm.value.fechaDeNacimiento = new Date(formData.fechaDeNacimiento).getTime();
      console.log("NACIMIENTO: ", this.agenteChangesForm.value.fechaDeNacimiento);
    }  

    this.agenteService.updateUsuarioCore(this.userData.getIdAgente(), this.agenteChangesForm.value).subscribe(data => {
      if (data.status === 200) {        
        //this.createAgente.markAsPristine();
        //this.createAgente.reset();
        this.router.navigate(['/inicio']); 
        this.showToast('Los datos se han actualizado correctamente');
      } else {
        this.showToast('No se pudo actualizar los datos del usuario');
      }
    }, err => {
      this.showToast('Error al actualizar los datos del usuario');
      console.log(err);
    }, () => { });
    
  }
  
  cambioNumeroTelefono(event){
    let phone:string = event.detail.value;        
    if(phone.length <= 10){
      this.createAgente.value.celular = phone;
    }else{
      this.showToast("El número celular no es válido, debe tener 10 dígitos", "danger")
    }
  }

  showToast(dataMessage: string, color_str?:string) {
    this.toastr.create({
      message: dataMessage,
      duration: 2000,
      color:color_str?color_str:null
    }).then((toastData) => {
      toastData.present();
    });
  }

}
