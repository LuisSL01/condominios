import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private router:Router,
    private storage: Storage,
    private userData: UserData) { }

  ngOnInit() {
  }

  logOut(){
    console.log('log out');

    this.userData.logout().then(() => {
      this.storage.remove('empresaData');
      this.storage.remove('userDetails');
      this.userData.empresa_id =0;
      this.userData.agente_id =0;


      return this.router.navigateByUrl('/home');
    });

  }

}
