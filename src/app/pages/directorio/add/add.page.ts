import { Component, OnInit } from '@angular/core';
import { Directorio } from '../../../models/directorio.model';
import { DataLocalDirectorioService} from '../../../services/data-local-directorio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {


  
  directorio: Directorio = new Directorio();

  constructor( private dataLocalDirectorioService:DataLocalDirectorioService, private router: Router ) { 
    
    
  }

  ngOnInit() {
  }

  save(){
    console.log('save new direcotorio');

    console.log(this.directorio);

    this.dataLocalDirectorioService.guardarDirectorio(this.directorio);    
    this.router.navigate(['/directorio']);
  }

}
