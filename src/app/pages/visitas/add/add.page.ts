import { Component, OnInit } from '@angular/core';
import { Visita } from '../../../models/visita.model';
import { DataLocalVisitaService } from '../../../services/data-local-visita.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  
  visita:Visita = new Visita();
  constructor(private dataLocalVisitaService: DataLocalVisitaService,
    private router:Router) { }

  ngOnInit() {
  }

  save(){    
    this.dataLocalVisitaService.guardarVisita(this.visita);
    this.router.navigate(['/visitas']);
  }
  cambioFechaIniciaVisita(event){
    console.log('cambioFechaIniciaVisita', event);
    
  }

  cambioFechaTerminaVisita(event){
    console.log('cambioFechaTerminaVisita', event);
    

  }

}
