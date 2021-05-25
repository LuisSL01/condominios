import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileDownloaderService {

  constructor() { }

  createAndDownloadBlobFile(data: any, type: string, filename: string) {
    console.log('createAndDownloadBlobFile');
    
    let blob = new Blob([data], {type: type});
    if (navigator.msSaveBlob) {
      console.log('entro en el if');
      
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      console.log('entro en el else');
      
      var link = document.createElement('a');

      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        console.log('entro en el if');
        
        var url = URL.createObjectURL(blob);
        console.log('url'+url);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('termino lo del if');
        window.open(url,'_blank');
        console.log('mandando el window open');
        
      }else{
        console.log('volvio a entrar en el ese');
        
      }
    }
  }
}
