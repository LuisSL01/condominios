import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], texto: string, columna1: string, columna2: string): any[] {
    if (texto === '') {
      return arreglo;
    }
    texto = texto.toLowerCase();
    return arreglo.filter(item => {
      return (item[columna1].toLowerCase().includes(texto) 
              || item[columna2].toLowerCase().includes(texto)  );
    }

    );


    

    /*  columnas.forEach(function (value) {
       console.log('dentro del foreach');
       console.log(value);
       miBusqueda = this.devuelveArr(arreglo,texto, value);
       miarray.push(miBusqueda);
     }); */

/* 

    let miBusqueda = arreglo.filter(item => {
      return item[columna1].toLowerCase()
        .includes(texto);
    }
    );

    let miBusqueda2 = arreglo.filter(item => {
      return item[columna2].toLowerCase()
        .includes(texto);
    }
    );
    console.log('mis busquedas...');
    

    console.log(miBusqueda);
    console.log(miBusqueda2);
    
    

    miBusqueda.push(miBusqueda2);

    return miBusqueda; */


    /* return miarray; */
  }

  devuelveArr(arreglo: any[], texto: string, columna: string): any[] {
    //esto no dio el resultado esperado
    //ver de que manera implementarlo
    console.log('devuelveArr', columna);
    return arreglo.filter(item => {
      return item[columna].toLowerCase()
        .includes(texto);
    });
  }

}
