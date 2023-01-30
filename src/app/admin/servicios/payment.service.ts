import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentFullDTO } from '../enrollement/enrollement';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
    private apiURL=environment.apiURL+'/api';
  constructor(public http: HttpClient) { }
  //obtener los pagos que de la tabla pagos de la matricula en especifico por id
  public getPaymentsEnrollemtId(idEnrollement:number):Observable<any>{
    return this.http.get<PaymentFullDTO[]>(`${this.apiURL}/payments/enrollement/${idEnrollement}`);
  }
}
