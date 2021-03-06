import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AgenteService {


  baseUrl: string = environment.coreServiceBaseUrl;
  baseUrlAuth: string = environment.authServiceBaseUrl;
  agenteContext: string = environment.coreApiBaseAgenteOperation;  

  agenteListener = new EventEmitter<any>();            
  
  constructor(private http:HttpClient,
              private toastCtrl: ToastController) { 

              }
  removeElement(elm:any){
    this.agenteListener.emit(elm);
  }            

  

  registerUsuario(userData: any): Observable<ApiResponse> {
    console.log('registerUsuario:'+this.baseUrlAuth + environment.authApiRegisterAgenteOperation);
    console.log('Se modifica agente service en rama adeudo');
    
    return this.http.post<ApiResponse>(this.baseUrlAuth + environment.authApiRegisterAgenteOperation, userData).pipe(share());
  }

  addAgenteToEmpresa(userData: FormData): Observable<ApiResponse> {
    console.log('addAgenteToEmpresa:'+this.baseUrl + environment.coreApiBaseAgenteEmpresaOperation + environment.coreApiBaseAddEmpresaOperation);
    return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBaseAgenteEmpresaOperation + environment.coreApiBaseAddEmpresaOperation, userData).pipe(share());
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + this.agenteContext + '/' + id).pipe(share());    
  }

  getUserByEmail(email: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + this.agenteContext + '/getByEmail/' + email).pipe(share());
  }

  updateStatus(data:FormData): Observable<ApiResponse> {
    console.log('updateStatus: ', this.baseUrl + this.agenteContext+':'+ environment.coreApiUpdateStatusAgenteOperation );    
    return this.http.patch<ApiResponse>(this.baseUrl + this.agenteContext+':'+ environment.coreApiUpdateStatusAgenteOperation ,data).pipe(share());    
  }



  

  getAgentes(idEmpresa: number, page: number, size: number, filters: string): Observable<any> {
    console.log("getAgentes: ",this.baseUrl +this.agenteContext +environment.coreApiBaseAgenteOperationList+ '/app/' + idEmpresa + '?page=' + page + '&size=' + size + (filters ? ('&filters=' + filters) : ''));    
    return this.http.get<any>(this.baseUrl +this.agenteContext +environment.coreApiBaseAgenteOperationList+ '/app/' + idEmpresa + '?page=' + page + '&size=' + size + (filters ? ('&filters=' + filters) : '')).pipe(share());
  }

  getManzanas(idEmpresa:number){
    console.log("getManzanas: ",this.baseUrl +this.agenteContext + ':listManzanas/' + idEmpresa);    
    return this.http.get<any>(this.baseUrl +this.agenteContext + ':listManzanas/' + idEmpresa).pipe(share()); 
  }

  getAllAgentesByEmpresa(idEmpresa:number): Observable<any> {
    console.log("getAllAgentesByEmpresa: ",this.baseUrl +this.agenteContext + '/list/' + idEmpresa);    
    return this.http.get<any>(this.baseUrl +this.agenteContext + '/list/' + idEmpresa).pipe(share());
  }

  updateUsuarioCore(id: number, userData: any): Observable<ApiResponse> {
    console.log('updateUsuarioCore', this.baseUrl + this.agenteContext + '/' + id, userData);
    return this.http.patch<ApiResponse>(this.baseUrl + this.agenteContext + '/' + id, userData).pipe(share());
  }

  getDepartamentosPorAgente(idAgente:number){
    console.log('trae departamentos por id agente');
    return this.http.get<ApiResponse>(this.baseUrl + environment.coreApiBaseAgenteDepartamentoOperation + environment.coreApiBaseAgenteDepartamentoListOperation+"/"+ idAgente).pipe(share());
  }

  addDepartamentoToAgente(formData: FormData): Observable<ApiResponse> {
    console.log('agregarDepartamentoAgente:'+this.baseUrl + environment.coreApiBaseAgenteDepartamentoOperation);
    return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBaseAgenteDepartamentoOperation , formData).pipe(share());
  }

  addAgenteToDepartamentos(formData: FormData): Observable<ApiResponse> {
    console.log('addAgenteToDepartamentos:'+this.baseUrl + environment.coreApiBaseAgenteDepartamentoOperation+environment.coreApiBaseAgenteDepartamentoMultipleOperation);
    return this.http.post<ApiResponse>(this.baseUrl + environment.coreApiBaseAgenteDepartamentoOperation+environment.coreApiBaseAgenteDepartamentoMultipleOperation , formData).pipe(share());
  }

  deleteAgenteDepto(idAgenteDepto: number) : Observable<ApiResponse> {
    console.log('deleteAgenteDepto: ',this.baseUrl + environment.coreApiBaseAgenteDepartamentoOperation +environment.coreApiBaseDeleteOperation + "/" + idAgenteDepto );
    return this.http.delete<ApiResponse>(this.baseUrl + environment.coreApiBaseAgenteDepartamentoOperation + environment.coreApiBaseDeleteOperation + "/" + idAgenteDepto).pipe(share());
  }



  updateAgenteCore(id: number, datosForm: any) {
    this.updateUsuarioCore(id, datosForm).subscribe(data => {
      console.log('data.result:: ', data.result);
      if (data.status === 200) {
      } else {
        this.showToast('No se logro actualizar el uuid de usuario');
      }
    }, err => {
      console.log('error::', err);     
    },
      () => {});
  }

  showToast(dataMessage: string) {
    this.toastCtrl.create({
      message: dataMessage,
      duration: 2000
    }).then((toastData) => {
      toastData.present();
    });
  }




}
