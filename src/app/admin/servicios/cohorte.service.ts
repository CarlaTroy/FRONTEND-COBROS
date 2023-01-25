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
    private _refreshTable$ = new Subject<void>();
  constructor(public http: HttpClient) { }
 //observables
 get refreshForm$(){
    return this._resetForm$;
  }
     //observables
 get refreshTable$(){
    return this._refreshTable$;
  }
  public create(courseCreate: CohorteCreateDTO):Observable<any> {
    return this.http.post<boolean>(`${this.apiURL}/cohortes/`, courseCreate).pipe(
        tap(() => this._resetForm$.next())
    );
  }

  public edit(courseCreate: CohorteCreateDTO,id:number):Observable<any> {
    return this.http.put<boolean>(`${this.apiURL}/cohortes/${id}`, courseCreate);
  }


  public getCohorteId(id:number):Observable<any>{
    return this.http.get<CohorteFullDTO[]>(`${this.apiURL}/cohortes/${id}`);
  }

  public getAll():Observable<any>{
    return this.http.get<CohorteFullDTO[]>(`${this.apiURL}/cohortes`);
  }
  public getCohorte(id:number):Observable<any>{
    return this.http.get<CohorteFullDTO[]>(`${this.apiURL}/cohortes/${id}`);
  }

  public deleteCohorteId(id: number): Observable<any> {
    return this.http.delete<boolean>(`${this.apiURL}/cohortes/${id}`).pipe(
      tap(() => {
        this._refreshTable$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
}
