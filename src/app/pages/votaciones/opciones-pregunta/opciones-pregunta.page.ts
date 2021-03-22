import { Component, OnInit, Input } from '@angular/core';
import { EncuestaPreguntaOpcion } from '../../../models/encuesta-pregunta-opcion.model';
import { ModalController } from '@ionic/angular';
import { EncuestaPregunta } from '../../../models/encuesta-pregunta.model';
import { EncuestaPreguntaRespuesta } from '../../../models/encuesta-pregunta-respuesta.model';
import { VotacionesService } from '../../../services/votaciones.service';
import { UserData } from '../../../providers/user-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones-pregunta',
  templateUrl: './opciones-pregunta.page.html',
  styleUrls: ['./opciones-pregunta.page.scss'],
})
export class OpcionesPreguntaPage implements OnInit {

  @Input() idOpcionSelected: number;
  @Input() pregunta: EncuestaPregunta;
  @Input() pregunta_titulo: string;
  @Input() idagente: number;

  @Input() respuestaEncuesta: EncuestaPreguntaRespuesta;
  @Input() existeRespuesta: boolean;

  @Input() votacionId: number;
  
  idOpcionInicial = 0;

  constructor(private modalCtrl: ModalController,
              private votacionesService: VotacionesService,
              private router: Router,
              private userData:UserData) {
    console.log('this.idOpcionSelected: ', this.idOpcionSelected);
  }

  ngOnInit() {
    console.log('this.idOpcionSelected: ', this.idOpcionSelected);
  }
  opcionSelected(opcion: EncuestaPreguntaOpcion) {
    console.log('opcionSelected: ', opcion);
    this.idOpcionSelected = opcion.id;
  }
  cancelar() {
    console.log('cancelar');
    this.modalCtrl.dismiss();
  }

  save() {
    console.log('save');
    console.log('idOpcionSelected: ', this.idOpcionSelected);
    console.log('this.existeRespuesta', this.existeRespuesta);

    let respuesta: EncuestaPreguntaRespuesta = new EncuestaPreguntaRespuesta();;
    
    respuesta.idAgente = this.idagente;
    respuesta.idOpcion = this.idOpcionSelected;
    respuesta.idPregunta = this.pregunta.id;

    if (this.existeRespuesta) {
        respuesta.id = this.respuestaEncuesta.id;//Solo si existe se recupera su id
        this.votacionesService.editRespuesta(this.votacionId, respuesta).subscribe((data) => {
          console.log(data);
          if (data.status === 200) {
            this.userData.showToast('Respuesta editada correctamente');
            this.modalCtrl.dismiss();
            this.router.navigate(['/votaciones', { item: true}]); 
            console.log('ya deberia haberme redireccionado a la otra pagina');
          } else this.userData.showToast('No se pudo editar la respuesta');            
        },
        (err) => {console.log(err);this.userData.showToast('No se pudo guardar la respuesta'); },
        () => {}
      );

    } else {
      this.votacionesService.saveRespuesta(this.votacionId, respuesta).subscribe((data) => {
          console.log(data);        
          if (data.status === 200) {                    
            this.userData.showToast('Respuesta agregada correctamente');
            console.log('deberia estar redireccionando al inicio');
            this.modalCtrl.dismiss();
            this.router.navigate(['/votaciones', { item: true}]); 
            console.log('ya deberia haberme redireccionado a la otra pagina');
          } else this.userData.showToast('No se pudo guardar la respuesta, se guarda localmente');            
        },
        (err) => {
          console.log(err);
          this.userData.showToast('No se pudo guardar la respuesta, se guarda localmente');          
        },
        () => {}
      );

  /*     this.dataLocalVotacionesService.guardarRespuestaEncuesta(this.pregunta, respuesta);
      console.log('respuesta guardada exitosamente'); */
    }
  }
}
