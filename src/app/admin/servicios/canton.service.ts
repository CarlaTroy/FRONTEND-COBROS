import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { CantonDTO, CrearCantonDTO, LitarCantonesDTO } from 'src/app/admin/canton/canton.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CantonService {
  private apiURL=environment.apiURL+'/api';
  private _refresh$ = new Subject<void>();
  constructor(public http: HttpClient) { }

  public obtenerTodos():Observable<any>{
    return this.http.get<LitarCantonesDTO[]>(`${this.apiURL}/cantones`);
  }
  
  public crear(canton: CrearCantonDTO) {
    return this.http.post<boolean>(`${this.apiURL}/cantones/`, canton)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public editar(id: number, canton: CrearCantonDTO){
    console.log('ID:'+id);
    return this.http.put(`${this.apiURL}/cantones/${id}`, canton).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/cantones/${id}`).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public obtenerCantonPorId(id: number):Observable<any>{
    return this.http.get<CantonDTO>(`${this.apiURL}/cantones/${id}`);
  }
  //observables
  get refresh$(){
    return this._refresh$;
  }
}
