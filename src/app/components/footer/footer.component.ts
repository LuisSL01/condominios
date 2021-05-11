import { Component, OnInit } from '@angular/core';
import { Publicidad } from 'src/app/models/publicidad.model';
import { PublicidadService } from '../../services/publicidad.service';

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
    loop: true,    
    initialSlide: 0,
    slidesPerView: 1,
    autoHeight: true,
    
    autoplay: {
      disableOnInteraction: false
    }


    ,effect: 'slide',  
    freeMode: true,
    freeModeSticky: false,
    spaceBetween: 25
  };

  
  
  constructor(public publicidadService:PublicidadService) { 
              this.insertaPub();

  }
  ngOnInit() {
    /* this.publicidadService.cargarRegistros();     */
  }

  insertaPub(){
      console.log('insertarndo componente spublicidad');    
      this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/publicidad_eco_tierra.png", "http://www.ecodetierra.com/"));
      this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/publicidad_erve.png", "https://grupoerve.com/"));
      this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/publicidad_norden.png", "http://www.norden.com.mx/"));
      this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve1.png", "https://grupoerve.com/"));
      this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve2.png", "https://grupoerve.com/"));
      this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve3.png", "https://grupoerve.com/"));
      this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve4.png", "https://grupoerve.com/"));
      this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve5.png", "https://grupoerve.com/"));
      this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve6.png", "https://grupoerve.com/"));
      this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve7.png", "https://grupoerve.com/"));
      this.imagesPublicidad.push(this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/Banners-app-desarrollos-erve8.png", "https://grupoerve.com/"));
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
    window.open(pathUrl,'_system', 'location=yes');
  }

  slidesDidLoad(slides) {
    console.log('slidesDidLoad');
    
    slides.startAutoplay();
  }
  

}
