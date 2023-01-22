import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearProduccionDTO, LitarProduccionesDTO, ProduccionDTO } from '../produccion/produccion.model';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {

  private apiURL=environment.apiURL+'/api';
  private _refresh$ = new Subject<void>();

  token: any = localStorage.getItem('token');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Token ${this.token}`
    })
  };


  constructor(public http: HttpClient) { }

  public obtenerTodos():Observable<any>{
    return this.http.get<LitarProduccionesDTO[]>(`${this.apiURL}/producciones`);
  }
  
  public crear(produccion: CrearProduccionDTO) {
    return this.http.post<boolean>(`${this.apiURL}/producciones/`, produccion, this.httpOptions)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public editar(id: number, produccion: CrearProduccionDTO){
    console.log('ID:'+id);
    return this.http.put(`${this.apiURL}/producciones/${id}`, produccion).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/producciones/${id}`).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public obtenerProduccionPorId(id: number):Observable<any>{
    return this.http.get<ProduccionDTO>(`${this.apiURL}/producciones/${id}`);
  }
  //observables
  get refresh$(){
    return this._refresh$;
  }
}
