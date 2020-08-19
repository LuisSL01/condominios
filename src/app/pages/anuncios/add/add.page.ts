import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { Anuncio } from '../../../models/anuncio.model';
import { DataLocalAnuncioService } from '../../../services/data-local-anuncio.service';

import * as moment from 'moment-timezone';



@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  anuncio: Anuncio = new Anuncio();
  idanuncio: number;
  momentjs: any = moment;
  

  constructor(private dataLocalAnuncioService: DataLocalAnuncioService) { 
    this.momentjs().tz('America/Mexico_City');
    
  }

  ngOnInit() {
  }
  save() {
    // Set the default timezone to UTC
    // More info about moment timezone: http://momentjs.com/timezone/docs
    /* this.momentjs.tz.setDefault('UTC');
    this.momentjs.locale('es'); */

    // Current datetime according to the default timezone (UTC as determined above)
    console.log('dave()');
    
    let now = this.momentjs;
    console.log(now);

    let currentDateTime = this.momentjs().format('YYYY-MM-DD HH:mm:ss ZZ');
    console.log(currentDateTime); 

    // A specific datetime according to a specific timezone ('Africa/Cairo' in this example) other than the default one (UTC as determined above)
    let dateTimeAccordingToAnotherTimezone = this.momentjs().format('MMMM Do YYYY, h:mm:ss a');
    console.log(dateTimeAccordingToAnotherTimezone);



    console.log('save new anuncio');
    console.log(this.momentjs);



    console.log(this.anuncio);
    this.dataLocalAnuncioService.guardarAnuncio(this.anuncio);
  }
  cambioFechaVence(event) {
    console.log('cambio fecha vence: ', event);
    /* this.anuncio.fechaVence = new Date(event.detail.value);
    this.anuncio.fechaVence = new moment(event.detail.value); */
  }

}
