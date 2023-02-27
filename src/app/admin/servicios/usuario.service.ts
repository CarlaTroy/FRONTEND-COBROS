import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';;
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { GroupDTO, LoginUsuarioDTO, UserCreateDTO } from '../user/user';
import { UserFullDTO } from '../student/student';
import { LoginUserDTO } from 'src/app/auth/login/login';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiURL=environment.apiURL+'/auth';
  private _refresh$ = new Subject<void>();
  token: any;

  tokenObtenido: any = localStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Token ${this.tokenObtenido}`
    })
  };

  constructor(public http: HttpClient, private router: Router) {
    this.cargarStorage()
  }

     //INICIALIZANDO AL LOCALSTORAGE
     cargarStorage() {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
      } else {
        this.token = '';
      }
    }

    guardarDatosEnStorage(loginUser:LoginUserDTO) {
        localStorage.setItem('id', loginUser.id.toString());
        localStorage.setItem('is_staff', loginUser.is_staff.valueOf().toString());
        localStorage.setItem('token', loginUser.token[0]);
        localStorage.setItem('username', loginUser.username);
        localStorage.setItem('email', loginUser.email);
        localStorage.setItem('grupos', loginUser.grupos[0].name.toString());
        this.token = loginUser.token;
    }
    definirTipoUsuario(){
        return localStorage.getItem('grupos');
    }
    eliminarStorage() {
      this.token = '';
      localStorage.removeItem('is_staff');
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    get refreshTable$(){
      return this._refresh$;
    }

  login(usuario: LoginUsuarioDTO) {
    return this.http.post(`${this.apiURL}/login/`, usuario).pipe(
      map((resp: any) => {
        const loginUserDTO:LoginUserDTO=resp.data;
        this.guardarDatosEnStorage(loginUserDTO);
        return resp;
      }),
      catchError((err) => {
        return throwError(err.error.message);
      })
    );
  }
  logout() {

    return this.http.post(`${this.apiURL}/logout/`, this.httpOptions).pipe(
      map((resp: any) => {
        this.eliminarStorage()
        this.router.navigate(['/']);
        return resp.data;
      }),
      catchError((err) => {
          //this.router.navigate(['/auth/login']);
          this.router.navigate(['/']);
        return throwError(err.error.message);
      })
    );
  }

  public obtenerTodos():Observable<any>{
    return this.http.get<UserFullDTO[]>(`${this.apiURL}/users`);
  }
  public obtenerTodosGrupos():Observable<any>{
    return this.http.get<GroupDTO[]>(`${this.apiURL}/grupos`);
  }


  /*checkServerStatus() {
    this.http.get<LitarUsuarioDTO[]>(`${this.apiURL}/users`)
      .subscribe(
        data => {
          return console.log('Server is up and running')},
        error => {
          return console.log('Server is down');
          // Handle error
        }
      );
  }*/



  public crear(usuario: UserCreateDTO) {
    return this.http.post<any>(`${this.apiURL}/register/`, usuario, this.httpOptions)  //envia el contenido del form al backend (web api)
    .pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }

  public editar(id: number, usuario: UserCreateDTO){
    console.log('ID:'+id);
    return this.http.put<any>(`${this.apiURL}/users/${id}`, usuario).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public eliminarPorId(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/users/${id}`).pipe(
      tap(() => {
        this._refresh$.next();  //esto se ejecuta antes de retorna la data al componente
      })
    );
  }
  public obtenerUsuarioPorId(id: number):Observable<any>{
    return this.http.get<UserFullDTO>(`${this.apiURL}/users/${id}`);
  }
  //observables
  get refresh$(){
    return this._refresh$;
  }
}
