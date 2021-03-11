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
    this.userData.retrieveBase64ToImageEmpresa();    
  }



  ionViewWillEnter(){

    console.log('ionViewWillEnter de menu header component');

  }





  ionViewDidEnter(){


    console.log('ionViewDidEnter de menu header component');

  }



}
