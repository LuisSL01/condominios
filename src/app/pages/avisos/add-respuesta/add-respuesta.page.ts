import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AvisoService } from '../../../services/aviso.service';
import { Publicacion } from '../../../models/publicacion.model';
import { RespuestaPublicacion } from '../../../models/respuesta-publicacion.model';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'app-add-respuesta',
  templateUrl: './add-respuesta.page.html',
  styleUrls: ['./add-respuesta.page.scss'],
})
export class AddRespuestaPage implements OnInit {



  /* aviso: Publicacion = new Publicacion(); */
  respuesta:RespuestaPublicacion = new RespuestaPublicacion();
  

  

  @Input() titulo:string;
  @Input() avisoPadre:Publicacion;

  

  constructor(private modalCtrl: ModalController,
    private notificacionService:AvisoService,
      private userData: UserData) { }

  ngOnInit() {
  }

  cancelar(){
    console.log('cancelar');
    this.modalCtrl.dismiss();
  }
  save(){
    console.log('save in add respuestaPage');
    console.log(this.avisoPadre);
    console.log(this.respuesta);
    this.respuesta.agenteCreador = this.userData.getIdAgente();
    this.respuesta.nombreAgente = this.userData.getNombreCompleto();

    this.notificacionService.saveRespuesta(this.avisoPadre.id, this.respuesta).subscribe(
      (data) => {
        console.log(data);        
        if (data.status === 200) {                    
          this.userData.showToast('Respuesta agregada correctamente');
          this.modalCtrl.dismiss();
        } else {
          console.log('Llego otro status al guardar respuesta');
          this.userData.showToast('No se pudo guardar la respuesta, se guarda localmente');
          this.notificacionService.saveRespuestaAvisoLocal(this.avisoPadre, this.respuesta);
          this.modalCtrl.dismiss();      
        }
      },
      (err) => {
        console.log(err);
        this.userData.showToast('No se pudo guardar la respuesta, se guarda localmente');
        this.notificacionService.saveRespuestaAvisoLocal(this.avisoPadre, this.respuesta);        
        this.modalCtrl.dismiss();    
      },
      () => {}
    );
  }

}
