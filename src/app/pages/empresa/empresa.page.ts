import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data';
import { DepartamentoPage } from '../departamento/departamento.page';
import { AgenteService } from '../../services/agente.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {


  @Input() empresas:any[];
  @Input() username:string;
  @Input() idAgente:number;

  departamentos: any[] = [];

  constructor(private modalCtrl: ModalController,
    private toastr: ToastController,    
    private agenteService:AgenteService,
    public storage: Storage,
    private router: Router,
    private userData:UserData) { }

  ngOnInit() {
  }

  cancelar(){
    console.log('cancelar');
    this.modalCtrl.dismiss();
  }  

  empresaSelected(empresa: any) {
    /* window.localStorage.setItem('empresaData', JSON.stringify({"nombre":empresa.nombre,"id":empresa.id}));
    this.storage.set('empresaData', JSON.stringify({"nombre":empresa.nombre,"id":empresa.id})); */
    window.localStorage.setItem('empresaData', JSON.stringify(empresa));
    this.storage.set('empresaData', JSON.stringify(empresa));
    this.userData.setConfigEmpresa();
    this.buscaDepartamentosAgente();
    /* this.router.navigate(['/inicio']);        
    this.showToast("Bienvenido a armonía residencial: " + this.username); */
    this.modalCtrl.dismiss();
  }

  buscaDepartamentosAgente(){
    console.log('buscaDepartamentosAgente');
    
    if(this.idAgente > 0){
      this.agenteService.getDepartamentosPorAgente(this.idAgente).subscribe(data=>{
        if(data.status === 200){
            this.departamentos = data.result;
            if(this.departamentos.length > 1 ){
              console.log('debo mostrar los departamentos para que seleccione alguno');
              console.log(this.departamentos);
              this.presentModalListDepartamentos();
            }else{
              if(this.departamentos.length == 1){
                this.storage.set('departamentoData', this.departamentos[0]);
                this.userData.setConfigUser();
              }else{
                this.userData.setConfigUser();
              }
              this.router.navigateByUrl('/inicio');
              this.showToast("Bienvenido " + this.username + " a Armonía Residencial");
            }
  
        }else{
          this.showToast('Error al recuperar departamentos del usuario')
        }
      }, err => {                        
        this.showToast('Error en el servicio al buscar departamentos de usuario')
      });
    }
  }

  async presentModalListDepartamentos() {
    const modal = await this.modalCtrl.create({
      component: DepartamentoPage,
      componentProps: {
        departamentos: this.departamentos
      },
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }

  showToast(dataMessage: string) {
    this.toastr.create({
      message: dataMessage,
      duration: 2000
    }).then((toastData) => {
      toastData.present();
    });
  }

}
