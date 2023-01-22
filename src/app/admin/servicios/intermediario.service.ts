import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearIntermediarioDTO, LitarIntermediariosDTO, IntermediarioDTO } from '../intermediario/intermediario.model';

@Injectable({
  providedIn: 'root'
})
export class IntermediarioService {
  private apiURL=environment.apiURL+'/api';
  private _refresh$ = new Subject<void>();
  constructor(public http: HttpClient) { }

  token: any = localStorage.getItem('token');

  httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Authorization':`Token ${this.token}`
   })
 };


  public obtenerTodos():Observable<any>{
    return this.http.get<LitarIntermediariosDTO[]>(`${this.apiURL}/intermediarios/`);
  }
  
  public crear(lugar: CrearIntermediarioDTO) {
    return this.http.post<boolean>(`${this.apiURL}/intermediarios/`, lugar, this.httpOptions)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public editar(id: number, lugar: CrearIntermediarioDTO){
    console.log('ID:'+id);
    return this.http.put(`${this.apiURL}/intermediarios/${id}`, lugar, this.httpOptions).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/intermediarios/${id}`).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public obtenerIntermediarioPorId(id: number):Observable<any>{
    return this.http.get<IntermediarioDTO>(`${this.apiURL}/intermediarios/${id}`);
  }
  //observables
  get refresh$(){
    return this._refresh$;
  }


}
