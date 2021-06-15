import { Component, OnInit } from '@angular/core';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {

  

  constructor(public userData: UserData) {
  }
  ngOnInit() {
   if(this.isEmpty(this.userData.base64ImageEmpresa)) {
      this.userData.procesaDatosEmpresa();
   }
    
  }

  isEmpty(str) {
    return (!str || 0 === str.length);
  }


  ionViewWillEnter(){

    console.log('ionViewWillEnter de menu header component');

  }





  ionViewDidEnter(){


    console.log('ionViewDidEnter de menu header component');

  }



}
