import { Component, OnInit } from '@angular/core';

import { ResolucionService } from '../../../services/resolucion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Publicacion } from '../../../models/publicacion.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AgenteService } from '../../../services/agente.service';
import { UserData } from '../../../providers/user-data';
import { VotacionesService } from 'src/app/services/votaciones.service';
import { ConvocatoriaService } from '../../../services/convocatoria.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  resolucion: Publicacion = new Publicacion();
  manzanas: any[] = [];

  puntosAcuerdo: any[] = [];
  convocatorias: any[] = [];

  createResolucion = this.fb.group({
    data: this.fb.group({
      destinatario: ["todos", [Validators.required]],
      titulo: ["", [Validators.required]],
      descripcion: ["", [Validators.required]]
    }),
    votacion: ["", null],//puede pertenecer a un punto de acuerdo
    publicacion: ["", null],//puede pertener a una convocatoria
    tipo: ["RESOLUCION"],
  });

  resolucionChangesForm: FormGroup;

  idEmpresa: number;
  idAgente: number;
  edit: boolean = false;
  constructor(private resolucionService: ResolucionService,
    private agenteService: AgenteService,
    private votacionService: VotacionesService,
    private convocatoriaService: ConvocatoriaService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userData: UserData) { }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.idAgente = this.userData.getIdAgente();
    /* this.buscarManzanas(); */

    this.resolucion = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    if (this.resolucion != null) this.prepareEdit();
    else this.resolucion = new Publicacion();


    this.buscaData();

  }
  prepareEdit() {
    console.log('prepareEdit');
    this.edit = true;
    this.createResolucion = this.fb.group({
      data: this.fb.group({
        destinatario: ["todos"],
        titulo: [this.resolucion.data.titulo],
        descripcion: [this.resolucion.data.descripcion]
      }),
      votacion: [this.resolucion.votacion],//puede pertenecer a un punto de acuerdo
      publicacion: [this.resolucion.publicacion],//puede pertener a una convocatoria
      tipo: ["RESOLUCION"],
    });
  }

  buscaData() {

    if (this.convocatorias.length === 0) {
      console.log('debo ir a buscar puntos de acuerdo');
      this.convocatoriaService.getFullConvocatorias(this.idEmpresa).subscribe((data) => {
        console.log('data', JSON.stringify(data));
        if (data.status === 200) this.convocatorias = data.result;
        else this.userData.showToast('error 1 al recuperar registros');
      },
        (err) => { this.userData.showToast('error 2 al recuperar registros'); }
      );
    } else console.log('convocatorias ya esta lleno');


    if (this.puntosAcuerdo.length === 0) {
      console.log('debo ir a buscar puntos de acuerdo');
      this.votacionService.getFullVotaciones(this.idEmpresa).subscribe((data) => {
        console.log('data', JSON.stringify(data));
        if (data.status === 200) this.puntosAcuerdo = data.result;
        else this.userData.showToast('error 1 al recuperar puntos de acuerdo');
      },
        (err) => { this.userData.showToast('error 2 al recuperar puntos de acuerdo'); }
      );
    } else console.log('puntos de acuerdo ya esta lleno');


  }


  buscarManzanas() {
    this.agenteService.getManzanas(this.idEmpresa).subscribe((data) => {
      if (data.status === 200) {
        this.userData.showToast('Manzanas recuperadas correctamente');
        this.manzanas = data.result;
      } else this.userData.showToast('Error al recuperar manzanas');
    },
      (err) => {
        console.log(err);
      }
    );
  }


  save() {
    if (this.edit) this.editar();
    else this.nuevo();
  }

  nuevo() {
    const resolucionObj = {
      empresa: this.idEmpresa,
      agenteCreador: this.idAgente,
      data: this.createResolucion.value.data,
      tipo: this.createResolucion.value.tipo,
      votacion: this.createResolucion.value.votacion,//Punto de acuerdo adjunto
      publicacion: this.createResolucion.value.publicacion,//Convocatoria adjunta
      files: {
        archivos: [],
      }
    };
    console.log("anuncio enviado: ", resolucionObj);
    const formData = new FormData(); //Esto no esta trabajanco chido...
    formData.append("data", JSON.stringify(resolucionObj));
    formData.append("file", JSON.stringify([]));
    this.resolucionService.save(formData).subscribe((data) => {
      if (data.status === 200) {
        this.createResolucion.reset();
        this.userData.showToast('resolucion correctamente creada');
        this.router.navigate(['/resoluciones', { item: true }]);
      } else this.userData.showToast('error al guardar');
    },
      (err) => {
        console.log(err);
        this.userData.showToast('error al guardar');
      }, () => { }
    );
  }

  editar() {
    console.log('editar()...');
    this.resolucionChangesForm = this.fb.group({});
    this.getDirtyFields();
    console.log('resolucionChangesForm', JSON.stringify(this.resolucionChangesForm.value));

    this.resolucionService.update(this.resolucion.id, this.resolucionChangesForm.value).subscribe(data => {
      if (data.status === 200) {
        this.createResolucion.reset();
        this.router.navigate(['/resoluciones', { item: true }]);
      } else {
        this.userData.showToast('Error al editar registro, llego otro status');
      }
    }, err => {
      console.log(err); this.userData.showToast("Error: " + err);
    },
      () => {
      });
  }

  getDirtyFields() {
    Object.keys(this.createResolucion['controls'].data['controls']).forEach(key => {
      if (this.createResolucion.get('data').get(key).dirty) {
        this.resolucionChangesForm.addControl(key, this.createResolucion.get('data').get(key));
      }
    });
  }
}
