import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourseCreateDTO, CourseFullDTO } from '../course/course';
import { TypePaysFullDTO } from '../enrollement/enrollement';
@Injectable({
  providedIn: 'root'
})
export class TypePaysService {
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
    return this.http.get<TypePaysFullDTO[]>(`${this.apiURL}/type-pays`);
  }
  public getTypePaysId(id:number):Observable<any>{
    return this.http.get<TypePaysFullDTO[]>(`${this.apiURL}/type-pays/${id}`);
  }
  public create(typePaysCreate: CourseCreateDTO):Observable<any> {
    return this.http.post<boolean>(`${this.apiURL}/type-pays/`, typePaysCreate).pipe(
        tap(() => this._resetForm$.next())
    );
  }
  public edit(typePaysCreate: CourseCreateDTO,id:number):Observable<any> {
    return this.http.put<boolean>(`${this.apiURL}/type-pays/${id}`, typePaysCreate);
  }
  public deleteTypePaysId(id: number): Observable<any> {
    return this.http.delete<boolean>(`${this.apiURL}/type-pays/${id}`).pipe(
      tap(() => {
        this._refreshTable$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
}
