import { Component, OnInit } from '@angular/core';
import { UserData } from '../../providers/user-data';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.page.html',
  styleUrls: ['./datos-empresa.page.scss'],
})
export class DatosEmpresaPage implements OnInit {

  empData:any = [];

  constructor(private userData:UserData,
              private storage: Storage,) { }

  ngOnInit() {    
    this.recuperaDataEmpresa();
  }

  async recuperaDataEmpresa(){
    /* console.log('recuperaDataEmpresa');     */
    const data = await this.storage.get('empresaData');
    /* console.log('data',data); */
    if(data){
      this.empData = JSON.parse(data);
    }
    /* console.log(this.empData); */    
  }
  ionViewDidEnter(){
    /* console.log('ionViewDidEnter');     */        
  }  

}
