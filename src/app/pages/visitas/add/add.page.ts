import { Component, OnInit } from '@angular/core';
import { Visita } from '../../../models/visita.model';
import { DataLocalVisitaService } from '../../../services/data-local-visita.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  
  visita:Visita = new Visita();
  constructor(private dataLocalVisitaService: DataLocalVisitaService) { }

  ngOnInit() {
  }

  save(){
    console.log('save the new visita: ');
    console.log(this.visita);
    
    this.dataLocalVisitaService.guardarVisita(this.visita);
    
  }
  cambioFechaIniciaVisita(event){
    console.log('cambioFechaIniciaVisita', event);
    
  }

  cambioFechaTerminaVisita(event){
    console.log('cambioFechaTerminaVisita', event);
    

  }

}
