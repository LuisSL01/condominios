import { Component, OnInit, Input } from '@angular/core';
import { Publicacion } from '../../models/publicacion.model';
import { RespuestaPublicacion } from '../../models/respuesta-publicacion.model';
import { AnuncioService } from '../../services/anuncio.service';
import { ActionSheetController, ToastController, Platform } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Router } from '@angular/router';

import { EmailComposer } from '@ionic-native/email-composer/ngx';


@Component({
  selector: 'app-anuncio-list',
  templateUrl: './anuncio-list.component.html',
  styleUrls: ['./anuncio-list.component.scss'],
})
export class AnuncioListComponent implements OnInit {

  @Input() anuncio: Publicacion;

  
  number:string= "5560732775";
  linkW="https://wa.me/52"+this.number+"?text=hi";


  pathS3: string = "https://almacenamientonube.s3.us-west-1.amazonaws.com/";
  pathBase64: string = "data:image/jpeg;base64,";

      
  reporte:RespuestaPublicacion = new RespuestaPublicacion();
 
  constructor(public anuncioService: AnuncioService,
    private actionSheetCtrl: ActionSheetController,
    private toastr: ToastController,
    private router: Router,
    private emailComposer: EmailComposer,
    private platform:Platform,
    private userData: UserData) { }

  ngOnInit() {}




  
  onRowSelected(){
    console.log('onRowSelected');
    console.log(this.anuncio);    
    this.router.navigate(['/anuncios/add', { item: JSON.stringify(this.anuncio)}]);  
  }

  correoSelected(){
    console.log('corrreo selected');    
    let email = {
      to: this.anuncio.correoAgenteCreador,
      /* cc: 'erika@mustermann.de', */
      /* bcc: ['john@doe.com', 'jane@doe.com'], */
      /* attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf'
      ], */
      subject: 'Anuncio: '+ this.anuncio.data.titulo ,
      body: 'Hola, vi tu anuncio Armonía Residencial y estoy interesado! ',
      isHtml: true
    }    
    // Send a text message using default options
    this.emailComposer.open(email);
  }

  chatSelected(){
    console.log('log, se ha agregado el plugin....');
    console.log('link a abrir: ', "whatsapp//send?phone="+this.anuncio.celularAgenteCreador+"?text=Hola%20desde%20Armonía%20Residencial"); 
    window.open("whatsapp//send?phone="+this.anuncio.celularAgenteCreador+"?text=Hola%20desde%20Armonía%20Residencial");    
  }

  
  async lanzarMenu() {
    let guardarBorrarBtn;
    guardarBorrarBtn = {
      text: 'Borrar anuncio',
      icon: 'trash',
      cssClass: 'action-dark',
      handler: () => {
        if (this.anuncio.id > 0) {
          this.anuncioService.borrarAnuncio(this.anuncio.id).subscribe((data) => {
            if (data.status === 200) {
              this.showToast("anuncio eliminado correctamente");
            } else {
              this.showToast("Error al eliminar registro");
            }
          },
            (err) => {
              console.log(err);
              this.showToast("Error al eliminar registro");
            },
            () => { }
          );
        } else {
          console.log('Debo borrar de data local');
          this.anuncioService.borrarAnuncioLocal(this.anuncio);
        }
      }
    };

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        guardarBorrarBtn,
        {
          text: 'Reportar',
          icon: 'alert-circle-outline',
          cssClass: 'action-dark',
          handler: () => {

            this.reporte.agenteCreador = this.userData.getIdAgente();
            this.reporte.nombreAgente = this.userData.getNombreCompleto();
            this.reporte.mensaje = "Se ha reportado el anuncio";

            this.anuncioService.reportarAnuncio(this.anuncio.id, this.reporte).subscribe(
              (data) => {
                console.log(data);        
                if (data.status === 200) this.userData.showToast('Se ha reportado correctamente');                  
                else console.log('Llego otro status al guardar reporte');                
              },
              (err) => {
                console.log(err);
                this.userData.showToast('No se pudo guardar la reporte, se guarda localmente');                
              },
              () => {}
            );
          }
        },    
        {
          text: this.anuncio.estatus?'Inactivar':'Activar',
          icon: (this.anuncio.estatus?'close-circle-outline':'checkmark-outline'),
          cssClass: 'action-dark',
          handler: () => {

            const formData = new FormData();
              formData.append("id_publicacion",   JSON.stringify(this.anuncio.id));
              formData.append("status", JSON.stringify(!this.anuncio.estatus));

        this.anuncioService.updateStatus(formData)
        .subscribe(
          (data) => {
            if (data.status === 200) {
              console.log('data: '+ data);                
              this.showToast('Anuncio '+(!this.anuncio.estatus?"Activado":"Inactivado")+' correctamente');
            } else {this.showToast('No se pudo actualizar el registro');
            }
          },
          (err) => {
            this.showToast('ERROR!, No se pudo actualizar el registro');
          }
        );
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
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


}
