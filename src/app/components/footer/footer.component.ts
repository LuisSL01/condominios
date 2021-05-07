import { Component, OnInit } from '@angular/core';
import { Publicidad } from 'src/app/models/publicidad.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {


  imagesPublicidad:Publicidad[]=[];
  
  slideOpts = {    
    speed: 400,
    loop: true,    
    initialSlide: 5,
    slidesPerView: 1,
    autoplay: {
      disableOnInteraction: false
    }
  };

  
  
  constructor() { 
    this.insertaPub();

  }
  ngOnInit() {}

  insertaPub(){
    console.log('insertarndo componente spublicidad');    
    this.imagesPublicidad.push(
      this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/publicidad_eco_tierra.png", "http://www.ecodetierra.com/"));
    this.imagesPublicidad.push(
      this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/publicidad_erve.png", "https://grupoerve.com/"));
    this.imagesPublicidad.push(
      this.generaElementPub("https://almacenamientonube.s3.us-west-1.amazonaws.com/App/publicidad_norden.png", "http://www.norden.com.mx/"));

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
