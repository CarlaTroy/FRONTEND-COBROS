import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CostoProduccionDTO, CrearCostoProduccionDTO, LitarCostoProduccionesDTO } from '../costo-produccion/costo.produccion.model';

@Injectable({
  providedIn: 'root'
})
export class CostoProduccionService {

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
      return this.http.get<LitarCostoProduccionesDTO[]>(`${this.apiURL}/costo-produccion/`, this.httpOptions);
    }
    
    public crear(costoProduccion: CrearCostoProduccionDTO) {
      return this.http.post<boolean>(`${this.apiURL}/costo-produccion/`, costoProduccion, this.httpOptions)  //envia el contenido del form al backend (web api)
      .pipe(
        tap(() => {
          this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
        })
      );
    }
    public editar(id: number, costoProduccion: CrearCostoProduccionDTO){
      console.log(id);
      return this.http.put(`${this.apiURL}/costo-produccion/${id}`, costoProduccion, this.httpOptions).pipe(
        tap(() => {
          this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
        })
      );
    }
    public eliminarPorId(id: number): Observable<boolean> {
      return this.http.delete<boolean>(`${this.apiURL}/costo-produccion/${id}`, this.httpOptions).pipe(
        tap(() => {
          this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
        })
      );
    }
    public obtenerCostoProduccionPorId(id: number):Observable<any>{
      return this.http.get<CostoProduccionDTO>(`${this.apiURL}/costo-produccion/${id}`);
    }
    //observables
    get refresh$(){
      return this._refresh$;
    }
  }