import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {

  constructor() { 
    console.log('estoy en el constructor de menuheadercomponent');
    
  }

  ngOnInit() {}

}
