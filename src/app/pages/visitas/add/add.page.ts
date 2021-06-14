import { Component, OnInit } from '@angular/core';
import { Visita } from '../../../models/visita.model';
import { VisitaService } from '../../../services/visita.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserData } from '../../../providers/user-data';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  visita: Visita = new Visita();
  
  createVisita = this.fb.group({
    data: this.fb.group({      
      nombreCompleto: ["", [Validators.required]],
      tipoDeVisita: ["", [Validators.required]],
      duracionDeVisita: ["", [Validators.required]],
      fechaInicio: [new Date()],
      fechaTermino: [new Date()],
      conAcompaniantes: [true],
      visitaDiaria: [true],





      
      /* dias: [[
        { name: 'Domingo', isChecked: false, pos: 0 },
        { name: 'Lunes',isChecked: false, pos: 1}, 
        { name: 'Martes',isChecked: false, pos: 2}, 
        { name: 'Miércoles',isChecked: false, pos: 3}, 
        { name: 'Jueves',isChecked: false, pos: 4}, 
        { name: 'Viernes', isChecked: false, pos: 5},
        { name: 'Sábado', isChecked: false, pos: 6}
      ], null] */
        dias:this.fb.group({
          Domingo:[false],
          Lunes:[false],
          Martes:[false],
          Miercoles:[false],
          Jueves:[false],
          Viernes:[false],
          Sabado:[false]
        }) 
    }),
  });
  
  visitaChangesForm: FormGroup;

  idEmpresa: number;
  idAgente: number;
  edit:boolean = false;

  constructor(private visitaService: VisitaService,
    private router: Router,
    private fb: FormBuilder,
    public activatedRoute: ActivatedRoute,
    private userData: UserData) {
    
  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
    this.visita = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));    
    if(this.visita != null) this.prepareEdit();
    else this.visita = new Visita();
  }
  prepareEdit(){
    console.log('prepareEdit');
    this.edit = true;

    this.createVisita = this.fb.group({
      data: this.fb.group({
        nombreCompleto: [this.visita.data.nombreCompleto],
        tipoDeVisita: [this.visita.data.tipoDeVisita],
        duracionDeVisita: [this.visita.data.duracionDeVisita],
        fechaInicio: [this.visita.data.fechaInicio],
        fechaTermino: [this.visita.data.fechaTermino],        
        visitaDiaria: [this.visita.data.visitaDiaria],

        dias :this.fb.group({
          Domingo: [this.visita.data.dias.Domingo],
          Lunes: [this.visita.data.dias.Lunes],
          Martes: [this.visita.data.dias.Martes],          
          Miercoles: [this.visita.data.dias.Miercoles],
          Jueves: [this.visita.data.dias.Jueves],
          Viernes: [this.visita.data.dias.Viernes],
          Sabado: [this.visita.data.dias.Sabado],
        }) 
      })      
    });
  }

  verificaDiasSeleccionados() {
    console.log('verificaDiasSeleccionados');
    let diasSelectesds:number =0;
    this.createVisita.value.data.dias.forEach(day => {
      if (day.isChecked) diasSelectesds ++;
    });
    if(diasSelectesds === 0){
      this.userData.showToast('Debe elegir al menos un día')
      return;      
    }
    console.log('dias seleccionados: '+ diasSelectesds);

    
  }

 

  diaIsClicked(dia : any){    
    console.log('diaIsClicked, '+JSON.stringify(dia));
    dia.isChecked = !dia.isChecked;    
    console.log('diaIsClicked, '+JSON.stringify(dia));
    this.createVisita.value.data.dias[dia.pos] = dia;    
  }

  editar(){
    console.log('editar()...');
    if( ! this.createVisita.value.data.visitaDiaria){
      /* this.verificaDiasSeleccionados(); */
    }
    this.visitaChangesForm = this.fb.group({});        
    this.getDirtyFields();

    console.log('visitaChangesForm', JSON.stringify(this.visitaChangesForm.value));

    this.visitaService.update(this.visita.id, this.visitaChangesForm.value).subscribe(data => {
      if (data.status === 200) {                
        this.createVisita.reset();
        this.userData.showToast('editado correctamente');
        this.router.navigate(['/visitas', { item: true}]);
      } else {
        this.userData.showToast('Error al editar registro, llego otro status');
      }
    }, err => {
      console.log(err);this.userData.showToast("Error: "+ err);
    },
      () => {
      });
  }

  getDirtyFields() {
    console.log('getDirtyFields');    
    Object.keys(this.createVisita['controls'].data['controls']).forEach(key => {
      if (this.createVisita.get('data').get(key).dirty) {
        this.visitaChangesForm.addControl(key, this.createVisita.get('data').get(key));
      }
    });
  }

  nuevo(){
    if( ! this.createVisita.value.data.visitaDiaria){
      /* this.verificaDiasSeleccionados(); */
    }
    console.log('this.createVisita.value: ',this.createVisita.value);
    const visitaObj={
      empresa : this.idEmpresa,
      agenteCreador:this.idAgente,
      data : this.createVisita.value.data      
    };
    console.log('objeto enviado, '+ JSON.stringify(visitaObj));
        
    this.visitaService.save(visitaObj).subscribe((data) => {
        console.log(data);
        if (data.status === 200) {         
          this.createVisita.reset();          
          this.router.navigate(['/visitas', { item: true}]); 
        } else {this.userData.showToast('error al guardar visita');          }
      },
      (err) => {
        console.log(err);
        this.userData.showToast("Error: "+ err);
      },
      () => {}
    );
  }

  save() {
    if(this.edit) this.editar();
    else this.nuevo();
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
