import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentCreateDTO, StudentFullDTO } from '../student/student';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
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
    return this.http.get<StudentFullDTO[]>(`${this.apiURL}/students`);
  }
  public getStudentId(id:number):Observable<any>{
    return this.http.get<StudentFullDTO[]>(`${this.apiURL}/students/${id}`);
  }
  public create(studentCreate: StudentCreateDTO):Observable<any> {
    return this.http.post<boolean>(`${this.apiURL}/students/`, studentCreate).pipe(
        tap(() => this._resetForm$.next())
    );
  }
  public edit(studentCreate: StudentCreateDTO,id:number):Observable<any> {
    return this.http.put<boolean>(`${this.apiURL}/students/${id}`, studentCreate).pipe(
      tap(() => this._resetForm$.next())
  );
  }
  public deleteStudentId(id: number): Observable<any> {
    return this.http.delete<boolean>(`${this.apiURL}/students/${id}`).pipe(
      tap(() => {
        this._refreshTable$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
}
