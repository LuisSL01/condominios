import { Component, OnInit } from '@angular/core';
import { Publicidad } from 'src/app/models/publicidad.model';
import { PublicidadService } from '../../services/publicidad.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  pathS3:string = "https://almacenamientonube.s3.us-west-1.amazonaws.com/";
  imagesPublicidad:Publicidad[]=[];
  
  slideOpts = {    
    //El slide sigue mostrando una imagen en blanco
    speed: 1000,
    loop: false,    
    initialSlide: 0,
    slidesPerView: 1,
    autoHeight: true,
    
    autoplay: {
      disableOnInteraction: false
    },
    effect: 'slide',  
    freeMode: true,
    freeModeSticky: false,
    spaceBetween: 25,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    }
  };

  
  
  
  constructor(public publicidadService:PublicidadService, 
              private analytics: AngularFireAnalytics,
              private userData:UserData) { 
              

  }
  ngOnInit() {
    /* this.publicidadService.cargarRegistros();     */
    this.insertaPub();
  }

  async insertaPub(){ 
    console.log('vamos por la publicidad');  
    
    this.publicidadService.getPublicidadAllPorEmpresa(this.userData.getIdEmpresa()).subscribe(
      data=>{        
        if(data.status === 200){
          var publicidades:Publicidad[] = data.result;    
          console.log('insertando componentes publicidad recuperados');  

          for(var i = 0; i < publicidades.length; i++){
            this.imagesPublicidad.push(this.generaElementPub(("https://almacenamientonube.s3.us-west-1.amazonaws.com/").concat(publicidades[i].data.pathImage), publicidades[i].data.pathUrl));
          }
         
          //this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve1.png", "https://grupoerve.com/e-sur/"));
          //this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve2.png", "https://grupoerve.com/e-sur/"));
          //this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve3.png", "https://grupoerve.com/rincon-esmeralda/"));
          //this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve4.png", "https://grupoerve.com/vista-reforma/"));
          //this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve5.png", "https://grupoerve.com/vista-reforma/"));
          //this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve6.png", "https://grupoerve.com/rincon-de-la-plata/"));
          //this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve7.png", "https://grupoerve.com/punta-poniente/"));
          //this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve8.png", "https://grupoerve.com/rincon-del-valle/"));

        }else{
          console.log('Error al recuperar registros de publicidad')
        }
      }, err => {                        
        console.log('Error en el servicio al buscar registros')
      }
    );
  }

  generaElementPub(_pathImage: string, _pathUrl: string): Publicidad {
    let ob:Publicidad = new Publicidad();    
    const obData = {
      pathImage: _pathImage,
      pathUrl: _pathUrl,    
    };
    ob.data = obData;
    return ob;
  }

  clicPublicidad(pathUrl:string){
    console.log('clicPublicidad', pathUrl);
    this.analytics.logEvent('clic página: '+pathUrl);                  
    window.open(pathUrl,'_system', 'location=yes');
  }

  slidesDidLoad(slides) {
    console.log('slidesDidLoad');
    slides.startAutoplay();
  }
  

}
