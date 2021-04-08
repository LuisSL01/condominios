import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data';
import { ToastController } from '@ionic/angular';
import { AgenteService } from '../../services/agente.service';
import { DatePipe } from '@angular/common';
import { CatalogoUsoCFDI } from 'src/app/models/catalogo-uso-cfdi.model';
import { DepartamentoService } from '../../services/departamento.service';
import { TorreService } from '../../services/torre.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  //Se inyecta en el constructor para armar los formularios reactivos..

  catalogoUsoCFDI: CatalogoUsoCFDI[] = [];
  torreSelected:any;
  departamentos: any[] = [];
  torres: any[] = [];
  idEmpresa:number;

  nombreTorre:string;
  nombreDepartamento:string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private torreService: TorreService,
    private storage: Storage,
    private departamentoService: DepartamentoService,
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
    telefono: ['', null],    
    departamentoAC:['', null],
    data: this.fb.group({  //Datos de facturacion    
      razonSocialEmpresa: ["",],
      rfcEmpresa: ["",],
      correoEmpresa: ["",],
      usoCFDIEmpresa: ["",],
    })
  });

  agenteChangesForm: FormGroup;

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.rellenaCatalogoUsoCFDI()
    
  }

  rellenaCatalogoUsoCFDI() {
    this.catalogoUsoCFDI.push(this.generaCatalogo("D01", "Honorarios médicos, dentales y gastos hospitalarios."));
    this.catalogoUsoCFDI.push(this.generaCatalogo("D01", "Honorarios médicos, dentales y gastos hospitalarios."));
    this.catalogoUsoCFDI.push(this.generaCatalogo("D02", "Gastos médicos por incapacidad o discapacidad"));
    this.catalogoUsoCFDI.push(this.generaCatalogo("D03", "Gastos funerales."));
    this.catalogoUsoCFDI.push(this.generaCatalogo("D04", "Donativos."));
    this.catalogoUsoCFDI.push(this.generaCatalogo("D05", "Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)."));
    this.catalogoUsoCFDI.push(this.generaCatalogo("D06", "Aportaciones voluntarias al SAR."));
    this.catalogoUsoCFDI.push(this.generaCatalogo("D07", "Primas por seguros de gastos médicos."));
    this.catalogoUsoCFDI.push(this.generaCatalogo("D08", "Gastos de transportación escolar obligatoria."));
    this.catalogoUsoCFDI.push(this.generaCatalogo("D09", "Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones."));
    this.catalogoUsoCFDI.push(this.generaCatalogo("D10", "Pagos por servicios educativos (colegiaturas)"));
    this.catalogoUsoCFDI.push(this.generaCatalogo("G01", "Adquisición de mercancias"));
    this.catalogoUsoCFDI.push(this.generaCatalogo("G02", "Devoluciones, descuentos o bonificaciones"));
    this.catalogoUsoCFDI.push(this.generaCatalogo("G03", "Gastos en general"));
    this.catalogoUsoCFDI.push(this.generaCatalogo("I01", "Construcciones"));
    this.catalogoUsoCFDI.push(this.generaCatalogo("I02", "Mobilario y equipo de oficina por inversiones"));
    this.catalogoUsoCFDI.push(this.generaCatalogo("I03", "Equipo de transporte"));
    this.catalogoUsoCFDI.push(this.generaCatalogo("I04", "Equipo de computo y accesorios"));
    this.catalogoUsoCFDI.push(this.generaCatalogo("I05", "Dados, troqueles, moldes, matrices y herramental"));
    this.catalogoUsoCFDI.push(this.generaCatalogo("I06", "Comunicaciones telefónicas"));
    this.catalogoUsoCFDI.push(this.generaCatalogo("I07", "Comunicaciones satelitales"));
    this.catalogoUsoCFDI.push(this.generaCatalogo("I08", "Otra maquinaria y equipo"));
    this.catalogoUsoCFDI.push(this.generaCatalogo("P01", "Por definir"));    

  }

  generaCatalogo(id: string, desc: string): CatalogoUsoCFDI {
    return new CatalogoUsoCFDI(id, desc);
  }


  ionViewDidEnter() {    
    this.getUsuario();
    this.getDataTorre();
  }

  traerAgente() {
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

  cambioTorre(event){
    this.torreSelected = event.detail.value;
    console.log('cambio depto'+ JSON.stringify(this.torreSelected));
    this.getDataDepartamento();    
  }

  async getDataTorre() {
    console.log('getDataTorree');
    await this.torreService.getTorresFull(this.idEmpresa).subscribe((data) => {
      console.log(data);
      if (data.status === 200) {
        this.torres = data.result;
      } else {
        this.showToast('error al recuperar registros de torre' + data.status);
      }
    },
      (err) => {
        this.showToast('error al recuperar registros de torre');
      }
    );
  }

  async getDataDepartamento() {
    console.log('getDataDepartamento');
    if (this.userData.getAplicaTorres()) {
      if (this.torreSelected) {
        await this.departamentoService.getDepartamentosPorTorre(this.torreSelected.id).subscribe((data) => {
          console.log(data);
          if (data.status === 200) this.departamentos = data.result;
          else this.showToast('error al recuperar registros');
        },
          (err) => { this.showToast('error al recuperar registros'); }
        );
      } else {
        this.showToast('Debe seleccionar una torre para listar los departamentos');
      }
    } else {
      await this.departamentoService.getDepartamentosPorEmpresa(this.idEmpresa).subscribe((data) => {
        console.log(data);
        if (data.status === 200) this.departamentos = data.result;
        else this.showToast('error al recuperar registros: '+ data.status);
      },
        (err) => { this.showToast('error al recuperar registros'); }
      );
    }

  }

  async getUsuario() {
    /* console.log('getUsuario');
    console.log("this.idAgente: " + this.userData.getIdAgente()); */
    await this.agenteService.getUserById(this.userData.getIdAgente()).subscribe(data => {
      /* console.log('USERFULL-->',JSON.stringify(data)); */
      if (data.status === 200) {

        if (!data.result.fechaDeNacimiento) {
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
        const formattedDate = this.datePipe.transform(data.result.fechaDeNacimiento, 'yyyy-MM-dd ');
        let formData: any;

        if (data.result.data) {          
          formData = this.fb.group({
            razonSocialEmpresa: [data.result.data.razonSocialEmpresa],
            rfcEmpresa: [data.result.data.rfcEmpresa],
            correoEmpresa: [data.result.data.correoEmpresa],
            usoCFDIEmpresa: [data.result.data.usoCFDIEmpresa]
          });

        } else {
          formData = this.fb.group({
            razonSocialEmpresa: [""],
            rfcEmpresa: [""],
            correoEmpresa: [""],
            usoCFDIEmpresa: [""]
          });

        }

        this.createAgente = this.fb.group({
          nombreCompleto: [data.result.nombreCompleto],
          apellidoPaterno: [data.result.apellidoPaterno],
          apellidoMaterno: [data.result.apellidoMaterno],
          sexo: [data.result.sexo],
          fechaDeNacimiento: [formattedDate],
          ocupacion: [data.result.ocupacion],
          email: [data.result.email],
          departamentoAC:[data.result.departamentoAC],
          
          telefono: [data.result.telefono],
          data: formData
        });

        if(data.result.dataTorre){
          this.nombreTorre = data.result.dataTorre.nombre;
        }

        if(data.result.dataDepartamento){
          this.nombreDepartamento = data.result.dataDepartamento.nombre;
        }
        
        



      /* console.log(JSON.stringify(this.createAgente.value)); */




      } else {
        this.showToast('No se lograron recuperar tus datos en este momento');
        this.router.navigate(['/inicio']);
      }
    });
  }




  guardarDatos() {
    this.agenteChangesForm = this.fb.group({});
    Object.keys(this.createAgente['controls']).forEach(key => {
      /* console.log('key',key);
      if(key !== 'data'){ */
      if (this.createAgente.get(key).dirty) {
        this.agenteChangesForm.addControl(key, this.createAgente.get(key));
      }
      /*       } */
    });
    /* Object.keys(this.createAgente['controls'].data['controls']).forEach(key => {
      if (this.createAgente.get('data').get(key).dirty) {
        this.agenteChangesForm.addControl(key, this.createAgente.get('data').get(key));
      }
    }); */
    let formData = this.agenteChangesForm.value;
    if (formData.fechaDeNacimiento) {
      this.agenteChangesForm.value.fechaDeNacimiento = new Date(formData.fechaDeNacimiento).getTime();      
    }
    console.log('agenteChangesForm, ya con el data', JSON.stringify(this.agenteChangesForm.value));
    if (!this.isEmpty(this.agenteChangesForm.value)) {
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
    } else {
      this.userData.showToast("No hay datos por actualizar");
    }

  }


  isEmpty(obj) {
    for (var o in obj)
      if (o) return false;
    return true;
  }

  cambioNumeroTelefono(event) {
    let phone: string = event.detail.value;
    if (phone.length <= 10) {
      this.createAgente.value.celular = phone;
    } else {
      this.showToast("El número celular no es válido, debe tener 10 dígitos", "danger")
    }
  }

  showToast(dataMessage: string, color_str?: string) {
    this.toastr.create({
      message: dataMessage,
      duration: 2000,
      color: color_str ? color_str : null
    }).then((toastData) => {
      toastData.present();
    });
  }

}
