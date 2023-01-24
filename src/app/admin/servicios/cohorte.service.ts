import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CohorteCreateDTO, CohorteFullDTO } from '../cohorte/cohorte';

@Injectable({
  providedIn: 'root'
})
export class CohorteService {
    private apiURL=environment.apiURL+'/api';
    private _resetForm$ = new Subject<void>();
  constructor(public http: HttpClient) { }
 //observables
 get refreshForm$(){
    return this._resetForm$;
  }
  public create(courseCreate: CohorteCreateDTO):Observable<any> {
    return this.http.post<boolean>(`${this.apiURL}/cohortes/`, courseCreate).pipe(
        tap(() => this._resetForm$.next())
    );
  }
  public getAll():Observable<any>{
    return this.http.get<CohorteFullDTO[]>(`${this.apiURL}/cohortes`);
  }
}
