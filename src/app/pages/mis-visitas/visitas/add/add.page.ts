import { Component, OnInit } from '@angular/core';
import { Visita } from '../../../../models/visita.model';
import { DataLocalVisitaService } from '../../../../services/data-local-visita.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  dias: any[] = [
    { name: 'Domingo', isChecked: false, pos: 0 },
    { name: 'Lunes',isChecked: false, pos: 1}, 
    { name: 'Martes',isChecked: false, pos: 2}, 
    { name: 'Miércoles',isChecked: false, pos: 3}, 
    { name: 'Jueves',isChecked: false, pos: 4}, 
    { name: 'Viernes', isChecked: false, pos: 5},
    { name: 'Sábado', isChecked: false, pos: 6}
  ]


  visita: Visita = new Visita();
  constructor(private dataLocalVisitaService: DataLocalVisitaService,
    private router: Router) {
    console.log(this.dias);
  }

  ngOnInit() {
  }

  verificaDiasSeleccionados() {
    console.log('verificaDiasSeleccionados');

    this.dias.forEach(day => {
      if (day.isChecked) {
        this.visita.diasVisitaSemana.push(day.pos);
      }
      console.log(day);
    });

  }

  save() {
    console.log('this.dias: ', this.dias);
    if (!this.visita.visitaDiaria) {
      this.verificaDiasSeleccionados();
    }

    this.dataLocalVisitaService.guardarVisita(this.visita);
    this.router.navigate(['/mis-visitas/visitas']);
  }

  cambioDuracion() {

  }

  cambioFechaIniciaVisita(event) {
    console.log('cambioFechaIniciaVisita', event);

  }

  cambioFechaTerminaVisita(event) {
    console.log('cambioFechaTerminaVisita', event);
  }

}
