import { Component, OnInit } from '@angular/core';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {


  constructor(public userData: UserData) { }

  ngOnInit() {
  }

}
