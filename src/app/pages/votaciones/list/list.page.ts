import { Component, OnInit, Input } from '@angular/core';
import { VotacionesService } from '../../../services/votaciones.service';
import { Encuesta } from '../../../models/votaciones.model';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ResponderEncuestaPage } from '../responder-encuesta/responder-encuesta.page';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @Input() encuesta:Encuesta;

  constructor(public votacionService: VotacionesService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl:ModalController,
    private userData:UserData,
    private router:Router) { }

  ngOnInit() {
  }

  editRowSelected(){

    console.log(this.encuesta);

    this.router.navigate(['/votaciones/add', { item: JSON.stringify(this.encuesta)}]);      
  }

  responderEncuesta(){
    
    console.log('actual: '+ new Date().getTime());
    console.log('reg: '+new Date(this.encuesta.fechaTermina).getTime());
    
    
    if(new Date().getTime() < new Date(this.encuesta.fechaTermina).getTime()){
      this.presentModalRespoderEncuesta();
    }else{
      this.userData.showToast("La fecha de encuesta ya termino, no se puede responder");
    }
    
  }

  async lanzarMenu() {

    let guardarBorrarBtn;
      guardarBorrarBtn = {
        text: 'Borrar encuesta',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar encuesta');
          console.log(this.encuesta);
          if(this.encuesta.id > 0 ){
            this.votacionService.delete(this.encuesta.id).subscribe((data) => {
                if (data.status === 200) {
                  this.userData.showToast('Eliminado correctamente');                
                  this.router.navigate(['/votaciones', { item: true, skipLocationChange: true}]);
                }
                else  this.userData.showToast('Error al eliminar registro');                
              },
              (err) => {
                  this.userData.showToast("Error al eliminar registro");                  
              },
              () => {}
            );
          }else{
            this.votacionService.borrarVotacion(this.encuesta);
          }
        }
      };

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
  /*     {
        text: 'Responder',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Responder');
          this.presentModalRespoderEncuesta();
      }
      }, */
      guardarBorrarBtn
     ]
    });
    await actionSheet.present();
  }

  
  async presentModalRespoderEncuesta(){
    const modal = await this.modalCtrl.create({
      component: ResponderEncuestaPage,
    componentProps:{
      titulo: this.encuesta.titulo,
      mensaje: this.encuesta.mensaje,
      preguntas: this.encuesta.preguntas,
      votacionId: this.encuesta.id
    },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
