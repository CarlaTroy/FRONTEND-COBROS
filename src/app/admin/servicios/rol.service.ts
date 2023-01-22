import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearRolDTO, LitarRolesDTO, RolDTO } from '../rol/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiURL=environment.apiURL;
  private _refresh$ = new Subject<void>();
  constructor(public http: HttpClient) { }

  public obtenerTodos():Observable<any>{
    return this.http.get<LitarRolesDTO[]>(`${this.apiURL}/roles`);
  }
  
  public crear(rol: CrearRolDTO) {
    return this.http.post<boolean>(`${this.apiURL}/roles`, rol)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public editar(id: number, rol: CrearRolDTO){
    console.log(id);
    return this.http.put(`${this.apiURL}/roles/${id}`, rol).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public eliminarPorId(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/roles/${id}`).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public obtenerRolPorId(id: number):Observable<any>{
    return this.http.get<RolDTO>(`${this.apiURL}/roles/${id}`);
  }
  //observables
  get refresh$(){
    return this._refresh$;
  }
}
