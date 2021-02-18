import { Component, OnInit } from "@angular/core";
import { Publicacion } from "../../models/publicacion.model";
import { UserData } from "../../providers/user-data";
import { Storage } from "@ionic/storage";
import { AnuncioService } from "../../services/anuncio.service";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-sincronizar",
  templateUrl: "./sincronizar.page.html",
  styleUrls: ["./sincronizar.page.scss"],
})
export class SincronizarPage implements OnInit {
  public idEmpresa: number;

  public anunciosListLocal: Publicacion[];

  constructor(
    private userData: UserData,
    private storage: Storage,
    private toastr: ToastController,
    private anuncioService: AnuncioService
  ) {}
  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
  }

  sincronizar() {
    this.sincronizarAnuncios();
    console.log("sincronizar..");
  }

  async sincronizarAnuncios() {
    console.log("sincronizarDatosLocales");
    await this.getAnunciosFromLocalStorage();
    console.log("this.anunciosListLocal.length", this.anunciosListLocal.length);
    if (this.anunciosListLocal.length > 0) {
      //Intenta enviar los datos locales al servidor
      const formData = new FormData(); //Esto no esta trabajanco chido...
      console.log(
        "JSON.stringify(this.anunciosListLocal): " +
          JSON.stringify(this.anunciosListLocal)
      );
      let anunciosTemp: any[] = [];
      this.anunciosListLocal.forEach((element) => {
        const anuncioObj = {
          empresa: element.empresa,
          agenteCreador: element.agenteCreador,
          data : element.data,
          /* descripcion: element.descripcion,
          precio: element.precio, */
          tipo: element.tipo,
          /* fechaVence: element.fechaVence, */
          files: {
            archivos: element.files,
          },
        };
        anunciosTemp.push(anuncioObj);
      });
      console.log("data: ", JSON.stringify(anunciosTemp));
      formData.append("data", JSON.stringify(anunciosTemp));
      /* formData.append("data",""+JSON.stringify(this.anunciosListLocal)+""); */
      console.log("anuncios enviado: ", formData);
      this.anuncioService.guardarAnuncios(formData).subscribe(
        (data) => {
          if (data.status === 200) {
            this.anunciosListLocal = [];
            console.log('"sincronizarDatosLocales.result"', data.result);
            //Una vez se registren los datos en el server,
            // procedo a eliminar los datos locales
            console.log('mandando el arreglo de locales a vacio');
            this.showToast('Los anuncios se sincronizaron correctamente.')          
            this.storage.set(
              this.idEmpresa + "_anuncios_local",
              this.anunciosListLocal
            );
          } else {
            console.log("Llego otro status al sincronizar ");
          }
        },
        (err) => {
          console.log(err);
          console.log("Llego otro status al sincronizar anuncios");
        },
        () => {}
      );
    }
  }
  
  showToast(dataMessage: string) {
    this.toastr
      .create({
        message: dataMessage,
        duration: 2000,
      })
      .then((toastData) => {
        toastData.present();
      });
  }
  async getAnunciosFromLocalStorage() {
    console.log("cargarAnunciosLocales");
    const anncios = await this.storage.get(this.idEmpresa + "_anuncios_local");
    console.log(
      "this.construyeNombreEtiqueta():" + this.idEmpresa + "_anuncios_local"
    );
    console.log("anunciosListLocal: ", anncios);
    if (anncios) {
      this.anunciosListLocal = anncios;
    } else {
      this.anunciosListLocal = [];
    }
  }
}
