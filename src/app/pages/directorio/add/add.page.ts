import { Component, OnInit } from '@angular/core';
import { Directorio } from '../../../models/directorio.model';
import { DataLocalDirectorioService} from '../../../services/data-local-directorio.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {


  
  directorio: Directorio = new Directorio();

  constructor( private dataLocalDirectorioService:DataLocalDirectorioService ) { }

  ngOnInit() {
  }

  save(){
    console.log('save new direcotorio');

    console.log(this.directorio);
    this.dataLocalDirectorioService.guardarDirectorio(this.directorio);    
  }

}
