import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatusPayFullDTO } from '../enrollement/enrollement';

@Injectable({
  providedIn: 'root'
})
export class StatusPayService {
    private apiURL=environment.apiURL+'/api';
  constructor(public http: HttpClient) { }
  public getAll():Observable<any>{
    return this.http.get<StatusPayFullDTO[]>(`${this.apiURL}/status-pays`);
  }
}
