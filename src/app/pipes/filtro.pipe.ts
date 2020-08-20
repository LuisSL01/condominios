import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], texto: string, columna: string): any[] {

    if (texto === '') {
      return arreglo;
    }
    
    


 /*    var num = [7, 8, 9];
    num.forEach(function (value) {
      console.log(value);
    });

 */


    texto = texto.toLowerCase();
/* 
    let miarray: any[];

    
      
      let busqueda1 = arreglo.filter(item => {
        return item[value].toLowerCase()
          .includes(texto);
      });
      console.log('Push al new arr[]');
      console.log(value);
      console.log(busqueda1);          
      miarray.push(busqueda1); */
     
    



    return arreglo.filter(item => {
      return item[columna].toLowerCase()
        .includes(texto);
    }

    );
    /* return miarray; */
  }

}
