import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { MustMatch } from '../../shared/must-match.validator';
import { CodigoPostalService } from '../../services/codigo-postal.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  /* usuario = new FormGroup({
    nombre: new FormControl('',[Validators.required, Validators.minLength(4)]),
    email: new FormControl('',Validators.email)
  }); */

  searching: boolean = false;
  searchFailed: boolean = false;

  createAgente = this.fb.group({//Esto para construir los formularios dinamicamente
      nombreCompleto:['', [Validators.required, Validators.minLength(4)]],      
      username:['',[Validators.required, Validators.minLength(6)]],
      password:['', Validators.required],
      confirmarPassword:['',Validators.required],
      email:['',Validators.email],
      fechaDeIngreso: [new Date(), Validators.required],
      autoRegistro: [true, null],
      direccion: this.fb.group({
        calle: [null, null],
        numeroExterior: [null, null],
        numeroInterior: [null, null],
        asentamiento: [null, null]
      })
  }
  ,
  {
    validator: MustMatch('password', 'confirmarPassword')
  }
  );
  


  
  //Se inyecta en el constructor para armar los formularios reactivos..
  constructor(private fb: FormBuilder,
              private codigoPostalService : CodigoPostalService) { 


  }

  ngOnInit() {
  }

  guardarDatos(){
    console.log(this.createAgente.value);
  }
  
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),      
      tap(term =>
        term.length < 4 ? (this.searching = false) : (this.searching = true)                
      ),
      switchMap(term =>
        term.length < 4
          ? []
          : this.codigoPostalService.filterCodigosPostales(term).pipe(
              map(data => data.result),
              tap(() => (this.searchFailed = false)),
              catchError(() => {
                this.searchFailed = true;
                return of([]);
              })
            )
      ),
      tap(() => (this.searching = false))
    );

 
            
    validarCP(){

      console.log('cambio');
      

    }
}
