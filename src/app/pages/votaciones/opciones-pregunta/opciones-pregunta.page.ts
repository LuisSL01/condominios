import { Component, OnInit, Input } from '@angular/core';
import { EncuestaPreguntaOpcion } from '../../../models/encuesta-pregunta-opcion.model';
import { ModalController } from '@ionic/angular';
import { EncuestaPregunta } from '../../../models/encuesta-pregunta.model';
import { EncuestaPreguntaRespuesta } from '../../../models/encuesta-pregunta-respuesta.model';
import { DataLocalVotacionesService } from '../../../services/data-local-votaciones.service';

@Component({
  selector: 'app-opciones-pregunta',
  templateUrl: './opciones-pregunta.page.html',
  styleUrls: ['./opciones-pregunta.page.scss'],
})
export class OpcionesPreguntaPage implements OnInit {

  @Input() idOpcionSelected: number;
  @Input() pregunta: EncuestaPregunta;
  @Input() pregunta_titulo: string;
  /* @Input() opciones:EncuestaPreguntaOpcion[];   */
  @Input() idagente: number;

  @Input() respuestaEncuesta: EncuestaPreguntaRespuesta;
  @Input() existeRespuesta: boolean;



  constructor(private modalCtrl: ModalController,
    private dataLocalVotacionesService: DataLocalVotacionesService) {
    console.log('this.idOpcionSelected: ', this.idOpcionSelected);


  }

  ngOnInit() {
    console.log('this.idOpcionSelected: ', this.idOpcionSelected);
  }
  opcionSelected(opcion: EncuestaPreguntaOpcion) {
    console.log('opcionSelected: ', opcion);
    this.idOpcionSelected = opcion.idopcion;
  }
  cancelar() {
    console.log('cancelar');

    this.modalCtrl.dismiss();
  }

  save() {

    console.log('save');
    console.log('idOpcionSelected: ', this.idOpcionSelected);
    console.log('this.existeRespuesta', this.existeRespuesta);
    if (this.existeRespuesta) {
      this.respuestaEncuesta.idopcion = this.idOpcionSelected;
      this.dataLocalVotacionesService.editarRespuestaEncuesta();
      console.log('respuesta guardada exitosamente');

    } else {
      let respuesta: EncuestaPreguntaRespuesta = new EncuestaPreguntaRespuesta();;
      respuesta.idagente = this.idagente;
      respuesta.idopcion = this.idOpcionSelected;
      this.dataLocalVotacionesService.guardarRespuestaEncuesta(this.pregunta, respuesta);
      console.log('respuesta guardada exitosamente');
    }
  }


}
