import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnrollementCreateDTO, EnrollementFullDTO } from '../enrollement/enrollement';
@Injectable({
  providedIn: 'root'
})
export class EnrollementService {
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
  public getAll():Observable<any>{
    return this.http.get<EnrollementFullDTO[]>(`${this.apiURL}/enrollements`);
  }
  public getEnrollementId(id:number):Observable<any>{
    return this.http.get<EnrollementFullDTO[]>(`${this.apiURL}/enrollements/${id}`);
  }
  public create(enrollementCreate: EnrollementCreateDTO):Observable<any> {
    return this.http.post<boolean>(`${this.apiURL}/enrollements/`, enrollementCreate).pipe(
        tap(() => this._resetForm$.next())
    );
  }
  public edit(enrollementCreate: EnrollementCreateDTO,id:number):Observable<any> {
    return this.http.put<boolean>(`${this.apiURL}/enrollements/${id}`, enrollementCreate);
  }
  public deleteEnrollementId(id: number): Observable<any> {
    return this.http.delete<boolean>(`${this.apiURL}/enrollements/${id}`).pipe(
      tap(() => {
        this._refreshTable$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }

}
