import { Component, OnInit, ViewChild } from "@angular/core";
import { AgenteService } from "../../services/agente.service";
import { UserData } from "../../providers/user-data";
import { Storage } from "@ionic/storage";
import { ActionSheetController, IonInfiniteScroll, ToastController } from '@ionic/angular';

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

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private agenteService: AgenteService,
    private actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    private userData: UserData,
    private toastController: ToastController
  ) {
    /* this.idEmpresa = this.userData.getIdEmpresa(); */
  }

  ngOnInit() {
    this.idEmpresa = JSON.parse(window.localStorage.getItem('empresaData')).id
    console.log('this.idempresa: '+ this.idEmpresa);
    /* this.getAgentes(0,10); */
    this.cargaAgentesStorage();
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
    this.agenteService
      .getAgentes(this.idEmpresa, page, size, this.filters)
      .subscribe(
        (data) => {
          if (data.status === 200) {
            if (eventRefresh) {
              this.agentesList = [];
            }
            if (eventInfinite) {
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }
            this.agentesList = data.result.content;
            console.log("this.agentesList: " + this.agentesList);
            this.storage.set(this.idEmpresa + "_agentes", this.agentesList);
            this.completeEvent(eventInfinite, eventRefresh);
          } else {
            console.log(
              "llego otro status al recuperar agentes: " + data.status
            );
            this.completeEvent(eventInfinite, eventRefresh);
          }
        },
        (err) => {
          console.log(err);
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

  buscar(event) {}

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
      icon: "trash",
      cssClass: "action-dark",
      handler: () => {        
        const formData = new FormData(); //Esto no esta trabajanco chido...
              formData.append("id_agente",   JSON.stringify(idAgente));
              formData.append("status", JSON.stringify(!status));
        this.agenteService.updateStatus(formData)
        .subscribe(
          (data) => {
            if (data.status === 200) {
              console.log('data: '+ data);                
              this.showToast('Agente '+(!status?"Activado":"Inactivado")+' correctamente');
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
