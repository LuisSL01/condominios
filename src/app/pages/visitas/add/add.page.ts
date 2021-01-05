import { Component, OnInit } from '@angular/core';
import { Visita } from '../../../models/visita.model';
import { VisitaService } from '../../../services/visita.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserData } from '../../../providers/user-data';

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
  ];  


  visita: Visita = new Visita();

  
  createVisita = this.fb.group({
    nombreCompleto: ["", [Validators.required]],
    tipoDeVisita: ["", [Validators.required]],
    duracionDeVisita: ["", [Validators.required]],
    fechaInicio: [new Date()],
    fechaTermino: [new Date()],
    conAcompaniantes: [true],
    visitaDiaria: [true]  
  });

  idEmpresa: number;
  idAgente: number;
  constructor(private visitaService: VisitaService,
    private router: Router,
    private fb: FormBuilder,
    private userData: UserData) {
    
  }

  ngOnInit() {

    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
  }

  verificaDiasSeleccionados() {
    console.log('verificaDiasSeleccionados');

    this.dias.forEach(day => {
      if (day.isChecked) {
        this.visita.diasVisita.push(day.pos);
      }
      console.log(day);
    });

  }

  diaIsClicked(dia : any){
    dia.isChecked = !dia.isChecked;
    console.log('diaIsClicked: '+dia);    
    console.log(this.dias);
  }

  save() {
    console.log('this.dias: ', this.dias);  
    if( ! this.createVisita.value.visitaDiaria){
      this.verificaDiasSeleccionados();

      if(this.visita.diasVisita.length === 0){
        this.userData.showToast('Debe elegir al menos un día')
        return;
      }

    }
    console.log('this.createVisita.value: ',this.createVisita.value);

    const visitaObj={
      empresa : this.idEmpresa,
      nombreCompleto : this.createVisita.value.nombreCompleto,
      agenteCreador:this.idAgente,
      tipoDeVisita:this.createVisita.value.tipoDeVisita,
      duracionDeVisita:this.createVisita.value.duracionDeVisita,
      fechaInicio: this.createVisita.value.fechaInicio,
      fechaTermino: this.createVisita.value.fechaTermino,
      conAcompaniantes: this.createVisita.value.conAcompaniantes,
      visitaDiaria:  this.createVisita.value.visitaDiaria,
      diasVisita: this.visita.diasVisita      
    };

    console.log('objeto enviado, '+ JSON.stringify(visitaObj));
    

    this.visitaService.save(visitaObj).subscribe((data) => {
        console.log(data);
        if (data.status === 200) { 
          this.userData.showToast('visita registrado correctamente');
          this.redirecciona();
        } else {this.userData.showToast('error al guardar visita');          }
      },
      (err) => {
        console.log(err);
        this.userData.showToast("Error: "+ err);
      },
      () => {}
    );
    /* this.dataLocalVisitaService.guardarVisita(this.visita);     
    this.router.navigate(['/mis-visitas/visitas']);*/
  }
  redirecciona(){
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
