import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearParroquiaDTO, ParroquiaDTO } from '../parroquia/parroquia.model';
import { CrearProductorDTO, LitarProductoresDTO } from '../productores/productor.model';

@Injectable({
  providedIn: 'root'
})
export class ProductorService {
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
    return this.http.get<LitarProductoresDTO[]>(`${this.apiURL}/productores`);
  }

  public obtenerTodosTiposDeProductores():Observable<any>{
    return this.http.get<LitarProductoresDTO[]>(`${this.apiURL}/tipos-productores`);
  }

  
  public crear(productor: CrearProductorDTO) {
    return this.http.post<boolean>(`${this.apiURL}/productores/`, productor, this.httpOptions)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public editar(id: number, productor: CrearProductorDTO){
    console.log('productor SERVICE');
    console.log(id);
    console.log(productor);
    return this.http.put(`${this.apiURL}/productores/${id}`, productor).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/productores/${id}`).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public obtenerProductorPorId(id: number):Observable<any>{
    return this.http.get<ParroquiaDTO>(`${this.apiURL}/productores/${id}`);
  }
  //observables
  get refresh$(){
    return this._refresh$;
  }
}
