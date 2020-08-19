import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer){

  }

  transform(img: string): any {
    
    //aqui se le enviaria la url de donde se encuentra la imagen para que pueda ser visualizada desde la app

    // const domImg = ´background-image: url('${img}')´;
    
    const domImg =img;
    return this.domSanitizer.bypassSecurityTrustUrl(domImg);
  }

}
