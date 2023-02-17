import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnrollementFullDTO, PaymentFullDTO } from '../enrollement/enrollement';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
    private apiURL=environment.apiURL+'/api';
  constructor(public http: HttpClient) { }
  public getAll():Observable<any>{
    return this.http.get<EnrollementFullDTO[]>(`${this.apiURL}/enrollements`);
  }
  public getAllPaymentez():Observable<any>{
    return this.http.get<PaymentFullDTO[]>(`${this.apiURL}/payments`);
  }
 /*  public getEnrrollementId(idEnrrollement:number):Observable<any>{
    return this.http.get<PaymentFullDTO[]>(`${this.apiURL}/payments/enrollement/${idEnrrollement}`);
  } */
}
