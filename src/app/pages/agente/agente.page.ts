import { Component, OnInit, ViewChild } from "@angular/core";
import { AgenteService } from "../../services/agente.service";
import { UserData } from "../../providers/user-data";
import { Storage } from "@ionic/storage";
import { ActionSheetController, IonInfiniteScroll, ToastController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: "app-agente",
  templateUrl: "./agente.page.html",
  styleUrls: ["./agente.page.scss"],
})
export class AgentePage implements OnInit {
  agentesList: any[] = [];
  idEmpresa: number;
  filters: any;
  agentePage: number = 0;

  currentStatus:boolean;
  public camposFiltros:string[]=new Array();

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private agenteService: AgenteService,
    private actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    private userData: UserData,
    private toastController: ToastController,
    private ui:UiServiceService
  ) {
    /* this.idEmpresa = this.userData.getIdEmpresa(); */
  }

  ngOnInit() {
    this.idEmpresa = JSON.parse(window.localStorage.getItem('empresaData')).id
    console.log('this.idempresa: '+ this.idEmpresa);
   
    /* this.getAgentes(0,10); */
    this.cargaAgentesStorage();
    this.cargaFiltrosTabla();

    this.agenteService.agenteListener.subscribe(noti => {
      if(this.agentesList){
        var index = this.agentesList.indexOf(noti);
        if (index > -1) {
          this.agentesList.splice(index, 1);
          this.storage.set(this.idEmpresa + "_agentes", this.agentesList);
        }
      }
    });

  }

  cargaFiltrosTabla(){    
    this.camposFiltros.push("root_nombreCompleto");
    this.camposFiltros.push("root_apellidoPaterno");
    this.camposFiltros.push("root_apellidoMaterno");
    this.camposFiltros.push("root_email");
    this.camposFiltros.push("root_departamento");
    
  }

  async cargaAgentesStorage() {
    console.log("cargaAgentesStorage");
    await this.cargarAgentesTemporalesStorage(this.idEmpresa);
    console.log("termino de buscar en storage");
    if (this.agentesList.length == 0) {
      console.log("recuperando los del server");
      await this.getAgentes(this.agentePage, 10);
      console.log("terminando de recuperar data");
    }
    console.log("dataAgenteRecuperada: ", this.agentesList);
  }

  async cargarAgentesTemporalesStorage(idEmpresa: number) {
    console.log("cargarAgentesTemporalesStorage: ", idEmpresa + "_agentes");
    const agg = await this.storage.get(idEmpresa + "_agentes");
    console.log(idEmpresa + "_agentes:" + agg);
    if (agg) {
      this.agentesList = agg;
    } else {
      this.agentesList = [];
    }
  }

  getAgentes(page: number, size: number, eventInfinite?, eventRefresh?) {
    this.ui.presentLoading();
    this.agenteService.getAgentes(this.idEmpresa, page, size, this.filters).subscribe((data) => {
          this.ui.dismissLoading();
          if (data.status === 200) {
            if (eventInfinite) {
              this.agentesList.push(...data.result.content);
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }else{                      
              this.agentesList = data.result.content;
            }
            this.storage.set(this.idEmpresa + "_agentes", this.agentesList);
            this.completeEvent(eventInfinite, eventRefresh);
          } else {
            console.log(
              "llego otro status al recuperar agentes: " + data.status
            );
            this.userData.showToast("Error al recuperar agentes");
            this.completeEvent(eventInfinite, eventRefresh);
          }
        },
        (err) => {
          this.ui.dismissLoading();
          console.log(err);
          this.userData.showToast("Error al recuperar agentes, revise su conexión a internet");
          this.completeEvent(eventInfinite, eventRefresh);
        }
      );
  }
  completeEvent(eventInfinite?, eventRefresh?) {
    if (eventInfinite) {
      eventInfinite.target.complete();
    }
    if (eventRefresh) {
      eventRefresh.target.complete();
    }
  }

  buscar(event) {
    if (!this.isEmpty(event.detail.value)) {
      console.log('campos buscar-->', JSON.stringify(this.camposFiltros));
      this.filters = "";
      this.camposFiltros.forEach(item => this.filters += '' + item + ':*' + event.detail.value + '*,');
      if (this.filters.endsWith(",")) {
        this.filters = this.filters.substring(0, this.filters.length - 1);
      }
    } else {
      this.filters = "";
    }
    this.agentePage = 0;
    this.infiniteScroll.disabled = false;
    this.getAgentes(this.agentePage, 10, null, null);    
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }

  loadData(event) {//Desde el infinite scroll
    console.log("load data");
    this.agentePage++;
    this.getAgentes(this.agentePage, 10, event);
  }

  doRefresh(event) {
    this.agentePage = 0;
    this.infiniteScroll.disabled = false; //Cada que se hace el refresh se habilita el componente infinite scroll
    this.getAgentes(this.agentePage, 10, null, event);
  }

  showToast(dataMessage: string) {
    this.toastController
      .create({
        message: dataMessage,
        duration: 2000,
      })
      .then((toastData) => {
        toastData.present();
      });
  }

  async lanzarMenu(idAgente:number, status:boolean) {
    let guardarBorrarBtn;
    guardarBorrarBtn = {
      text: (status?'Inactivar':'Activar'),
      icon: (status?'close-circle-outline':'checkmark-outline'),
      cssClass: "action-dark",
      handler: () => {        
        const formData = new FormData();
              formData.append("id_agente",   JSON.stringify(idAgente));
              formData.append("status", JSON.stringify(!status));
        this.ui.presentLoading();
        this.agenteService.updateStatus(formData).subscribe(
          (data) => {
            this.ui.dismissLoading();
            if (data.status === 200) {
              this.showToast('Agente '+(!status?"Activado":"Inactivado")+' correctamente');
              this.agentePage = 0;
              this.infiniteScroll.disabled = false;
              this.getAgentes(this.agentePage, 10, null, null); 
            } else {
              console.log("Llego otro status al actualizar el agentes " + data);
              this.showToast('No se pudo actualizar el agente');
            }
          },
          (err) => {
            console.log("Error al actualizar agente" + err);
            this.showToast('ERROR!, No se pudo actualizar el agente');
          }
        );
      },
    };

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        guardarBorrarBtn,
        {
          text: "Cancelar",
          icon: "close",
          role: "cancel",
          cssClass: "action-dark",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
