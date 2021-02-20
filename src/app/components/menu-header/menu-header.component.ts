import { Component, OnInit } from '@angular/core';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {

  constructor(public userData: UserData) {
    console.log('constructor de menu header component. '+ this.userData.nameImageEmpresa);
    
  }

  ngOnInit() {
  }

}
