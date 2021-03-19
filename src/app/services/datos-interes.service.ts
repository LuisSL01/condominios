import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DatosInteresService {
  
  _APIKEY_="dc29b50d6dc526cd4d6163e55a19b7dd";
  _URL="https://api.openweathermap.org/data/2.5/weather?";

  constructor(private http: HttpClient) { }

  getClimaByCoordenadas(zipCode:string){
    /* console.log(this._URL +"appid="+this._APIKEY_+"&lat="+lat+"&lon="+lon+"&lang=sp&ctn=5&units=metric");
    return this.http.get<any>(this._URL +"appid="+this._APIKEY_+"&lat=9.4192999&lon=-99.177468&lang=sp&ctn=5&units=metric").pipe(share()); */
    /* console.log("https://api.openweathermap.org/data/2.5/weather?appid=dc29b50d6dc526cd4d6163e55a19b7dd&lat=9.4192999&lon=-99.177468&lang=sp&ctn=5&units=metric");
    return this.http.get<any>("https://api.openweathermap.org/data/2.5/weather?appid=dc29b50d6dc526cd4d6163e55a19b7dd&lat=9.4192999&lon=-99.177468&lang=sp&ctn=5&units=metric").pipe(share()); */
    /* console.log(this._URL+"appid="+this._APIKEY_+"&zip=06500,mx&lang=sp&units=metric"); */
    return this.http.get<any>(this._URL+"appid="+this._APIKEY_+"&zip="+zipCode+",mx&lang=sp&units=metric").pipe(share());
  }

}
