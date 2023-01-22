import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearResultadoDTO, LitarResultadosDTO, ObtenerResultadoCompletoDTO, ResultadoDTO } from '../resultados/resultados.model';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {
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
    return this.http.get<LitarResultadosDTO[]>(`${this.apiURL}/resultados`);
  }
  
  public crear(resultado: CrearResultadoDTO) {
    return this.http.post<boolean>(`${this.apiURL}/resultados/`, resultado)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }

  public obtenerTotalProduccionParaResultados(resultado: ObtenerResultadoCompletoDTO) {
    return this.http.post<boolean>(`${this.apiURL}/query-total/`, resultado, this.httpOptions)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }


  public editar(id: number, canton: CrearResultadoDTO){
    console.log('ID:'+id);
    return this.http.put(`${this.apiURL}/resultados/${id}`, canton).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/resultados/${id}`).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public obtenerResultadoPorId(id: number):Observable<any>{
    return this.http.get<ResultadoDTO>(`${this.apiURL}/resultados/${id}`);
  }
  //observables
  get refresh$(){
    return this._refresh$;
  }
}
