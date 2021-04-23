import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UserData } from 'src/app/providers/user-data';
import { AgenteService } from 'src/app/services/agente.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { TorreService } from 'src/app/services/torre.service';

@Component({
  selector: 'app-agente-departamento',
  templateUrl: './agente-departamento.page.html',
  styleUrls: ['./agente-departamento.page.scss'],
})
export class AgenteDepartamentoPage implements OnInit {

  departamentos: any[] = [];
  torres: any[] = [];
  torreSelected:any;
  departamentoSelected:any;

  idEmpresa:number; 
  aplicaTorre:boolean;

  departamentosAgregados: any[] = [];

  constructor(private torreService: TorreService,       
    private toastr: ToastController, 
    private departamentoService: DepartamentoService,
    private modalCtrl: ModalController,
    private agenteService: AgenteService,
    private userData: UserData,) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.aplicaTorre = this.userData.getAplicaTorres();
  }
  ionViewDidEnter() {        
    this.getDataTorre();
  }

  async getDataTorre() {
    console.log('getDataTorree');
    this.showToast('Buscando torres/privadas');
    await this.torreService.getTorresFull(this.idEmpresa).subscribe((data) => {
      console.log(data);
      if (data.status === 200) {
        this.torres = data.result;
        if(this.torres.length ===0){
          this.showToast('No tiene torres/privadas registradas');
        }else{
          this.showToast( this.torres.length +' torres/privadas encontrados');
        }
      } else {
        this.showToast('error al recuperar registros de torre' + data.status);
      }
    },
      (err) => {
        this.showToast('error al recuperar registros de torre');
      }
    );
  }

  
  cambioTorre(event){
    this.torreSelected = event.detail.value;
    console.log('cambio depto'+ JSON.stringify(this.torreSelected));
    this.getDataDepartamento();    
  }

  async getDataDepartamento() {
    console.log('getDataDepartamento');
    console.log('this.userData.getAplicaTorres()'+ this.aplicaTorre);
    this.showToast('Buscando inmuebles');
    if (this.aplicaTorre) {
      if (this.torreSelected) {
        await this.departamentoService.getDepartamentosPorTorre(this.torreSelected.id).subscribe((data) => {
          console.log(data);
          if (data.status === 200) {
            this.departamentos = data.result;            
            if(this.departamentos.length ===0){
              this.showToast('No tiene inmuebles registrados');
            }else{
              this.showToast(this.departamentos.length+' inmuebles encontrados');
            }
          }
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
        if (data.status === 200){
          this.departamentos = data.result;
          if(this.departamentos.length ===0){
            this.showToast('No tiene inmuebles registrados');
          }else{
            this.showToast(this.departamentos.length+' inmuebles encontrados');
          }
        } 
        else this.showToast('error al recuperar registros: '+ data.status);
      },
        (err) => { this.showToast('error al recuperar registros'); }
      );
    }

  }

  close() {
    console.log('close');
    if(this.departamentosAgregados.length === 0){
      this.modalCtrl.dismiss();
    }else{
      this.modalCtrl.dismiss({ event: this.departamentosAgregados });
    }

    
  }

  save(){
    console.log('save');
    console.log(this.torreSelected);
    console.log(this.departamentoSelected);    
    console.log('-->');
    const formData = new FormData(); //Esto no esta trabajanco chido...
          formData.append("id_agente",""+this.userData.getIdAgente());
          formData.append("id_departamento", "" + this.departamentoSelected.id);
    this.agenteService.addDepartamentoToAgente(formData).subscribe(
      (data) => {
        if (data.status === 200) {
          console.log('"data.result"', data.result);
          this.departamentosAgregados.push(data.result);
          this.showToast("Inmueble agregado correctamente", 'success');                    
        } else {
          console.log('Llego otro status al asociar agente a empresa');
          this.showToast("Error al crear registro", 'warning');
        }
      },
      (err) => {
        this.showToast("Error en el servicio al crear registro", 'danger');
      },
      () => { }
    );
    
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
