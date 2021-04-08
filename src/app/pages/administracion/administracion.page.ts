import { Component, OnInit } from '@angular/core';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.page.html',
  styleUrls: ['./administracion.page.scss'],
})
export class AdministracionPage implements OnInit {

  constructor(public userData:UserData) { }

  ngOnInit() {
  }

}
