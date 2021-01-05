import { Component, Input, OnInit } from '@angular/core';
import { EncuestaPregunta } from '../../../models/encuesta-pregunta.model';
import { ModalController } from '@ionic/angular';
import { OpcionesPreguntaPage } from '../opciones-pregunta/opciones-pregunta.page';
import { DataLocalService } from '../../../services/data-local.service';
import { EncuestaPreguntaRespuesta } from '../../../models/encuesta-pregunta-respuesta.model';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'app-responder-encuesta',
  templateUrl: './responder-encuesta.page.html',
  styleUrls: ['./responder-encuesta.page.scss'],
})
export class ResponderEncuestaPage implements OnInit {


  @Input() titulo: string;
  @Input() mensaje: string;
  @Input() preguntas: EncuestaPregunta[];
  @Input() votacionId:number;

  preguntaForm: EncuestaPregunta;
  idOpcionPreguntaSeleccionada: number = 0;

  respuesta: EncuestaPreguntaRespuesta;
  existeRespuesta: boolean;

  idAgente:number;
  

  constructor(private modalCtrl: ModalController,
    private userData:UserData,
    private dataLocalService: DataLocalService) {


  }

  ngOnInit() {
    this.idAgente = this.userData.getIdAgente();
  }

  cancelar() {
    console.log('cancelar');
    this.modalCtrl.dismiss();
  }

  preguntaSelected(pregunta: EncuestaPregunta) {
    console.log('pregunta selected..', pregunta);

    this.preguntaForm = pregunta;
    this.buscaRespuestaAPregunta();

    this.presentModalOpcionesPregunta();
    console.log(this.idOpcionPreguntaSeleccionada);

  }

  buscaRespuestaAPregunta() {
    //Se busca la respuesta del agente dentro de la pregunta para saber si ya ha respondido
    console.log('this.buscaRespuestaAPregunta');


    if (this.preguntaForm) {
      console.log('La pregunta se recupero correctamente');

      this.respuesta = this.preguntaForm.respuestas.find(res => res.idAgente === this.idAgente);

      if (this.respuesta) {
        this.existeRespuesta = true;
        this.idOpcionPreguntaSeleccionada = this.respuesta.idOpcion;

      } else {
        this.existeRespuesta = false;
        this.idOpcionPreguntaSeleccionada = 0;
      }


    }
  }

  async presentModalOpcionesPregunta() {
    const modal = await this.modalCtrl.create({
      component: OpcionesPreguntaPage,
      componentProps: {
        pregunta: this.preguntaForm,
        pregunta_titulo: this.preguntaForm.pregunta,
        /* opciones: this.preguntaForm.opciones, */
        idOpcionSelected: this.idOpcionPreguntaSeleccionada,
        idagente: this.idAgente,
        respuestaEncuesta: this.respuesta,
        existeRespuesta: this.existeRespuesta,
        votacionId : this.votacionId
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }



}
