import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoursesFullDTO } from '../course/course';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiURL=environment.apiURL+'/api';
  private _refresh$ = new Subject<void>();
  constructor(public http: HttpClient) { }

  public obtenerTodos():Observable<any>{
    return this.http.get<CoursesFullDTO[]>(`${this.apiURL}/courses`);
  }
}
