import { Component, OnInit, ViewChild} from '@angular/core';
import { DirectorioService } from 'src/app/services/directorio.service';
import { Directorio } from '../../models/directorio.model';
import { UserData } from '../../providers/user-data';
import { Storage } from '@ionic/storage';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.page.html',
  styleUrls: ['./directorio.page.scss'],
})

export class DirectorioPage implements OnInit {

  textoBuscar ='';

  public directorios: Directorio[] = []; 
  idEmpresa: number;
  filters: any;
  contactoPage: number = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  constructor(public directorioService:DirectorioService,
              private userData: UserData,
              private storage:Storage ,
              public activatedRoute: ActivatedRoute,
              public navCtrl: NavController,
              private router: Router) { 
  }

  ngOnInit() {
    this.idEmpresa = this.userData.getIdEmpresa();
    this.cargaData();

    this.directorioService.directorioListener.subscribe(noti => {
      if(this.directorios){
        var index = this.directorios.indexOf(noti);
        if (index > -1) {
          this.directorios.splice(index, 1);
          this.storage.set(this.idEmpresa + this.directorioService.nombreEtiqueta, this.directorios);
        }        
      }
    });

  }
  ionViewDidEnter(){
    console.log('ionViewDidEnter de directorios PAGE');
    let value:boolean = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    if(value != null){
      this.contactoPage = 0;
      this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll      
      this.getDirectorios(this.contactoPage,10,null, null);
    }
  }

  async cargaData(){
    await this.cargarDataTemporalStorage(this.idEmpresa);
    if (this.directorios.length == 0) {
      this.getDirectorios(this.contactoPage, 10);
    }
  }
  
  async cargarDataTemporalStorage(idEmpresa: number) {
    await this.directorioService.getDirectoriosFromStorage(this.idEmpresa);
    this.directorios = this.directorioService.directorios;
  } 

  getDirectorios(page: number, size: number, eventInfinite?, eventRefresh?) {     
    this.directorioService.getDirectorios(this.idEmpresa, page, size, this.filters).subscribe((data) => {
         
          if (data.status === 200) {
            if (eventInfinite) {
              this.directorios.push(...data.result.content);
              if (data.result.content.length === 0) {
                eventInfinite.target.disabled = true;
                eventInfinite.target.complete();
                return;
              }
            }else{                      
              this.directorios = data.result.content;
            }
            this.storage.set(this.idEmpresa + this.directorioService.nombreEtiqueta, this.directorios);            
            this.completeEvent(eventInfinite, eventRefresh);            
          } else {
            console.log(data);
            this.userData.showToast('error '+data.status+', al recuperar registros');            
            this.completeEvent(eventInfinite, eventRefresh);
          }
        },
        (err) => {
          this.userData.showToast('error al recuperar registros'+ err);
          console.log(err);
          this.completeEvent(eventInfinite, eventRefresh);
        }
      );
  }

  completeEvent(eventInfinite?, eventRefresh?){
    if (eventInfinite) {
      eventInfinite.target.complete();
    }
    if(eventRefresh){
      eventRefresh.target.complete();
    }
  }

  
  loadData(event) {//Desde el infinite scroll
    this.contactoPage ++;
    this.getDirectorios(this.contactoPage, 10, event);
  }

  doRefresh(event) {
    this.contactoPage = 0;
    this.infiniteScroll.disabled = false;//Cada que se hace el refresh se habilita el componente infinite scroll
    this.getDirectorios(this.contactoPage, 10, null, event);
  }

  buscar( event ){   

  }

}
