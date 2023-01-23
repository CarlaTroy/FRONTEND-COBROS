import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourseCreateDTO, CourseFullDTO } from '../course/course';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiURL=environment.apiURL+'/api';
  private _resetForm$ = new Subject<void>();
  constructor(public http: HttpClient) { }
 //observables
 get refresh$(){
    return this._resetForm$;
  }
  public getAll():Observable<any>{
    return this.http.get<CourseFullDTO[]>(`${this.apiURL}/courses`);
  }
  public create(courseCreate: CourseCreateDTO):Observable<any> {
    return this.http.post<boolean>(`${this.apiURL}/courses/`, courseCreate).pipe(
        tap(() => this._resetForm$.next())
    );
  }
}
